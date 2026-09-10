import React from 'react'
import { Card, Text } from '@chakra-ui/react'
import type { UserPost } from '@/types'

type DraftedPostCardProps = {
    post: UserPost
}

function DraftedPostCard({ post }: DraftedPostCardProps) {
    return (
        <Card.Root maxWidth="full" overflow="hidden"
            borderWidth="1px" margin="2" borderRadius="md"
            borderColor="grey.400" boxShadowColor="white"
            _hover={{ borderColor: "white", cursor: "pointer" }} >
            <Card.Body gap="1">
                <Card.Title fontSize="lg">{post.title}</Card.Title>
            </Card.Body>
            <Card.Footer gap="1">
                <Text fontSize="sm" color="gray.500">
                    Likes/Tags
                </Text>
            </Card.Footer>
        </Card.Root>
    )
}

export default DraftedPostCard