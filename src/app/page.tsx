"use server";

import { redirect } from "next/navigation";

const Home =async () => {
  redirect('/dashboard')
  return (
    <main className="flex min-h-screen flex-col items-center relative justify-center p-24">
    </main>
  );
}

export default Home;
