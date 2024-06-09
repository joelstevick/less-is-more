"use client";

import { useRef, useState } from "react";
import axios from "axios";
import AmIWrong from "@/components/AmIWrong/am-i-wrong";

function convertTextToHtml(text: string) {
  let html = text.replaceAll("\n", "<br>");
  return html;
}

export default function Home() {
  const [userContent, setUserContent] = useState("");
  const [aiSummary, setAiSummary] = useState("");
  const [aiSummaryText, setAiSummaryText] = useState("");
  const [aiPoll, setAiPoll] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  async function getAiResponse() {
    setAiSummary("");
    setAiPoll("");
    setLoading(true);

    const res = await axios.post("/api/openai", {
      prompt: textareaRef.current?.value ?? "",
    });

    setLoading(false);
    setAiSummary(convertTextToHtml(res.data.summary));
    setAiSummaryText(res.data.summary);
    setAiPoll(convertTextToHtml(res.data.pollChoices));
  }

  function use() {
    setUserContent(aiSummaryText);
    setAiSummary("");
    setAiPoll("");
  }

  return <AmIWrong></AmIWrong>;
}
