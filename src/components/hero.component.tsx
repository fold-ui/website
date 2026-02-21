import { Button, Divider, Heading, Link, Logo, LogoSolid, Pill, Text, View } from '@fold-ui/core'
import * as Token from '@fold-ui/design/tokens'
import { GraphicLeft, GraphicRight } from './graphic.component'
import { useRef, useEffect, useCallback } from 'react'
import LogoViewer from './logo-viewer.component';
import { ThreeComponent } from './three.component';
import { PatternComponent } from './pattern.component';

export const HeroComponent = () => {
    return (
        <View
            width="100%"
            p="111px 0 0 0"
            m="-140px 0 0 0"
            position="relative"
            style={{  overflow: 'hidden' }}
            className="hero-background">

            {/* <LogoViewer /> */}
            {/* <ThreeComponent /> */}
            <PatternComponent /> 

            <View
                column
                id="home"
                gap={70}
                flex={1}
                width="100%"
                p="2rem 0 550px 0"
                justifyContent="stretch"
                className="hero f-pointer-events-none">
                <View
                    column
                    flex={1}
                    gap={40}
                    width="85%"
                    m="0 auto"
                    p="5rem 1rem 0 0rem"
                    position="relative">
                    <View 
                        row
                        gap="1rem">
                        <Logo color="var(--f-color-base-100)" />
                        <Text
                            size="xl"
                            letterSpacing={-1}
                            colorToken="base-100">
                            FoldUI
                        </Text>
                        <Pill 
                            subtle
                            size="sm"
                            color="#3263f5">
                            v0.22.0
                        </Pill>
                    </View>

                    <Heading
                        textAlign="center"
                        colorToken="white"
                        fontWeight="var(--f-font-weight-light)"
                        fontSize="8rem"
                        lineHeight={1}
                        letterSpacing={-5}
                        width="100%"
                        className="hero__heading full-width-mobile">
                        Zero gravity UI components.
                    </Heading>

                    <Heading
                        textAlign="center"
                        as="h4"
                        colorToken="base-300"
                        className="full-width-mobile"
                        fontWeight={400}
                        width="80%">
                        Powerful, fully customizable React components for scaling your project to the next level. 
                        Supercharge your dev workflow by using Fold's zero-dependency UI components.
                    </Heading>

                    <View
                        row
                        gap={20}
                        colorToken="white"
                        style={{ pointerEvents: 'all' }}>
                        <Button
                            as="a"
                            border="none"
                            bgToken="accent-600"
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
                        style={{ pointerEvents: 'all' }}
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
