import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json(
      { message: "Prompt is required" },
      { status: 400 }
    );
  }

  const requestForSummary = `rewrite this text to remove redundant thoughts and make it simpler and more hard hitting.  Express any bullet point items using a hyphen and the bullet point text should be terminated with 2 newlines.  Don't throw away the dramatic points. Here is the text: ${prompt}`;
  const requestForPoll = `I want to poll users about what they think of a piece of text.  Give me 1 poll question along with 3 choices. The poll questions should not use generic words like "protagonist" to refer to the text author, but should use first person such as I or My. Here is the text: ${prompt}`;

  try {
    const summaryRes = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: requestForSummary }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    const pollRes = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: requestForPoll }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    return NextResponse.json(
      { summary: summaryRes.data.choices[0].message.content, pollChoices: pollRes.data.choices[0].message.content },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching data from OpenAI" },
      { status: 500 }
    );
  }
}
