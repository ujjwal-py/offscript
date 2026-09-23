import { useEffect, useState } from 'react'
import { Button, HStack, Text } from "@chakra-ui/react"
import { IconContext } from 'react-icons/lib'
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { api } from '@/Api';
import { useLikeStore, type HomePost } from '@/store/postStore';
import { useAuthStore } from '@/store/authStore';
import type { errorType } from '@/store/errorStore';
import { AxiosError } from 'axios';
import { toaster } from './ui/toaster';


function LikeButton({ post }: { post: HomePost }) {
    const user = useAuthStore((state) => state.user);
    const likes = useLikeStore((state) => state.likesByPost[post.id] ?? post.Likes);
    const setLikes = useLikeStore((state) => state.setLikes);
    const addLike = useLikeStore((state) => state.addLike);
    const removeLike = useLikeStore((state) => state.removeLike);
    const [pending, setPending] = useState(false);
    const like = Boolean(user && likes.some((item) => item.userId === user.id));


    useEffect(() => {
        setLikes(post.id, post.Likes);
    }, [post.id, post.Likes, setLikes]);


    const handleLike = async () => {
        if (!user || pending) return;

        setPending(true);
        try {
            if (!like) {
                await api.post(`/like-post/${post.id}`);
                addLike({ postId: post.id, userId: user.id })
            } else {
                await api.delete(`/dislike-post/${post.id}`);
                removeLike({ postId: post.id, userId: user.id })
            }
            toaster.create({
                title: `Post ${like === true ? "Unliked" : "Liked"}`,
                type: "success"
            })


        } catch (err) {
            // console.error("Error liking/disliking post:", error);
            if (err instanceof AxiosError) {
                const Error: errorType = err.response?.data;
                toaster.create({
                    title: Error.message,
                    description: Error.errCode,
                    type: "error"
                })
            }

        } finally {
            setPending(false);
        }
    }
    return (
        <HStack justifyContent="center" alignItems="center" gap="2">
            <Text fontSize="md" fontWeight="semibold">{like ? "Unlike" : "Like"}</Text>
            <IconContext.Provider value={{ color: "red", style: { cursor: "pointer", background: "none" } }}>
                <Button bg="bg.subtle" _hover={{ bg: "bg.muted" }} onClick={handleLike} disabled={!user || pending}>
                    {like ? <BsSuitHeartFill /> : <BsSuitHeart />}
                </Button>
            </IconContext.Provider>
        </HStack>
    )
}

export default LikeButton
