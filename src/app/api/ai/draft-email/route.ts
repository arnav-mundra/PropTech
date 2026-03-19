import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { deal } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        emailDraft: `Subject: Partnership Finalized: ${deal.brand?.name} at ${deal.project?.name} – Unit ${deal.unit?.unitId}

Dear [Contact Name],

It is with great pleasure and excitement that I share the finalized lease agreement for ${deal.brand?.name} at ${deal.project?.name}. We are thrilled to officially welcome such a prestigious brand to our development.

We have successfully concluded the terms for Unit ${deal.unit?.unitId}, with the agreed rental at $${deal.rent?.toLocaleString()} per annum for a lease term of ${deal.leaseTerm} months.

**Documentation**
Please find the final, executed lease documents attached to this email for your records.

**Next Steps: Fit-out and Possession**
As we move into the next phase, our project and facilities teams are fully prepared to assist you. We are committed to ensuring a seamless transition during the fit-out period.

Warm regards,
ECHT Advisory Leasing Team`
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a senior leasing executive at ECHT Advisory, a premium real estate advisory firm.

Draft a professional, warm, and celebratory fit-out assistance email for this finalized retail lease deal:

Brand: ${deal.brand?.name}
Project: ${deal.project?.name}
Unit: ${deal.unit?.unitId}
Annual Rent: $${deal.rent?.toLocaleString()}
Lease Term: ${deal.leaseTerm} months
Lease Start: ${deal.leaseStartDate}

The email should:
1. Open with a warm congratulatory subject line and greeting
2. Confirm the finalized lease terms clearly
3. Outline next steps for fit-out and possession handover
4. Offer ECHT's full support and contact details
5. Close warmly

Write ONLY the email body (including a Subject: line at the top). Do not include any extra commentary.`;

    const result = await model.generateContent(prompt);
    return NextResponse.json({ emailDraft: result.response.text() });

  } catch (error) {
    console.error("AI Email Drafter Error:", error);
    return NextResponse.json({ error: 'Email generation failed', emailDraft: '' }, { status: 500 });
  }
}
