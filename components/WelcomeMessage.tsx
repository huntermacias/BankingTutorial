"use client"

import { useUser } from "@clerk/nextjs";
import { format } from 'date-fns';  // Make sure to install date-fns if not already installed

export const WelcomeMessage = () => {
    const { user, isLoaded } = useUser();
    const username = user?.primaryEmailAddress?.emailAddress?.split('@')[0] ?? "Guest";
    const lastLogin = user?.lastSignInAt ? format(new Date(user.lastSignInAt), "eeee, MMMM do, yyyy 'at' h:mm bb") : "No recent login";

    return (
        <div className="p-4 border-l-8  border-blue-500 mx-24 border-b text-white rounded-lg shadow-lg mb-16">
            <h2 className='text-3xl lg:text-5xl font-semibold'>
                Welcome Back, {isLoaded ? `${user?.fullName ?? "Guest"}` : "Guest"} 👋
            </h2>
            <p className='text-lg mt-2'>
                Here's a snapshot of your financial dashboard.
            </p>
            <div className='mt-3'>
                <p className='text-md font-medium'>
                    Username: @{username}
                </p>
                <p className='text-md'>
                    Last logged in on: {lastLogin}
                </p>
                {/* <p className='text-md mt-3'>
                    Quick Tip: Did you know you can increase your savings by setting aside 20% of your net income each month? Try our savings planner to optimize your budget!
                </p> */}
            </div>
        </div>
    );
}
