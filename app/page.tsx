import AmIWrong from '@/components/AmIWrong/am-i-wrong';
import Nav from '@/components/nav/nav';
import { redirect } from 'next/navigation';

async function fetchUser() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/api/auth`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // to include cookies in the request
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data.user;
}

const Home = async () => {
  const user = await fetchUser();

  if (!user) {
    // Server-side redirection using Next.js
    redirect('/login');
  }

  return (
    <>
      <Nav />
      <AmIWrong />
      <div>Welcome, {user.email}</div>
    </>
  );
};

export default Home;
