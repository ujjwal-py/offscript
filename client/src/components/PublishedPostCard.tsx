import { Card, HStack, Text, Image } from '@chakra-ui/react'
import { BsSuitHeartFill } from "react-icons/bs";
import type { PublishedPost } from '@/store/postStore'

function PublishedPostCard({ post }: { post: PublishedPost }) {
    return (
        <Card.Root maxWidth="full" size="sm" overflow="hidden"
            borderWidth="1px" margin="2" borderRadius="lg"
            bg="bg.muted"
            borderColor="bg.emphasized" boxShadowColor="bg.muted"
            _hover={{ borderColor: "bg.inverted", cursor: "pointer" }} >
            <Card.Body display="flex" flexDirection="row" justifyContent="space-between">
                <HStack>
                    {post.imageUrl && <Image src={post.imageUrl} width="20" height="20" alt={post.title} />}
                    <Card.Title fontSize="lg">{post.title}</Card.Title>
                </HStack>
                <HStack gap="2">
                    <BsSuitHeartFill />
                    {post.Likes?.length || 0}
                </HStack>
            </Card.Body>
            <Card.Footer gap="1" justifyContent="space-between">
                <Text fontSize="sm" color="gray.500">
                    Last updated -  {post.updatedAt.slice(0, 10)}
                </Text>
            </Card.Footer>
        </Card.Root >
    )
}

export default PublishedPostCard