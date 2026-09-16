import {
    CloseButton, Dialog,
    Portal,
}
    from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { usePostStore } from "@/store/postStore";
import type { OpenablePost } from "@/store/postStore";

type UsageProps = "create" | "update" | "view"

// props for the dialog content component
export type DialogContextProps = {
    usage: UsageProps; // tells the type of component or dialogue 
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>; // shared state to open/close the dialogue
    refetch?: () => Promise<void>; // shared state by the grand parent to refresh data
};

type PostDialogueProps = {
    post: OpenablePost; // the post to be displayed in the dialogue
    DialogContent: React.ComponentType<DialogContextProps>;
    usage: UsageProps;
    refetch(): Promise<void>; // shared state by the grand parent to refresh data
    trigger: React.ReactNode; // the component that will trigger the dialogue to open
};

function PostDialogue({ post, trigger, refetch, DialogContent, usage }: PostDialogueProps) {
    const [open, setOpen] = useState(false)
    const { currPost, setCurrPost } = usePostStore();
    useEffect(() => {
        if (open) {
            setCurrPost(post);
        } else {
            setCurrPost(null);
        }
    }, [open])


    return (
        <Dialog.Root lazyMount size={usage === "view" ? "full" : "cover"}
            placement="center"
            scrollBehavior="inside"
            motionPreset="slide-in-bottom" open={open}
            onOpenChange={(e) => setOpen(e.open)}>
            <Dialog.Trigger asChild>
                <div>{trigger}</div>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content
                        width="100vw"
                        maxW="100vw"
                        height="100vh"
                        maxH="100vh"
                        borderRadius="0"
                        overflow="hidden"
                        bg="bg"
                    >
                        <Dialog.Header>
                            <Dialog.Title></Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body px={{ base: "3", md: "6" }} overflowY="auto">
                            {currPost ? <DialogContent
                                setOpen={setOpen} usage={usage} refetch={refetch} />
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



export default PostDialogue;
