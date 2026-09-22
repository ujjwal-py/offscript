import React from 'react'
import { Alert } from '@chakra-ui/react'

function ErrorAlert({ errorMessage }: { errorMessage: unknown }) {
    return (
        <>
            <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Content>
                    <Alert.Title>An Error Occured</Alert.Title>
                    <Alert.Description>
                        {String(errorMessage)}
                    </Alert.Description>
                </Alert.Content>
            </Alert.Root>
        </>
    )
}

export default ErrorAlert