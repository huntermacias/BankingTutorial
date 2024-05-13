import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

const SignInPage = () => {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* First column */}
            <div className="h-full lg:flex flex-col items-center justify-center px-4 bg-gray-900 text-white">
                <div className="text-center space-y-6 pt-16">
                    <h1 className="font-bold text-4xl">
                        Welcome Back
                    </h1>
                    <p className="text-lg">
                        Log in or create an account to access your Dashboard
                    </p>
                </div>

                <div className="flex items-center justify-center mt-10">
                    <ClerkLoaded>
                        <SignIn path="/sign-in" />
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2 className="animate-spin" />
                    </ClerkLoading>
                </div>
            </div>
            {/* Second column: Desktop only */}
            <div className="h-full bg-gradient-to-r from-violet-500 to-red-500 hidden lg:flex items-center justify-center">
                <Image
                    src="/logo.png"
                    alt="Company logo"
                    width={300}
                    height={300}
                    className="drop-shadow-2xl hover:animate-pulse transition-transform transform ease-in-out duration-2000 hover:scale-110 cursor-pointer"
                />
            </div>
        </div>
    );
}

export default SignInPage;
