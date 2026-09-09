import React from 'react'
import { Card, Image, Stack, Text } from '@chakra-ui/react'
import type { Post } from '@/types'

type PostCardProps = {
    post: Post
}

function PostCard({ post }: PostCardProps) {
    const BASE_URL = "http://localhost:3000"

    return (
        <Card.Root width="full" height="34" margin="2" padding="4">
            {post.imageUrl && <Image src={`${BASE_URL}${post.imageUrl}`} width="1/2" height="34" />}
            <Card.Body gap="2">
                <Card.Title>{post.title}</Card.Title>
                <Card.Description>
                    <Stack>
                        <h3 className='font-semibold'>{post.author.email}</h3>
                        <Text truncate>
                            {post.description}
                        </Text>
                    </Stack>
                </Card.Description>
            </Card.Body>
            <Card.Footer gap="2">
                Read More....
            </Card.Footer>
        </Card.Root>
    )
}

export default PostCard