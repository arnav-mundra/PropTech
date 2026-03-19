import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { requirement, units } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        recommendations: [
          { unitId: units?.[0]?.unitId || "MOCK-1", reasoning: "This unit perfectly matches the required sqft and falls within the brand's expansion budget." },
          { unitId: units?.[1]?.unitId || "MOCK-2", reasoning: "Strong secondary option with excellent frontage suitable for this category." }
        ]
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const prompt = `You are an expert Retail Leasing Advisor for ECHT Advisory, a premium real estate firm.

Analyze this brand expansion requirement:
${JSON.stringify(requirement, null, 2)}

Against these available units:
${JSON.stringify(units, null, 2)}

Recommend the TOP 2 best-matching units. Consider area, category, project type, and budget.

Provide a comprehensive, professional analysis. Respond STRICTLY as a JSON object:
{"recommendations": [{"unitId": "...", "reasoning": "... (3-4 sentences)"}]}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return NextResponse.json(JSON.parse(text));

  } catch (error) {
    console.error("AI Space Matcher Error:", error);
    return NextResponse.json({ error: 'AI matching failed', recommendations: [] }, { status: 500 });
  }
}
