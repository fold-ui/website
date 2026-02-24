import {
    Heading,
    Link,
    Text,
    View
} from '@fold-ui/core'

export const SupportComponent = (props) => {
    return (
        <View 
            row 
            id="support"
            position="relative"
            p="5rem 0rem"
            width="100%"
            style={{ overflow: 'hidden' }}>
            <View
                row
                gap={50}
                width="85%"
                radius="var(--f-radius)"
                position="relative"
                style={{ overflow: 'hidden' }}
                alignItems="flex-start"
                className="support">
                <View
                    column
                    flex={1}
                    gap={30}
                    alignItems="flex-start"
                    p="5rem 0rem 5rem 5rem">
                    <Text
                        style={{ textTransform: 'uppercase' }}
                        letterSpacing={5}
                        colorToken="accent"
                        id="features">
                        Support
                    </Text>
                    <Heading
                        fontWeight={400}>
                        Have a question or need assistance?
                    </Heading>
                </View>

                <View
                    column
                    flex={2}
                    gap={30}
                    alignItems="flex-start"
                    p="5rem">
                    <View
                        column
                        gap={30}
                        position="relative">
                        {[
                            {
                                url: 'https://github.com/fold-ui/fold/issues',
                                title: 'Reporting Bugs',
                                text: 'If you want to contribute to the project or report a bug, you can open an issue or submit a pull request on the GitHub repository.',
                            },
                            {
                                url: 'https://github.com/fold-ui/fold/discussions',
                                title: 'Technical Support',
                                text: 'If you have a question or a suggestion, feel free to engage with the community on GitHub Discussions. Discussions allow you to ask for help, share ideas, and participate in conversations with other users.',
                            },
                            // {
                            //     url: 'mailto:support@fold.dev',
                            //     title: 'Pro',
                            //     text: 'For any other support needs, if you are a Pro customer, please feel free to reach out to us directly via email.',
                            // },
                        ].map(({ title, text, url }, index) => (
                            <View
                                key={index}
                                width="100%">
                                <Link
                                    href={url}
                                    target="_blank"
                                    textDecoration="none">
                                    <Heading
                                        as="h2"
                                        m="0 0 0.25rem 0"
                                        colorToken="text">
                                        {title} ↗
                                    </Heading>
                                </Link>
                                <Text colorToken="text-weaker">
                                    {text}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </View>
    )
}
