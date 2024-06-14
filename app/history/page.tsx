import Nav from "@/components/nav/nav";
import { supabase } from "../supabase/server";

export default async function HistoryPage() {
  const { data: history } = await supabase.from("history").select();

  return (
    <>
      <Nav />
      <main className="p-16 pt-0 h-screen">
        {history?.map((story) => {
          return <div key={story.id} className="border-blue-500 mt-3 border-t-2 pt-2">{story.story}</div>;
        })}
      </main>
    </>
  );
}
