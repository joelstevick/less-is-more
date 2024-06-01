import Textarea from "@/components/textarea/textarea";
import ScrollableText from "@/components/scrollable-text/scrollable-text";
import Button from "@/components/button/button";
import HSpacer from "@/components/h-spacer/h-spacer";

export default function Home() {
  return (
    <main className="p-4">
      <Button>Reduce</Button>
      <HSpacer />
      <Textarea />
      <HSpacer />
      <ScrollableText />
    </main>
  );
}
