import { AppContext, Button, Divider, Heading, Link, Logo, Pill, Text, View } from '@fold-ui/core'
import * as Token from '@fold-ui/design/tokens'
import { GraphicLeft, GraphicRight } from './graphic.component'
import { useContext, useRef, useEffect, useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import LogoViewer from './logo-viewer.component';
import { PatternComponent } from './pattern.component';

const ThreeComponent = dynamic(() => import('./three.component').then((module) => module.ThreeComponent), { ssr: false })

export const HeroSpace = () => {
    const { app: { theme } } = useContext(AppContext)
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const media = window.matchMedia('(min-width: 761px)')
        const update = () => setIsDesktop(media.matches)
        update()
        media.addEventListener('change', update)
        return () => media.removeEventListener('change', update)
    }, [])

    if (!isDesktop || (theme !== 'dark' && theme !== 'light')) return null

    return (
        <div className="revamp-hero__space" aria-hidden="true">
            <ThreeComponent alignRight variant={theme === 'dark' ? 'planet' : 'sun'} />
            {/* {theme === 'dark' && <ShootingStars />} */}
             <ShootingStars />
        </div>
    )
}

export const Aurora = () => {
    return (
        <div className="aurora-container hide-on-mobile">
            <div
                className="aurora"
                aria-hidden="true">
                <div className="aurora__stage">
                    <div className="beam beam--violet"></div>
                    <div className="beam beam--far"></div>
                    <div className="beam beam--cyan-far"></div>
                    <div className="beam beam--cyan"></div>
                    <div className="beam beam--hero"></div>
                    <div className="beam beam--core"></div>
                </div>
                <div className="aurora__bloom"></div>
                {/* <div className="aurora__grain"></div> */}
                {/* <div className="aurora__vignette"></div> */}
            </div>

            <div
                className="gradient-for-hero-at-bottom"
                style={{
                    position: 'absolute',
                    pointerEvents: 'none',
                    zIndex: 10,
                    height: 500,
                    width: '100%',
                    left: 0,
                    bottom: 0,
                    background: 'linear-gradient(to top, #0E0F15 0%, #0e0f1500 100%)',
                }}
            />
        </div>
    )
}

export const ShootingStars = () => {
    return (
        <div className="shooting-stars" aria-hidden="true">
            <span className="star" />
            <span className="star" />
            <span className="star" />
            <span className="star" />
            <span className="star" />
            <span className="star" />
            <span className="star" />
            <span className="star" />
            <span className="star" />
            <span className="star" />
        </div>
    )
}

export const HeroComponent = () => {
    return (
        <View
            width="100%"
            p="111px 0 0 0"
            m="-140px 0 0 0"
            position="relative"
            style={{  overflow: 'hidden' }}
            className="hero-background">

            <ShootingStars />
            <ThreeComponent />
            {/* <LogoViewer /> */}
            {/* <Aurora /> */}
            {/* <PatternComponent />  */}

            <View
                column
                id="home"
                gap={70}
                flex={1}
                width="100%"
                p="2rem 0 550px 0"
                zIndex={10}
                justifyContent="stretch"
                className="hero f-pointer-events-none">
                <View
                    alignItems="flex-start"
                    column
                    flex={1}
                    gap={40}
                    width="85%"
                    m="0 auto"
                    p="6rem 1rem 0 0rem"
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
                            color="#532FEC"
                            size="sm">
                            v0.26.0
                        </Pill>
                    </View>

                    <Heading
                        textAlign="left"
                        colorToken="white"
                        fontWeight={300}
                        fontSize="7.5rem"
                        lineHeight={1}
                        letterSpacing={-3}
                        width="50%"
                        className="hero__heading full-width-mobile">
                        Zero gravity UI components.
                    </Heading>

                    <Heading
                        textAlign="left"
                        as="h4"
                        colorToken="base-300"
                        className="full-width-mobile"
                        fontWeight={400}
                        width="60%">
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
                            p="0 2rem"
                            colorToken="accent-100"
                            href="#core"
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
                        colorToken="accent-500">
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
