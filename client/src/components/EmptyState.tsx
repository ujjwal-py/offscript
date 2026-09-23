import { Center, Text } from "@chakra-ui/react";

function EmptyState({ message = "No posts found." }: { message?: string }) {
    return (
        <Center width="full" minH="180px" padding="8">
            <Text textAlign="center" color="fg.muted" fontSize="lg">
                {message}
            </Text>
        </Center>
    );
}

export default EmptyState;
