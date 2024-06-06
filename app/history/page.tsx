import { createClient } from "../supabase/utils/create-client";

export default async function HistoryPage() {
  const supabase = createClient();
  const { data: history } = await supabase.from("history").select();

  return <pre>{JSON.stringify(history, null, 2)}</pre>
}