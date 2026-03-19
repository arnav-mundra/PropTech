import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { lead } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        strategy: [
          "Schedule a follow-up call within 48 hours to re-qualify requirements.",
          "Share a curated shortlist of units matching their preferred category and footprint.",
          "Prepare a competitive rent benchmarking report to accelerate the negotiation phase."
        ]
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const prompt = `You are a senior Retail Leasing Director at ECHT Advisory, a premium real estate advisory firm.

Analyze this leasing lead and generate a strategic action plan to advance it to the next stage:
${JSON.stringify(lead, null, 2)}

Current pipeline stage: ${lead.stage}

Provide exactly 3 clear, actionable, professional next steps to advance this deal. Each step should be specific, impactful, and relevant to the current stage.

Respond STRICTLY as a JSON object:
{"strategy": ["Step 1: ...", "Step 2: ...", "Step 3: ..."]}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return NextResponse.json(JSON.parse(text));

  } catch (error) {
    console.error("AI Deal Strategy Error:", error);
    return NextResponse.json({ error: 'Strategy generation failed', strategy: [] }, { status: 500 });
  }
}
