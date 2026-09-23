import { Center, Spinner, Stack, Text } from "@chakra-ui/react";

function LoadingScreen({ message }: { message: string }) {
    return (
        <Center width="full" minH="260px" padding="8">
            <Stack alignItems="center" gap="5">
                <Spinner size="xl" borderWidth="5px" colorPalette="purple" />
                <Text textAlign="center" fontSize={{ base: "md", md: "lg" }}>
                    {message}
                </Text>
            </Stack>
        </Center>
    );
}

export default LoadingScreen;
