// import type { DialogContextProps } from "@/components/UserPostDialogue"
import { Text, Image, Stack, Card } from '@chakra-ui/react'
// import type { Post } from '@/types';
import { BASE_URL } from "@/config"
import LikeButton from "./LikeButton";
import { usePostStore } from '@/store/postStore';

function ViewPostCard() {
  const { currPost: post } = usePostStore();
  if (!post) {
    return <div>loading...</div>
  }
  return (
    <Card.Root
      width="full"
      maxW="full"
      overflow="hidden"
      borderWidth="2px"
      bg="bg.panel"
      borderRadius="md"
      padding={{ base: "2", md: "4" }}
      borderColor="bg.subtle"
      boxShadow="md"
    >
      <Stack
        width="full"
        alignItems="center"
        justifyContent="center"
        marginTop={{ base: "2", md: "4" }}
        gap={{ base: "3", md: "4" }}
      >
        <Text
          width="full"
          textAlign="center"
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
          overflowWrap="anywhere"
        >
          {post.title}
        </Text>
        <Text
          width="full"
          textAlign="center"
          fontSize="md"
          fontWeight="semibold"
          overflowWrap="anywhere"
        >
          {post.author.name || "user"} - {post.author.email}
        </Text>
        {post?.imageUrl && (
          <Image
            src={`${BASE_URL}${post.imageUrl}`}
            alt={post.title}
            width="full"
            maxW="100%"
            maxH={{ base: "35vh", md: "55vh" }}
            objectFit="contain"
          />
        )}
        <Text width="full" fontSize="md" overflowWrap="anywhere">
          {post.description && post.description}
        </Text>
        <LikeButton postId={post.id} Likes={post.Likes} />
      </Stack>
    </Card.Root>
  )
}

export default ViewPostCard;
