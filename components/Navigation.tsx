"use client"

import { usePathname, useRouter } from "next/navigation";
import { useMedia } from 'react-use';

import { NavLink } from "@/components/NavLink";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";



const routes = [
    { href: '/', label: 'Overview' },
    { href: 'transactions', label: 'Transactions' },
    { href: 'accounts', label: 'Accounts' },
    { href: 'categories', label: 'Categories' },
    { href: 'settings', label: 'Settings' },
];

export const Navigation = () => {

    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const isMobile = useMedia('(max-width: 1024px)', false);

    const onClick = (href: string) => {
        router.push(href);
        setIsOpen(false);
    }

    // Mobile Navigation
    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger className="bg-black/70 text-white hover:bg-black/90 focus:ring-4 focus:ring-purple-500 rounded-lg shadow-md">
                       <MenuIcon size={24} />
                </SheetTrigger>
                <SheetContent side="left" className="bg-gray-800 p-4">
                    <nav className="flex flex-col gap-y-2">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                onClick={() => onClick(route.href)}
                                className={`w-full text-left py-2 rounded-md transition-colors duration-300 
                                            hover:bg-violet-700 ${route.href === pathname ? "bg-violet-600" : "bg-transparent"} text-white`}
                            >
                                {route.label}
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        );
    }

    // Desktop Navigation
    return (
        <nav className="hidden lg:flex items-center justify-end gap-x-4 text-white p-2 overflow-x-auto">
            {routes.map((route) => (
                <NavLink
                    key={route.href}
                    href={route.href}
                    label={route.label}
                    isActive={pathname === route.href}
                />
            ))}
        </nav>
    )
}