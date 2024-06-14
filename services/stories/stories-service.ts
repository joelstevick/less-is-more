import { Story } from "@/models/story.model";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

class StoriesService {
  private stories: Story[] = [];

  private constructor() {

    this.init();
  }
  private async init() {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore,
    });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session!.user;

    const { data: stories, error } = await supabase
      .from("history")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    this.stories = stories ?? [];

    if (error) {
      console.error("Error fetching watches");
    }

    console.log("StoriesService", stories);
  }

  private static instance: StoriesService | null = null;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new StoriesService();
    }

    return this.instance;
  }

  public getStories() {
    return this.stories;
  }
}

export default StoriesService.getInstance();
