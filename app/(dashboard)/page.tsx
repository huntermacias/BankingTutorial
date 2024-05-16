'use client'; 
import { UserButton } from "@clerk/nextjs";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { Button } from "@/components/ui/button";
// import styles from "./Fancy.module.css"

export default function Home() {
  const { open } = useNewAccount(); 


  return (
    <div className="">
      <Button onClick={open}>
        Add Account
      </Button>
    
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
