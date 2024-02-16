'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import * as z from "zod";
import Link from "next/link";
import { Mode } from "@/components/ui/them-mode";
import { ForgetPassword } from "@/(db)/auth";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email({ message: "الرجاء إدخال بريد إلكتروني صالح" }),
});



const ForgetPasswordPage = () => {
  const [email , setEmail] = useState("");

  const [error, setError] = useState("")
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const result = schema.parse({ email });
      setError("");
      const response = await ForgetPassword(result.email);
        
      if (response.type === "error") {
        toast.error(response.message, {
          description: "حدث خطأ",
          action: {
            label: "تراجع",
            onClick: () => console.log("تراجع"),
          },
        });
      } else {
        toast.success(response.message, {
          description: "تم بنجاح",
          action: {
            label: "تراجع",
            onClick: () => console.log("تراجع"),
          },
        });
        
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        // Handle other types of errors, e.g., network errors, server errors, etc.
        console.error("خطأ:", error);
      }
    } finally {
      setLoading(false);
    }
  };
  
  


  return (
    <main className="flex min-h-screen px-2 flex-col items-center justify-center relative ">
      <div
       className="absolute top-4 right-4"
      >
        <Mode />
      </div>
      
      <form
      className=" w-full md:w-[28rem]  flex justify-start items-center flex-col gap-4"
      action="">
        <div className="flex w-full flex-col gap-2 justify-start items-start">
          <h1
          className="text-xl  font-bold text-primary "
          >
          إعادة تعيين كلمة المرور 
          </h1>
          <p
          className=" text-xs text-gray-800 dark:text-gray-100/40 tracking-tight"
          >
            أدخل عنوان البريد الإلكتروني المرتبط بحسابك، وسنرسل لك رابطًا عبر البريد الإلكتروني لإعادة تعيين كلمة المرور الخاصة بك.
          </p>
        </div>
        <div className="w-full mt-4 flex flex-col gap-2 justify-start items-start">
          <label
          htmlFor="email"
          className="text-xs text-gray-800 dark:text-gray-100 tracking-tight"
          >
            البريد الإلكتروني
          </label>
          <Input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
          placeholder="أدخل بريدك الإلكتروني ..."
          />
          {error && <p className="text-xs text-[#ff5420] dark:text-[#ff5420]">{error}</p>}
        </div>
        <span
        className="text-xs w-full text-gray-800 dark:text-gray-100 tracking-tight hover:underline"
        >
         العودة إلى
          <Link
          className="text-xs ml-2 text-primary dark:text-primary tracking-tight"
          href="/signin"
           >
            تسجيل الدخول
          </Link>
        </span>
        <Button
        type="submit"
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleSubmit(e)}
        isloading={loading}
        className="w-full mt-4"
        size={"default"}
        >
          إعادة تعيين كلمة المرور
        </Button>

      </form>
    </main>  
  )
}

export default ForgetPasswordPage
