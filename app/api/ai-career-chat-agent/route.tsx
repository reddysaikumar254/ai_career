import { NextResponse } from "next/server";

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

export async function POST(req: any) {
    try {
      const { userInput } = await req.json();

      if (!userInput) {
        return NextResponse.json(
          { error: "User input is required" },
          { status: 400 }
        );
      }

      console.log("Chat API - User input:", userInput);

      const result = await callGemini(`
You are a professional AI Career Coach.
Give clear, actionable, and encouraging advice.
Keep your response concise and helpful.

User question:
${userInput}
`);

      console.log("Chat API - Gemini response:", result);

      const content = result?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
      
      if (!content) {
        return NextResponse.json(
          { error: "Failed to generate response from AI" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        content: content,
        role: 'assistant',
        type: 'text'
      });
    } catch (error: any) {
      console.error('Chat API error:', error);
      return NextResponse.json(
        { error: error?.message || "Failed to process chat request" },
        { status: 500 }
      );
    }
}