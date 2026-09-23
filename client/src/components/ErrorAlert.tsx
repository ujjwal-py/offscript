import React from 'react'
import { Alert } from '@chakra-ui/react'

function ErrorAlert({ errorMessage }: { errorMessage: string }) {
    return (
        <>
            <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Content>
                    <Alert.Title>An Error Occured</Alert.Title>
                    <Alert.Description>
                        {errorMessage}
                    </Alert.Description>
                </Alert.Content>
            </Alert.Root>
        </>
    )
}

export default ErrorAlert