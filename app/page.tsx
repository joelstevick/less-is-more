"use client";

import Textarea from "@/components/textarea/textarea";
import ScrollableText from "@/components/scrollable-text/scrollable-text";
import Button from "@/components/button/button";
import VSpacer from "@/components/v-spacer/v-spacer";
import { useRef, useState } from "react";
import CopyToClipboard from "@/components/clipboard/copy-to-clipboard";
import HSpacer from "@/components/h-spacer/h-spacer";
import { ToastContainer } from "react-toastify";
import Spinner from "@/components/spinner/spinner";
import axios from "axios";

export default function Home() {
  const [userContent, setUserContent] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  async function getAiResponse(event: MouseEvent) {
    setLoading(true);

    const res = await axios.post("/api/openai", { prompt: textareaRef.current?.value ?? '' });

    setLoading(false)
    
    setAiResponse(res.data);
  }

  function use(event: MouseEvent) {
    setUserContent(aiResponse);

    setAiResponse("");
  }

  return (
    <main className="p-16">
      <div className="flex justify-end">
        <Button onClick={getAiResponse}>Get AI Assitance</Button>
        <HSpacer />
        <CopyToClipboard textareaRef={textareaRef} />
      </div>
      <VSpacer />
      <Textarea ref={textareaRef} content={userContent} />

      <VSpacer />
      <VSpacer />
      <VSpacer />

      {aiResponse.length > 0 && (
        <div className="flex justify-end">
          <Button onClick={use}>Use</Button>
        </div>
      )}
      <VSpacer />
      {aiResponse.length > 0 && <ScrollableText content={aiResponse} />}

      {loading && <Spinner />}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
      />
    </main>
  );
}
