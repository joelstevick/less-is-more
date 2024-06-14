import AmIWrong from "@/components/AmIWrong/am-i-wrong";
import Nav from "@/components/nav/nav";
import StoriesService from "@/services/stories/stories-service";
import { lastValueFrom } from "rxjs";

const Home = async () => {
  const story = await lastValueFrom(StoriesService.getCurrentStory$());

  return (
    <>
      <Nav />
      <AmIWrong userStory={story} />
    </>
  );
};

export default Home;
