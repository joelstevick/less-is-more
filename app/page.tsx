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

function convertTextToHtml(text: string) {
  let html = text.replaceAll("\n", "<br>");

  return html;
}

export default function Home() {
  const [userContent, setUserContent] = useState("");
  const [aiSummary, setAiSummary] = useState("");
  const [aiPoll, setAiPoll] = useState("");

  const [loading, setLoading] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  async function getAiResponse(event: MouseEvent) {
    setAiSummary("");
    setAiPoll("");
    setLoading(true);

    const res = await axios.post("/api/openai", {
      prompt: textareaRef.current?.value ?? "",
    });

    setLoading(false);

    setAiSummary(convertTextToHtml(res.data.summary));
    setAiPoll(convertTextToHtml(res.data.pollChoices));
  }

  function use(event: MouseEvent) {
    setUserContent(aiSummary);

    setAiSummary("");
    setAiPoll("");
  }

  return (
    <main className="p-16">
      <div className="text-blue-500 text-4xl text-center mb-16">
        Am I Wrong?
      </div>
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

      {aiSummary.length > 0 && (
        <>
          <VSpacer />
          <div className="flex justify-between items-end w-full pb-1">
            <div className="text-blue-500 text-2xl">Summary</div>
            <Button onClick={use}>Use</Button>
          </div>
          <ScrollableText content={aiSummary} />
        </>
      )}
      {aiPoll.length > 0 && (
        <>
          <VSpacer />
          <VSpacer />
          <VSpacer />

          <div className="text-blue-500 text-2xl">Poll choices</div>
          <ScrollableText content={aiPoll} />
        </>
      )}

      {loading && <Spinner />}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
      />
    </main>
  );
}
