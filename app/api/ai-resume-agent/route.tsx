import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/configs/db";
import { HistoryTable } from "@/configs/schema";
import ImageKit from "imagekit";

const callGemini = async (prompt: string) => {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  return res.json();
};

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT_URL || "",
});

const uploadPDFToImageKit = async (file: File): Promise<string | null> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `resume_${Date.now()}_${file.name}`;

    const response = await imagekit.upload({
      file: buffer,
      fileName: fileName,
      folder: "/resumes",
    });

    console.log("Resume uploaded to ImageKit:", response.url);
    return response.url;
  } catch (error) {
    console.error("ImageKit upload error:", error);
    return null;
  }
};

// Simple PDF text extraction using Gemini's capability
const extractPdfText = async (buffer: Buffer): Promise<string> => {
  try {
    // Convert buffer to base64 for Gemini
    const base64Data = buffer.toString('base64');
    
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    mimeType: "application/pdf",
                    data: base64Data,
                  },
                },
                {
                  text: "Extract all text from this PDF. Return only the plain text content without any formatting or markdown.",
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await res.json();
    const extractedText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    return extractedText;
  } catch (error: any) {
    console.error("PDF extraction error:", error);
    throw new Error(`Failed to extract PDF text: ${error.message}`);
  }
};

export async function POST(req:NextRequest) {
    try {
      const FormData = await req.formData();
      const resumeFile:any = FormData.get('resumeFile') ;
      const recordId = FormData.get('recordId') as string;
      const user = await currentUser();

      if (!user) {
        return NextResponse.json(
          { error: "User not authenticated" },
          { status: 401 }
        );
      }

      if (!resumeFile || !recordId) {
        return NextResponse.json(
          { error: "Resume file and record ID are required" },
          { status: 400 }
        );
      }

      console.log("Resume API - Processing resume for recordId:", recordId);

      // Convert File to Buffer
      const arrayBuffer = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      console.log("Resume API - Extracting PDF text");
      
      // Extract PDF text using Gemini
      const pdfText = await extractPdfText(buffer);

      if (!pdfText || pdfText.trim().length === 0) {
        return NextResponse.json(
          { error: "Failed to extract text from PDF or PDF is empty" },
          { status: 400 }
        );
      }

      console.log("Resume API - Calling Gemini for analysis");

      const aiResult = await callGemini(`
You are an AI Resume Analyzer.
Analyze the resume text and return a structured JSON report.

Return ONLY valid JSON in this exact format (no markdown, no extra text):
{
  "overall_score": 75,
  "overall_feedback": "Good",
  "summary_comment": "Your resume has solid structure...",
  "sections": {
    "contact_info": {
      "score": 80,
      "comment": "Contact information is clear"
    },
    "experience": {
      "score": 70,
      "comment": "Good work history"
    },
    "education": {
      "score": 75,
      "comment": "Education section is well-formatted"
    },
    "skills": {
      "score": 65,
      "comment": "Skills could be more detailed"
    }
  },
  "tips_for_improvement": [
    "Add more measurable achievements",
    "Use action verbs"
  ],
  "whats_good": [
    "Clear structure",
    "Professional formatting"
  ],
  "needs_improvement": [
    "More quantifiable results",
    "Better keyword usage"
  ]
}

Resume text:
${pdfText}
`);

      console.log("Resume API - Gemini response received");

      const content = aiResult?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
      
      // Clean up the response (remove markdown code blocks if present)
      const cleaned = content.replace(/```json|```/g, "").trim();
      let parsed;
      
      try {
        parsed = JSON.parse(cleaned);
      } catch (parseError) {
        console.error("Resume API - JSON parse error:", parseError);
        parsed = {
          overall_score: 70,
          overall_feedback: "Analysis complete",
          summary_comment: content,
          sections: {
            contact_info: { score: 75, comment: "N/A" },
            experience: { score: 75, comment: "N/A" },
            education: { score: 75, comment: "N/A" },
            skills: { score: 75, comment: "N/A" }
          },
          tips_for_improvement: ["Review your resume for clarity"],
          whats_good: ["Resume submitted successfully"],
          needs_improvement: ["None identified"]
        };
      }

      // Save to database
      console.log("Resume API - Saving to database");
      
      // Upload PDF to ImageKit
      let pdfUrl: string | null = null;
      try {
        pdfUrl = await uploadPDFToImageKit(resumeFile);
      } catch (uploadError) {
        console.error("Resume API - PDF upload failed:", uploadError);
        // Continue without URL if upload fails
      }

      await db.insert(HistoryTable).values({
        recordId,
        content: parsed,
        aiAgentType: '/ai-tools/ai-resume-analyzer',
        createdAt: new Date().toISOString(),
        userEmail: user?.primaryEmailAddress?.emailAddress,
        metaData: pdfUrl,
      });

      console.log("Resume API - Success");
      return NextResponse.json(parsed);
    } catch (error: any) {
      console.error('Resume API error:', error);
      return NextResponse.json(
        { error: error?.message || "Failed to process resume" },
        { status: 500 }
      );
    }
}
