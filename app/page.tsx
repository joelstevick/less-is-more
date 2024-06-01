"use client"

import Textarea from "@/components/textarea/textarea";
import ScrollableText from "@/components/scrollable-text/scrollable-text";
import Button from "@/components/button/button";
import VSpacer from "@/components/v-spacer/v-spacer";
import { useRef } from "react";
import CopyToClipboard from "@/components/clipboard/copy-to-clipboard";

export default function Home() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <main className="p-16">
      <div className="flex justify-end">
        <Button>Reduce</Button>
        <CopyToClipboard textareaRef={textareaRef} />

      </div>
      <VSpacer />
      <Textarea ref={textareaRef}/>

      <VSpacer />
      <VSpacer />
      <VSpacer />

      <div className="flex justify-end">
        <Button>Use</Button>
      </div>
      <VSpacer />
      <ScrollableText />
    </main>
  );
}
