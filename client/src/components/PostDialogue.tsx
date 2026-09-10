import {
    CloseButton, Dialog,
    Portal,
}
    from "@chakra-ui/react"
import { useState, useEffect } from "react"
import type { UserPost } from "@/types"
import PostFormCard from "./PostFormCard"

type PostDialogueProps = {
    post: UserPost,

    children: React.ReactNode;
}

function PostDialogue({ post, children }: PostDialogueProps) {
    const [open, setOpen] = useState(false)
    const [selectedPost, setSelectedPost] = useState<UserPost | null>(null)
    useEffect(() => {
        setSelectedPost(post);
    }, [open])


    return (
        <Dialog.Root lazyMount size="cover" placement="center" motionPreset="slide-in-bottom" open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Dialog.Trigger asChild>
                <div>{children}</div>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Edit your draft</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            {selectedPost ? <PostFormCard post={selectedPost} usage="update" /> : <p>Loading...</p>}
                        </Dialog.Body>
                        <Dialog.Footer>

                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}







export default PostDialogue