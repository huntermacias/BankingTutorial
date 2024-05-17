import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";

export const useConfirm = (title: string, message: string): [() => JSX.Element, () => Promise<boolean>] => {
    const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);

    const confirm = () => new Promise<boolean>((resolve) => {
        setPromise({ resolve });
    });

    const handleClose = () => {
        setPromise(null);
    };

    const handleConfirm = () => {
        if (promise) {
            promise.resolve(true);
        }
        handleClose();
    };

    const handleCancel = () => {
        if (promise) {
            promise.resolve(false);
        }
        handleClose();
    };

    const ConfirmationDialog = () => (
        <Dialog open={promise !== null}>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle className="text-xl">{title}</DialogTitle>
                    <DialogDescription className="">{message}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="pt-2">
                    <Button 
                        variant="outline" 
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return [ConfirmationDialog, confirm];
};