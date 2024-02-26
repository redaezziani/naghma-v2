'use client';
import { Button } from "@/components/ui/button";
import { useState } from "react";
import * as z from "zod";
import Link from "next/link";
import { SignIn } from "@/(db)/auth";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { LockIcon, MailCheckIcon, UnlockIcon } from "lucide-react";
import React from "react";
import Image from "next/image";
const schema = z.object({
  email: z.string().email({ message: "الرجاء إدخال بريد إلكتروني صالح" }),
  password: z.string().min(8, { message: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل" }),
});
const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data , setData] = useState({
    email: "",
    password: ""
  })
  const router = useRouter();
  const [resError, setResError] = useState("");
  const [error, setError] = useState({
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    
    try {
      e.preventDefault();
      setLoading(true);
      const result = schema.parse(data);
      setError({ email: "", password: "" });
      const response:any = await SignIn(result);
      
      if (response.error) {
        toast.error(response.error);
        setResError(response.error);
      } 
      if (response.success) {
        router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        let newErrors = { email: "", password: "" };
        error.errors.forEach((validationError) => {
          if (validationError.path[0] === "email") {
            newErrors.email = validationError.message;
          } else if (validationError.path[0] === "password") {
            newErrors.password = validationError.message;
          }
        });
        setError(newErrors);
      } else {
        console.error("حدث خطأ:", error);
      }
    } finally {
      setLoading(false);
    }
  };
    
  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative ">
      <div className=" lg:w-[54rem] gap-0 lg:gap-6 flex justify-start items-center">
        <Image
        width={400}
        height={400}
        placeholder="blur"
        blurDataURL="/cofee.jpg"
        className=" h-full w-0 md:w-auto max-w-60   rounded-md object-cover aspect-[9/16]"
         src="/cofee.jpg" alt="" />
      <form
      className=" w-full md:w-[28rem]  flex justify-start items-center flex-col gap-4"
      action="">
        <div className="flex w-full flex-col gap-2 justify-start items-start">
        {resError && <p className="text-xs text-[#ff5420] dark:text-[#ff5420]">{resError}</p>}
          <h1
          className="text-xl  font-bold text-primary  "
          >
            !مرحبًا مجددًا
          </h1>
          <p
          className=" text-sm text-gray-800 dark:text-gray-100 tracking-tight"
          >
            سجّل الدخول إلى حسابك وابدأ في إدارة بياناتك
          </p>
        </div>
        <div className="w-full mt-4 flex flex-col gap-2 justify-start items-start">
          <label
          htmlFor="email"
          className="text-sm text-gray-800 font-semibold dark:text-gray-100 tracking-tight"
          >
            البريد الإلكتروني
          </label>
          <div className="w-full bg-muted px-3 py-1 rounded-md  flex gap-3 justify-between items-center">
          <input
          type="email"
          name="email"
          id="email"
          className="w-full border-none  py-2 outline-none bg-transparent "
          value={data.email}
          onChange={handleChange}
          placeholder="أدخل بريدك الإلكتروني ..."
          />
          <MailCheckIcon
           className={`w-5 h-5 text-slate-400 cursor-pointer`} 
           />
          </div>
          {error.email && <p className="text-xs text-[#ff5420] dark:text-[#ff5420]">{error.email}</p>}
        </div>
        <div className="w-full mt-4 flex flex-col gap-2 justify-start items-start">
          <label
          htmlFor="password"
          className="text-sm text-gray-800 font-semibold dark:text-gray-100 tracking-tight"
          >
            كلمة المرور
          </label>
          <div className="w-full bg-muted px-3 py-1 rounded-md  flex gap-3 justify-between items-center">
          <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          className="w-full border-none  py-2 outline-none bg-transparent "
          value={data.password}
          onChange={handleChange}
          placeholder="أدخل كلمة المرور الخاصة بك ..."
          />
           <div
           onClick={() => setShowPassword(!showPassword)}
           >
            {
              showPassword ? 
              <UnlockIcon
              onClick={() => setShowPassword(false)}
              className="w-5 h-5 text-slate-400 cursor-pointer"
              />
              :
              <LockIcon
              onClick={() => setShowPassword(true)}
              className="w-5 h-5 text-slate-400 cursor-pointer"
              />
            }
           </div>
          </div>
          {error.password && <p className="text-xs text-[#ff5420] dark:text-[#ff5420]">{error.password}</p>}
        </div>
        <span
        className="text-xs w-full gap-2 text-gray-800 dark:text-gray-100 tracking-tight hover:underline"
        >
          نسيت كلمة المرور !
          <Link
          className="text-xs mr-2 text-primary dark:text-primary tracking-tight"
          href="/forgot-password">
            إعادة تعيينها
          </Link>
        </span>
            <Button
            type="submit"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleSubmit(e)}
            isloading={loading}
            className="w-full mt-4 py-3"
           size={'lg'}
            >
              تسجيل الدخول
            </Button>
      </form>
      </div>
    </main>  
  )
}

export default Signin
