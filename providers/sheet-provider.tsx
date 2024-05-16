"use client";

import { useMountedState } from "react-use";
import {
     NewAccountSheet 
} from "@/features/accounts/components/new-account-sheet";

 

export const SheetProvider = () => {
    // need to check if the component is mounted before rendering
    // to avoid hydration errors

    const isMounted = useMountedState();

    if(!isMounted) { 
        return null; 
    }

    return (
        <>
            <NewAccountSheet />
        </>
    )
}