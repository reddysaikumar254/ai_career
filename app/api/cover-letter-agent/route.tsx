import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/configs/db";
import { HistoryTable } from "@/configs/schema";
import { eq } from "drizzle-orm";

const callGemini = async (prompt: string) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set");
    }

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

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Gemini API error: ${res.status} - ${errorText}`);
    }

    return res.json();
  } catch (error: any) {
    console.error("Gemini API call failed:", error);
    throw error;
  }
};

// Extract PDF text using Gemini's vision capability
const extractPdfText = async (buffer: Buffer): Promise<string> => {
  try {
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

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`PDF extraction failed: ${res.status} - ${errorText}`);
    }

    const result = await res.json();
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    return text;
  } catch (error: any) {
    console.error("PDF text extraction error:", error);
    throw error;
  }
};

export async function POST(req: NextRequest) {
  try {
    console.log("Cover Letter API - Request received");
    
    const formData = await req.formData();
    const recordId = formData.get('recordId') as string;
    const jobTitle = formData.get('jobTitle') as string;
    const companyName = formData.get('companyName') as string;
    const jobDescription = formData.get('jobDescription') as string;
    const resumeFile: any = formData.get('resumeFile');
    
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    if (!recordId || !jobTitle || !companyName) {
      return NextResponse.json(
        { error: "Record ID, job title, and company name are required" },
        { status: 400 }
      );
    }

    if (!resumeFile) {
      return NextResponse.json(
        { error: "Resume file is required" },
        { status: 400 }
      );
    }

    console.log("Cover Letter API - Generating for:", jobTitle, "at", companyName);

    let resumeText = "";

    try {
      // Extract text from PDF using Gemini
      const arrayBuffer = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      resumeText = await extractPdfText(buffer);

      if (!resumeText || resumeText.trim().length === 0) {
        return NextResponse.json(
          { error: "Failed to extract text from resume PDF" },
          { status: 400 }
        );
      }

      console.log("Cover Letter API - Resume text extracted, length:", resumeText.length);
    } catch (pdfError: any) {
      console.error("PDF extraction error:", pdfError);
      return NextResponse.json(
        { error: "Failed to extract PDF content: " + pdfError.message },
        { status: 400 }
      );
    }

    console.log("Cover Letter API - Calling Gemini");

    const aiResult = await callGemini(`
You are a professional cover letter writer. Generate a compelling cover letter based on the following information.

Job Title: ${jobTitle}
Company Name: ${companyName}
Job Description: ${jobDescription || "Not provided"}

Resume Information:
${resumeText}

Write a professional, engaging cover letter that:
1. Addresses the specific job and company
2. Highlights relevant skills and experience from the resume
3. Shows enthusiasm for the role
4. Is 3-4 paragraphs long
5. Includes a proper greeting and closing

Format the response as a clean cover letter (no markdown, plain text).
`);

    console.log("Cover Letter API - Gemini response received");

    const content = aiResult?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    if (!content) {
      console.error("No content in Gemini response:", aiResult);
      return NextResponse.json(
        { error: "Failed to generate cover letter" },
        { status: 500 }
      );
    }

    // Save to database
    console.log("Cover Letter API - Saving to database");
    await db
  .update(HistoryTable)
  .set({
    content: { coverLetter: content },
    metaData: JSON.stringify({ jobTitle, companyName }),
  })
  .where(eq(HistoryTable.recordId, recordId));

    console.log("Cover Letter API - Success");
    return NextResponse.json({ coverLetter: content });
  } catch (error: any) {
    console.error("Cover Letter API error:", error);
    console.error("Error details:", {
      message: error?.message,
      stack: error?.stack,
      name: error?.name,
    });
    return NextResponse.json(
      { error: error?.message || "Failed to generate cover letter" },
      { status: 500 }
    );
  }
}
