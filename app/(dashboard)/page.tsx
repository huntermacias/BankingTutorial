'use client'; 
import { UserButton } from "@clerk/nextjs";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
// import styles from "./Fancy.module.css"

export default function Home() {
  // const {data: accounts, isLoading } = useGetAccounts();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="">
      Dashboard
      {/* {accounts?.map((account) => (
        <div className="mt-[300px]" key={account.id}>
          <div>name: {account.name}</div>
        </div>
      ))} */}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
