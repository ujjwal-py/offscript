import {
    CloseButton, Dialog,
    Portal,
}
    from "@chakra-ui/react"
import { useState, useEffect } from "react"


// props for the dialog content component
export type DialogContextProps<T> = { // generic here telling the type for post
    post: T; // post data to be used
    usage: "create" | "update" | "view"; // tells the type of component or dialogue 
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>; // shared state to open/close the dialogue
    setRefresh?: React.Dispatch<React.SetStateAction<boolean>>; // shared state by the grand parent to refresh data
};

type PostDialogueProps<T> = {
    post: T;
    DialogContent: React.ComponentType<DialogContextProps<T>>;
    usage: "create" | "update" | "view";
    setRefresh?: React.Dispatch<React.SetStateAction<boolean>>;
    trigger: React.ReactNode; // the component that will trigger the dialogue to open
};

function UserPostDialogue<T>({ post, trigger, setRefresh, DialogContent, usage }: PostDialogueProps<T>) {
    const [open, setOpen] = useState(false)
    const [selectedPost, setSelectedPost] = useState<T | null>(null)
    useEffect(() => {
        setSelectedPost(post);
    }, [open])


    return (
        <Dialog.Root lazyMount size={usage === "view" ? "full" : "cover"}
            placement="center"
            scrollBehavior={usage === "view" ? "inside" : "outside"} // scroll for view and no scroll for create and update
            motionPreset="slide-in-bottom" open={open}
            onOpenChange={(e) => setOpen(e.open)}>
            <Dialog.Trigger asChild>
                <div>{trigger}</div>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title></Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            {selectedPost ? <DialogContent post={selectedPost}
                                setOpen={setOpen} usage={usage} setRefresh={setRefresh} />
                                : <p>Loading...</p>}
                        </Dialog.Body>
                        <Dialog.Footer>

                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton bg="red.600" size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}






export default UserPostDialogue