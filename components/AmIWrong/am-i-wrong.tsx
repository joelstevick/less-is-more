"use client";

import Textarea from "@/components/textarea/textarea";
import ScrollableText from "@/components/scrollable-text/scrollable-text";
import Button from "@/components/button/button";
import VSpacer from "@/components/v-spacer/v-spacer";
import { useRef, useState } from "react";
import CopyToClipboard from "@/components/clipboard/copy-to-clipboard";
import HSpacer from "@/components/h-spacer/h-spacer";
import { updateHistory } from "@/server-actions/update-history"
import { ToastContainer } from "react-toastify";
import Spinner from "@/components/spinner/spinner";
import axios from "axios";
import { Story } from "@/models/story.model";

function convertTextToHtml(text: string) {
  let html = text.replaceAll("\n", "<br>");
  return html;
}

export default function Home({userStory}: {userStory: Story}) {
  const [story, setStory] = useState(userStory?.story);
  const [aiSummary, setAiSummary] = useState(userStory?.summary);
  const [aiSummaryText, setAiSummaryText] = useState(userStory?.summary);
  const [aiPoll, setAiPoll] = useState(userStory?.poll);
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
    setStory(aiSummaryText);
    setAiSummary("");
    setAiPoll("");
  }

  return (
    <main className="p-16 h-screen">
      <div className="text-blue-500 text-4xl text-center mb-16">
        Am I Wrong?
      </div>
      <form action={updateHistory} className="mt-4">
        <div className="flex items-end justify-between pb-1">
          <div className="text-blue-500 text-2xl">My Story</div>
          <div className="flex justify-end">
            <Button onClick={getAiResponse}>Get AI Assistance</Button>
            <HSpacer />
            <CopyToClipboard textareaRef={textareaRef} />
            <HSpacer></HSpacer>
            <Button type="submit">Save</Button>

          </div>
        </div>
        <Textarea
          ref={textareaRef}
          value={story}
          name="story"
          onChange={(e) => setStory(e.target.value)}
        />
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
            <input type="hidden" name="summary" value={aiSummary}></input>

          </>
        )}
        {aiPoll.length > 0 && (
          <>
            <VSpacer />
            <VSpacer />
            <VSpacer />
            <div className="text-blue-500 text-2xl">Poll choices</div>
            <input type="hidden" name="poll" value={aiPoll}></input>
            <ScrollableText content={aiPoll} />
          </>
        )}
      </form>
      {loading && <Spinner />}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
      />
    </main>
  );
}
