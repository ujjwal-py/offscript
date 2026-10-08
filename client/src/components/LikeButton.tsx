import { useEffect, useState } from 'react'
import { Button, HStack, Text } from "@chakra-ui/react"
import { IconContext } from 'react-icons/lib'
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { api } from '@/Api';
import { useLikeStore, type HomePost } from '@/store/postStore';
import { useAuthStore } from '@/store/authStore';
import { toaster } from './ui/toaster';
import { AxiosError } from 'axios';


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
        if (!user) {
            toaster.create({
                title: "Please sign in to like posts",
                type: "error",
            });
            return;
        }

        if (pending) return;

        setPending(true);
        try {
            if (!like) {
                await api.post(`/posts/${post.id}/like`);
                addLike({ postId: post.id, userId: user.id })
            } else {
                await api.delete(`/posts/${post.id}/dislike`);
                removeLike({ postId: post.id, userId: user.id })
            }
            toaster.create({
                title: `Post ${like === true ? "Unliked" : "Liked"}`,
                type: "success"
            })


        } catch (err) {
            // The Axios interceptor displays the error toast.
            if (err instanceof AxiosError) {
                console.log(err.message)
                console.log(err.cause)
            }

        } finally {
            setPending(false);
        }
    }
    return (
        <HStack justifyContent="center" alignItems="center" gap="2">
            <Text fontSize="md" fontWeight="semibold">{like ? "Unlike" : "Like"}</Text>
            <IconContext.Provider value={{ color: "red", style: { cursor: "pointer", background: "none" } }}>
                <Button bg="bg.subtle" _hover={{ bg: "bg.muted" }} onClick={handleLike} disabled={pending}>
                    {like ? <BsSuitHeartFill /> : <BsSuitHeart />}
                </Button>
            </IconContext.Provider>
        </HStack>
    )
}

export default LikeButton
