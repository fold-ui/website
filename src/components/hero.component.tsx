import { Button, Divider, Heading, Link, LogoSolid, Text, View } from '@fold-ui/core'
import * as Token from '@fold-ui/design/tokens'
import { GraphicLeft, GraphicRight } from './graphic.component'
import { useRef, useEffect, useCallback } from 'react'
import LogoViewer from './logo-viewer.component';

export const HeroComponent = () => {
    return (
        <View
            width="100%"
            p="111px 0 0 0"
            m="-140px 0 0 0"
            position="relative"
            style={{  overflow: 'hidden' }}
            className="hero-background gradient">

            <LogoViewer />

            <View
                column
                id="home"
                gap={70}
                flex={1}
                width="100%"
                p="2rem 0 550px 0"
                justifyContent="stretch"
                className="hero">
                <View
                    column
                    alignItems="flex-start"
                    flex={1}
                    gap={40}
                    width="85%"
                    m="0 auto"
                    p="5rem 1rem 0 0rem"
                    position="relative">
                    <LogoSolid 
                        color="var(--f-color-accent)" 
                        customSize={50}
                    />

                    <Heading
                        colorToken="white"
                        fontWeight="var(--f-font-weight-semibold)"
                        fontSize="5.5rem"
                        lineHeight={1}
                        letterSpacing={-2}
                        width="60%"
                        className="hero__heading">
                        Zero dependency React components for product teams.
                    </Heading>

                    <Heading
                        as="h4"
                        colorToken="base-500"
                        fontWeight={400}
                        width="60%">
                        Powerful, fully customizable React components for scaling your project to the next level. 
                        Supercharge your dev workflow by using Fold's zero-dependency UI components.
                    </Heading>

                    <View
                        row
                        gap={20}
                        colorToken="white">
                        <Button
                            as="a"
                            variant="accent"
                            radius="var(--f-radius-full)"
                            p="0 2rem"
                            colorToken="accent-100"
                            href="#core"
                            size="lg"
                            style={{
                                '--f-button-color': 'var(--f-color-base-50)',
                                '--f-button-color-hover': 'var(--f-color-base-900)',
                                '--f-button-background-color': 'transparent',
                                '--f-button-background-color-hover': 'var(--f-color-base-50)',
                            }}>
                            Read More
                        </Button>
                        <Link
                            href="/docs"
                            target="_blank"
                            textDecoration="none"
                            className="f-underline"
                            m="0 -1rem 0 0"
                            colorToken="accent">
                            Documentation ↗
                        </Link>
                    </View>

                    <Text
                        size="sm"
                        colorToken="base-600">
                        <Link
                            style={{ '--f-underline-size': '2px' }}
                            size="sm"
                            target="_blank"
                            textDecoration="none"
                            className="f-underline"
                            color="currentColor"
                            href="https://github.com/fold-ui">
                            Join us on GitHub
                        </Link> & get notified of any updates.
                    </Text>
                </View>
            </View>
            <Divider />
        </View>
    )
}
