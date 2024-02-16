'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import * as z from "zod";
import Link from "next/link";
import { Mode } from "@/components/ui/them-mode";
import { toast } from "sonner";
import { ResetPassword } from "@/(db)/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircledIcon } from "@radix-ui/react-icons"

const schema = z.object({
    password: z.string().min(8, { message: "يجب أن تكون كلمة المرور على الأقل 8 أحرف" })
});

const ResetPasswordPage = ({ params }) => {
    const token = params.token;
    const [password, setPassword] = useState("");

    const [error, setError] = useState("")
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = schema.parse({ password });
            setError("");
            const response = await ResetPassword(token, password);

            if (response.type === "error") {
                toast.error(response.message, {
                    description: "حدث خطأ",
                    action: {
                        label: "تراجع",
                        onClick: () => console.log("تراجع"),
                    },
                });
            } else {
                setMessage(response.message);
                toast.success(response.message, {
                    description: "حدث خطأ",
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
                console.error("حدث خطأ:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center relative ">
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
                        تغيير كلمة المرور
                    </h1>
                    <p
                        className=" text-xs text-gray-800 dark:text-gray-100/40 tracking-tight"
                    >
                        أدخل كلمة المرور الجديدة لإعادة تعيين كلمة المرور الخاصة بك
                    </p>
                </div>
                <div className="w-full mt-4 flex flex-col gap-2 justify-start items-start">
                    <label
                        htmlFor="password"
                        className="text-sm font-bold text-gray-800 dark:text-gray-100 tracking-tight"
                    >
                        كلمة المرور الجديدة
                    </label>
                    <Input
                        type="password"
                        name="password"
                        id="email"
                        value={password}
                        onChange={handleChange}
                        className="py-3 h-12"
                        placeholder="أدخل كلمة المرور الجديدة ..."
                    />
                    {error && <p className="text-xs text-[#ff5420] dark:text-[#ff5420]">{error}</p>}
                </div>

                {
                    message && (
                        <Alert
                            className=" bg-emerald-100 text-emerald-500"
                        >
                            <CheckCircledIcon className="h-4 w-4" />
                            <AlertTitle
                                className="text-emerald-700 dark:text-emerald-300"
                            >
                                نجاح
                            </AlertTitle>
                            <AlertDescription>
                                {message}
                            </AlertDescription>
                        </Alert>
                    )
                }
                <span
                    className="text-xs w-full gap-2 justify-start items-start flex text-gray-800 dark:text-gray-100 tracking-tight hover:underline"
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
                    تغيير كلمة المرور
                </Button>

            </form>
        </main>
    )
}

export default ResetPasswordPage
