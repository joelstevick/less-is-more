import { supabase } from "../supabase/server";

export default async function HistoryPage() {
  const { data: history } = await supabase.from("history").select();

  return (
      <main className="p-16 h-screen">{JSON.stringify(history, null, 2)}</main>
  );
}
