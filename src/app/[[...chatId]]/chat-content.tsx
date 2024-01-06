import React, { useState } from 'react';
import ChatInput from '@/components/chat-input';
import remarkGfm from 'remark-gfm';
import Markdown from 'react-markdown';

export default function ChatContent() {

    const [assistantResponse, setAssistanResponse] = useState<string>("")

  const handleSubmit = async (value: string, file?: File) => {
    try {
      const res = await fetch("/api/message", {
        method: "POST",
        body: JSON.stringify({ content: value }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok || !res.body) {
        alert("Error sending message");
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
    //   let finalResult = "";

      while (true) {
        const { value, done } = await reader.read();
        const text = decoder.decode(value);
        setAssistanResponse(currentValue=>currentValue + text)
        // finalResult += text;
        // console.log(finalResult);

        if (done) {
          break
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className="max-w-4xl w-full mx-auto flex-1 px-10 py-5 overflow-x-hidden overflow-y-auto">
        {/* Render AI content here */}
        {assistantResponse}
        <Markdown remarkPlugins={[remarkGfm]}>{assistantResponse}</Markdown>
      </div>
      <ChatInput onSubmit={handleSubmit} />
    </>
  );
}
