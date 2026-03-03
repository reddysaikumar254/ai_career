import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/configs/db";
import { HistoryTable } from "@/configs/schema";

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

export async function POST(req : NextRequest){
    try {
      const { roadmapId, userInput } = await req.json();
      const user = await currentUser();
      
      if (!user) {
        return NextResponse.json(
          { error: "User not authenticated" },
          { status: 401 }
        );
      }

      if (!userInput || !roadmapId) {
        return NextResponse.json(
          { error: "Roadmap ID and user input are required" },
          { status: 400 }
        );
      }
      
      console.log("Roadmap API - Generating roadmap for:", userInput);

      const aiResult = await callGemini(`
Generate a detailed career learning roadmap in JSON format.
Create a structured learning path with 8-12 nodes showing progression.

IMPORTANT: 
- Generate actual, specific learning milestones and topics
- Nodes must have realistic titles and descriptions
- Position nodes in a logical flow (left to right, top to bottom)
- Use x coordinates: 0, 250, 500, 750 for horizontal progression
- Use y coordinates: 0, 200, 400 for vertical levels
- Connect related nodes with edges showing progression

Return ONLY valid JSON (no markdown, no extra text, no code blocks):

{
  "roadmapTitle": "Career Path: ${userInput}",
  "description": "A comprehensive learning path to become a skilled ${userInput}",
  "duration": "6-12 months",
  "initialNodes": [
    {
      "id": "1",
      "data": {
        "title": "Foundation Concepts",
        "description": "Learn core principles and fundamentals"
      },
      "position": { "x": 0, "y": 0 }
    },
    {
      "id": "2",
      "data": {
        "title": "Essential Tools",
        "description": "Master required tools and technologies"
      },
      "position": { "x": 250, "y": 0 }
    },
    {
      "id": "3",
      "data": {
        "title": "Practical Projects",
        "description": "Build real-world projects"
      },
      "position": { "x": 500, "y": 0 }
    },
    {
      "id": "4",
      "data": {
        "title": "Advanced Topics",
        "description": "Explore advanced concepts"
      },
      "position": { "x": 750, "y": 0 }
    },
    {
      "id": "5",
      "data": {
        "title": "Best Practices",
        "description": "Learn industry best practices"
      },
      "position": { "x": 0, "y": 200 }
    },
    {
      "id": "6",
      "data": {
        "title": "Specialization",
        "description": "Choose and specialize in area of interest"
      },
      "position": { "x": 250, "y": 200 }
    },
    {
      "id": "7",
      "data": {
        "title": "Portfolio Building",
        "description": "Create impressive portfolio pieces"
      },
      "position": { "x": 500, "y": 200 }
    },
    {
      "id": "8",
      "data": {
        "title": "Professional Growth",
        "description": "Network and grow professionally"
      },
      "position": { "x": 750, "y": 200 }
    }
  ],
  "initialEdges": [
    { "id": "e1-2", "source": "1", "target": "2" },
    { "id": "e2-3", "source": "2", "target": "3" },
    { "id": "e3-4", "source": "3", "target": "4" },
    { "id": "e1-5", "source": "1", "target": "5" },
    { "id": "e5-6", "source": "5", "target": "6" },
    { "id": "e6-7", "source": "6", "target": "7" },
    { "id": "e7-8", "source": "7", "target": "8" }
  ]
}

Now generate a detailed roadmap for: ${userInput}

Generate 8-12 specific nodes with unique, meaningful titles and descriptions for this career path. Ensure nodes flow logically from left to right and connect with appropriate edges. Return ONLY the JSON.
`);

      console.log("Roadmap API - Gemini response received");

      const content = aiResult?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
      
      // Clean up the response
      const cleaned = content.replace(/\`\`\`json|\`\`\`/g, "").trim();
      let parsed;
      
      try {
        parsed = JSON.parse(cleaned);
        // Ensure parsed has required fields
        if (!parsed.roadmapTitle) parsed.roadmapTitle = userInput;
        if (!parsed.description) parsed.description = `Learning path for ${userInput}`;
        if (!parsed.duration) parsed.duration = "6-12 months";
        if (!parsed.initialNodes || parsed.initialNodes.length === 0) {
          parsed.initialNodes = [
            { id: "1", data: { title: "Foundation", description: "Learn fundamentals" }, position: { x: 0, y: 0 } },
            { id: "2", data: { title: "Intermediate", description: "Build skills" }, position: { x: 250, y: 0 } },
            { id: "3", data: { title: "Advanced", description: "Master concepts" }, position: { x: 500, y: 0 } },
            { id: "4", data: { title: "Professional", description: "Professional growth" }, position: { x: 750, y: 0 } }
          ];
        }
        if (!parsed.initialEdges || parsed.initialEdges.length === 0) {
          parsed.initialEdges = [
            { id: "e1-2", source: "1", target: "2" },
            { id: "e2-3", source: "2", target: "3" },
            { id: "e3-4", source: "3", target: "4" }
          ];
        }
      } catch (parseError) {
        console.error("Roadmap API - JSON parse error:", parseError);
        parsed = {
          roadmapTitle: userInput,
          description: `Learning path for ${userInput}`,
          duration: "6-12 months",
          initialNodes: [
            { id: "1", data: { title: "Foundation", description: "Learn the fundamentals and core concepts" }, position: { x: 0, y: 0 } },
            { id: "2", data: { title: "Core Skills", description: "Build essential technical skills" }, position: { x: 250, y: 0 } },
            { id: "3", data: { title: "Intermediate Projects", description: "Work on intermediate level projects" }, position: { x: 500, y: 0 } },
            { id: "4", data: { title: "Advanced Topics", description: "Explore advanced and specialized topics" }, position: { x: 750, y: 0 } },
            { id: "5", data: { title: "Real-World Application", description: "Apply knowledge in real-world scenarios" }, position: { x: 0, y: 200 } },
            { id: "6", data: { title: "Best Practices", description: "Learn industry best practices" }, position: { x: 250, y: 200 } },
            { id: "7", data: { title: "Portfolio Building", description: "Create impressive portfolio projects" }, position: { x: 500, y: 200 } },
            { id: "8", data: { title: "Professional Growth", description: "Continue learning and growing professionally" }, position: { x: 750, y: 200 } }
          ],
          initialEdges: [
            { id: "e1-2", source: "1", target: "2" },
            { id: "e2-3", source: "2", target: "3" },
            { id: "e3-4", source: "3", target: "4" },
            { id: "e1-5", source: "1", target: "5" },
            { id: "e5-6", source: "5", target: "6" },
            { id: "e6-7", source: "6", target: "7" },
            { id: "e7-8", source: "7", target: "8" }
          ]
        };
      }

      // Save to database
      console.log("Roadmap API - Saving to database");
      console.log("Roadmap API - Final data:", JSON.stringify(parsed, null, 2));
      await db.insert(HistoryTable).values({
        recordId: roadmapId,
        content: parsed,
        aiAgentType: '/ai-tools/ai-roadmap-agent',
        createdAt: new Date().toISOString(),
        userEmail: user?.primaryEmailAddress?.emailAddress,
        metaData: userInput,
      });

      console.log("Roadmap API - Success");
      return NextResponse.json(parsed);
    } catch (error: any) {
      console.error('Roadmap API error:', error);
      return NextResponse.json(
        { error: error?.message || "Failed to generate roadmap" },
        { status: 500 }
      );
    }
}