import Textarea from "@/components/textarea/textarea";
import ScrollableText from "@/components/scrollable-text/scrollable-text";
import Button from "@/components/button/button";
import VSpacer from "@/components/v-spacer/v-spacer";

export default function Home() {
  return (
    <main className="p-4">
      <Button>Reduce</Button>
      <VSpacer />
      <Textarea />
      <VSpacer />
      <ScrollableText />
    </main>
  );
}
