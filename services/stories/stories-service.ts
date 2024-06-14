import { Story } from "@/models/story.model";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { BehaviorSubject, filter, map, take } from "rxjs";
class StoriesService {
  private stories$ = new BehaviorSubject<Story[] | null>(null);

  private constructor() {
    this.init();
  }
  private async init() {
    console.log("StoriesService entered");

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

    this.stories$.next(stories ?? []);

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


  getCurrentStory$() {
    console.log("getCurrentStory");

    return this.stories$.pipe(
      filter(stories => !!stories),
      take(1),
      map((stories) => {
        return (
          stories![0] ?? {
            id: randomUUID(),
            story: "",
            summary: "",
            poll: "",
          }
        );
      })
    );
  }
}

export default StoriesService.getInstance();
