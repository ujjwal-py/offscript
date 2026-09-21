import { Card, Text } from '@chakra-ui/react'
import type { DraftPost } from '@/store/postStore'

type DraftedPostCardProps = {
    post: DraftPost
}

function DraftedPostCard({ post }: DraftedPostCardProps) {
    return (
        <Card.Root maxWidth="full" size="sm" overflow="hidden"
            bg="bg.muted"
            borderWidth="1px" margin="2" borderRadius="lg"
            borderColor="grey.400" boxShadowColor="bg.subtle"
            _hover={{ borderColor: "bg.inverted", cursor: "pointer" }} >
            <Card.Body gap="1">
                <Card.Title fontSize="lg">{post.title}</Card.Title>
            </Card.Body>
            <Card.Footer gap="1">
                <Text fontSize="sm" color="gray.500">
                    Last updated -  {post.updatedAt.slice(0, 10)}
                </Text>
            </Card.Footer>
        </Card.Root>
    )
}

export default DraftedPostCard