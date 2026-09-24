import { Box, Link, Text } from "@chakra-ui/react";

function Footer() {
    return (
        <Box
            as="footer"
            width="full"
            padding="5"
            textAlign="center"
            borderTopWidth="1px"
            borderColor="border.muted"
            bg="bg"
        >
            <Text fontSize="sm" color="fg.muted">
                Built with care by Ujjwal · {" "}
                <Link
                    href="https://github.com/ujjwal-py"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="fg"
                    textDecoration="underline"
                >
                    GitHub
                </Link>
            </Text>
        </Box>
    );
}

export default Footer;
