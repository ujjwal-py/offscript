import { Card, Image, Stack, Text } from '@chakra-ui/react'
import { BsSuitHeartFill } from 'react-icons/bs'
import { BASE_URL } from "@/config"
import { useLikeStore, type OpenablePost } from '@/store/postStore'
import { useEffect } from 'react';

function PostCard({ post }: { post: OpenablePost }) {
    const homePost = "author" in post && "Likes" in post ? post : null;
    const likes = useLikeStore((state) => state.likesByPost[post.id] ?? homePost?.Likes ?? []);
    const setLikes = useLikeStore((state) => state.setLikes);

    useEffect(() => {
        if (homePost) {
            setLikes(post.id, homePost.Likes);
        }
    }, [post.id, homePost, setLikes])

    if (!homePost) {
        return null;
    }
    return (
        <Card.Root maxWidth="full"
            height="72"
            overflow="hidden"
            borderWidth="2px"
            margin="2"
            borderRadius="md"
            boxShadow="xl"
            borderColor="bg.muted"
            boxShadowColor="bg.subtle"
            _hover={{ borderColor: "bg.inverted", cursor: "pointer" }} >
            {post.imageUrl && <Image src={`${BASE_URL}${post.imageUrl}`} fit="cover" maxHeight="1/3" />}
            <Card.Body gap="2">
                <Card.Title display="flex" gap="2" justifyContent="space-between" alignItems="center">
                    <Text fontSize="2xl" fontWeight="bold">
                        {post.title}
                    </Text>
                    <Text fontSize="sm" fontWeight="semibold" display="flex" alignItems="center" gap="1">
                        <BsSuitHeartFill /> {likes.length}
                    </Text>
                </Card.Title>

                <Card.Description>
                    <Stack width="full">
                        <Text fontSize="sm" fontWeight="semibold">
                            {homePost.author.name || "user"} - {homePost.author.email}
                        </Text>
                        <Text truncate fontSize="md" color="gray.50">
                            {post.description}
                        </Text>
                    </Stack>
                </Card.Description>
            </Card.Body>
            <Card.Footer gap="1">
                <Text fontSize="sm" color="gray.500">
                    Likes/Tags
                </Text>
            </Card.Footer>
        </Card.Root>
    )
}

export default PostCard
