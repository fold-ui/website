import { Button, Heading, Link, Pill, Text, View } from '@fold-ui/core'
import * as Token from '@fold-ui/design/tokens'
import { GraphicLeft } from './graphic.component'

export const GoComponent = () => {
    return (
        <View 
            row 
            m="5rem 0"
            width="100%">
            <View
                row
                gap="2rem"
                width="85%"
                radius="var(--f-radius)"
                bgToken="accent-500"
                position="relative"
                style={{ overflow: 'hidden' }}
                alignItems="flex-start">
                <GraphicLeft
                    color={Token.ColorAccent200}
                    style={{ position: 'absolute', bottom: -100, left: -200, opacity: 0.1 }}
                    width={1107 / 2}
                    height={559 / 2}
                />

                <View
                    column
                    flex={1}
                    gap={30}
                    alignItems="flex-start"
                    className="go">
                    {/* 
                    <View
                        bgToken="accent-400"
                        radius={50}
                        p="0.25rem 1rem">
                        <Text colorToken="accent-100">Coming Soon ✨</Text>
                    </View> 
                    */}
                    <Text
                        style={{ textTransform: 'uppercase' }}
                        letterSpacing={5}
                        colorToken="accent-300"
                        id="features">
                        Need help scaling your next big idea?
                    </Text>
                    <Heading
                        colorToken="accent-50"
                        fontWeight={400}>
                        Every business is unique, with its own set of challenges, goals, and aspirations. 
                        We offer tailored design and development services to businesses in need of that expert touch working with Fold Core, and Fold Pro.
                    </Heading>
                    <Link
                        href="mailto:support@fold.dev"
                        textDecoration="none"
                        className="f-underline"
                        m="0 -1rem 0 0"
                        colorToken="white">
                        Contact us for more information ↗
                    </Link>
                </View>
            </View>
        </View> 
    )
}
