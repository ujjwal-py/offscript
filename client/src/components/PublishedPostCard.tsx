import { Card, HStack, Text, Image } from '@chakra-ui/react'


import { BASE_URL } from "@/config"
import type { PublishedPost } from '@/store/postStore'

function PublishedPostCard({ post }: { post: PublishedPost }) {
    return (
        <Card.Root maxWidth="full" size="sm" overflow="hidden"
            borderWidth="1px" margin="2" borderRadius="md"
            borderColor="grey.400" boxShadowColor="white"
            _hover={{ borderColor: "white", cursor: "pointer" }} >
            <Card.Body>
                <HStack>
                    {post.imageUrl && <Image src={BASE_URL + post.imageUrl} width="20" height="20" alt={post.title} />}
                    <Card.Title fontSize="lg">{post.title}</Card.Title>
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