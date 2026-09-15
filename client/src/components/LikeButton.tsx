import { useState } from 'react'
import { Button, HStack, Text } from "@chakra-ui/react"
import { IconContext } from 'react-icons/lib'
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { api } from '@/Api';
import { useAuth } from '@/hooks/useAuth';

type LikeType = {
    userId: string
}

function LikeButton({ postId, Likes }: { postId: number; Likes: LikeType[]; }) {
    const { user } = useAuth();
    const [like, setLike] = useState<boolean>(Likes.some((l: LikeType) => l.userId === user?.id) || false);
    const handleLike = async () => {
        try {
            if (!like) {
                await api.post(`/like-post/${postId}`);
            } else {
                await api.delete(`/dislike-post/${postId}`);
            }
            setLike(!like);
        } catch (error) {
            console.error("Error liking/disliking post:", error);
        }
    }
    return (
        <HStack justifyContent="center" alignItems="center" gap="2">
            <Text fontSize="md" fontWeight="semibold">{like ? "Unlike" : "Like"}</Text>
            <IconContext.Provider value={{ color: "red", style: { cursor: "pointer", background: "none" } }}>
                <Button bg="bg.subtle" _hover={{ bg: "bg.muted" }} onClick={handleLike}>
                    {like ? <BsSuitHeartFill /> : <BsSuitHeart />}
                </Button>
            </IconContext.Provider>
        </HStack>
    )
}

export default LikeButton