import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// create protected routes 
const isProtectedRoute = createRouteMatcher([
    "/",
    // "/api(.*)",
]);


export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) {
        if (!auth) {
            return NextResponse.redirect("/sign-in");
        }
    }
    return NextResponse.next();

});

export const config = {
    matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],

};