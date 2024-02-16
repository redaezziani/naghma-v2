'use client';
import { Mode } from "@/components/ui/them-mode";
const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center relative justify-center p-24">
      <div className="top-4 fixed z-50 right-4">
      <Mode />
      </div>
    </main>
  );
}

export default Home;
