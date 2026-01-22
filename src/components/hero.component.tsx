import { Button, Divider, Heading, Link, Text, View } from '@fold-dev/core'
import * as Token from '@fold-dev/design/tokens'
import { GraphicLeft, GraphicRight } from './graphic.component'
import { useEffect, useRef } from 'react'

export const Starfield = (props) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const starsRef = useRef<any[]>([])
    const targetMouseXRef = useRef(window.innerWidth / 2) // target position
    const currentOffsetXRef = useRef(0) // smoothed offset value

    const speeds = [0.4, 0.1, 0.04]
    const baseStarCount = 50
    const layerCount = 3

    const resizeCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        createStars()
        targetMouseXRef.current = window.innerWidth / 2
        currentOffsetXRef.current = 0
    }

    const createStars = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const width = canvas.width
        const height = canvas.height
        const scalingFactor = Math.max(width, height) / 1000
        const newStars = []

        for (let i = 0; i < layerCount; i++) {
            const starCount = Math.floor(baseStarCount * scalingFactor * (i + 1))
            for (let j = 0; j < starCount; j++) {
                newStars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * (i + 0.5) + 0.1,
                    speed: speeds[i],
                    opacity: Math.random(),
                    baseOpacity: Math.random() * 0.75,
                    layer: i,
                })
            }
        }

        starsRef.current = newStars
    }

    const updateStars = (canvas: HTMLCanvasElement) => {
        starsRef.current.forEach((star) => {
            star.y -= star.speed
            star.opacity = star.baseOpacity + Math.sin(Date.now() * 0.001 * star.speed) * 0.2

            if (star.y < 0) {
                star.y = canvas.height
                star.x = Math.random() * canvas.width
            }
        })
    }

    // Linear interpolation helper
    const lerp = (start: number, end: number, amt: number) => {
        return start + (end - start) * amt
    }

    const drawStars = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const gradient = ctx.createRadialGradient(
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 8,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width
        )

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Smoothly interpolate current offset towards target mouse position offset
        const centerX = canvas.width / 2
        currentOffsetXRef.current = lerp(
            currentOffsetXRef.current,
            (targetMouseXRef.current - centerX) * 0.001, // sensitivity multiplier
            0.1 // smoothing factor (0.1 = slower, 1 = instant)
        )

        starsRef.current.forEach((star) => {
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
            ctx.fillRect(star.x + currentOffsetXRef.current * (star.layer + 1), star.y, star.size, star.size)
        })
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        resizeCanvas()

        const handleResize = () => resizeCanvas()
        window.addEventListener('resize', handleResize)

        const handleMouseMove = (e: MouseEvent) => {
            targetMouseXRef.current = e.clientX
        }
        window.addEventListener('mousemove', handleMouseMove)

        const animate = () => {
            if (!canvas || !ctx) return
            updateStars(canvas)
            drawStars(ctx, canvas)
            requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'block',
                zIndex: 0,
            }}
        />
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
            className="hero-background gradient">
            <div
                className="grid-squares"
                style={{ zIndex: 0 }}
            />

            <Starfield />

            <div className="shooting-stars">
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
                    flex={1}
                    gap={40}
                    width="80%"
                    m="0 auto"
                    p="5rem 0 0 0"
                    position="relative">
                    <Text
                        textAlign="center"
                        size="sm"
                        fontWeight="var(--f-font-weight-bold)"
                        style={{ textTransform: 'uppercase', opacity: 0.5 }}
                        letterSpacing={5}
                        colorToken="accent">
                        Introducing
                    </Text>

                    <Heading
                        textAlign="center"
                        colorToken="white"
                        fontWeight="var(--f-font-weight-bold)"
                        fontSize="6rem"
                        lineHeight={1.1}
                        p="0 3rem"
                        className="hero__heading">
                        The UI component library for product teams.
                    </Heading>

                    <Heading
                        as="h4"
                        textAlign="center"
                        colorToken="base-300"
                        fontWeight={400}
                        width="90%">
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
                            colorToken="base-50">
                            Documentation ↗
                        </Link>
                    </View>

                    <Text
                        size="sm"
                        colorToken="accent">
                        <Link
                            style={{ '--f-underline-size': '2px' }}
                            size="sm"
                            target="_blank"
                            textDecoration="none"
                            className="f-underline"
                            color="currentColor"
                            href="https://twitter.com/fold_dev">
                            Follow us on social media
                        </Link> & get notified of any updates.
                    </Text>
                </View>
            </View>
            <Divider />
        </View>
    )
}
