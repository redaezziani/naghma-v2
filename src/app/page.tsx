"use client";
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import ComponentToPrint from '@/components/my-ui/anlys/invoice';
import { Button } from '@/components/ui/button';
const Home =async () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    //@ts-ignore
    content: () => componentRef.current,
  });

  return (
    <main className="flex min-h-screen flex-col items-center relative justify-center p-24">
       <div>
      <ComponentToPrint
      //@ts-ignore
      ref={componentRef} />
      <Button
      
      onClick={handlePrint}>Print this out!</Button>
    </div>
    </main>
  );
}

export default Home;
