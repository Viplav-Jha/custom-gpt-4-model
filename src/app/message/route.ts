import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { content } = await req.json();

  // send  that openai

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content }],
    model: "gpt-4-vision-preview",
    stream:true
  });
  console.log({content});

  const stream = OpenAIStream(chatCompletion)
 
  return new StreamingTextResponse(stream)
}
