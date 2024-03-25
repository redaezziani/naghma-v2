import { SignIn, createThreeRoles } from "@/(db)/auth";
import { prisma } from "@/(secrets)/secrets";
import { redirect } from "next/navigation";

const Home =async () => {
  
  redirect('/signin')
  return (
    <main className="flex min-h-screen flex-col items-center relative justify-center p-24">
      
    </main>
  );
}

export default Home;
