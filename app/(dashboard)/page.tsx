import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
// import styles from "./Fancy.module.css"

export default function Home() {
  return (
    <div className="">
      Dashboard
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
