import Textarea from "@/components/textarea/textarea";
import ScrollableText from "@/components/scrollable-text/scrollable-text";
import Button from "@/components/button/button";
import VSpacer from "@/components/v-spacer/v-spacer";

export default function Home() {
  return (
    <main className="p-4">
      <div className="flex justify-end">
        <Button>Reduce</Button>
      </div>
      <VSpacer />
      <Textarea />

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
