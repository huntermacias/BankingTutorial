import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
    href: string;
    label: string;
    isActive?: boolean;
}

export const NavLink = ({ href, label, isActive }: Props) => {
    return (
        <Button
            asChild
            size='sm'
            variant='ghost'
            className={cn(
                `px-3 py-2 rounded-md  transition-colors duration-300 bg-gray-950/30 filter backdrop-blur-sm`, // default classes
                isActive ? "text-white bg-white/30 font-bold" : "hover:bg-white/70 hover:text-black", // active/inactive classes
            )}
        >
            <Link href={href}>
                {label}
            </Link>
        </Button>
    )
}