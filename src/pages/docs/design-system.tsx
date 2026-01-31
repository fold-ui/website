import DocsLayout from '@/layouts/docs.layout'
import {
    Text,
    Progress,
    Heading,
    View,
    Card,
    Icon,
    Badge,
    List,
    Li,
    Palette,
    Notification,
    NotificationIcon,
    IconLib,
    NotificationContent,
    Pill,
    Grid,
    Breadcrumb,
    BreadcrumbItem,
} from '@fold-ui/core'
import {
    CircleStackIcon,
    LanguageIcon,
    LifebuoyIcon,
    PaintBrushIcon,
    Square3Stack3DIcon,
    Squares2X2Icon,
    StopIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import * as Token from '@fold-ui/design/tokens'
import { useRouter } from 'next/navigation'
import {
    PiBracketsSquareDuotone,
    PiFrameCorners,
    PiFrameCornersDuotone,
    PiPaintBucket,
    PiPaintBucketDuotone,
    PiSelectionAll,
    PiSelectionAllDuotone,
    PiStackDuotone,
    PiStop,
    PiStopDuotone,
    PiSubtractSquare,
    PiSubtractSquareDuotone,
    PiTextAa,
    PiTextAaDuotone,
} from 'react-icons/pi'

export const useTokens = (): any => {
    const [tokens, setTokens] = useState({ dark: [], light: [], system: [] })
    useEffect(() => {
        let system: any = []
        let light: any = []
        let dark: any = []

        Array.from(document.styleSheets)
            .filter((sheet) => sheet.href === null || sheet.href.startsWith(window.location.origin))
            .map((stylesheet: any) => stylesheet.cssRules)
            .map((ruleList: any) => {
                Array.from(ruleList).map((rule: any) => {
                    if (rule.selectorText == '[data-theme="light"]') {
                        rule.cssText
                            .replace('[data-theme="light"] {', '')
                            .trim()
                            .replace('}', '')
                            .split(';')
                            .filter((s) => !!s)
                            .map((style: string) => {
                                const rule = style.trim().split(': ')
                                if (rule[0]) light.push(rule)
                            })
                    }

                    if (rule.selectorText == '[data-theme="dark"]') {
                        rule.cssText
                            .replace('[data-theme="dark"] {', '')
                            .trim()
                            .replace('}', '')
                            .split(';')
                            .filter((s) => !!s)
                            .map((style: string) => {
                                const rule = style.trim().split(': ')
                                if (rule[0]) dark.push(rule)
                            })
                    }

                    if (rule.selectorText == ':root') {
                        rule.cssText
                            .replace(':root {', '')
                            .trim()
                            .replace('}', '')
                            .split(';')
                            .filter((s) => !!s)
                            .map((style: string) => {
                                const rule = style.trim().split(': ')
                                if (rule[0]) system.push(rule)
                            })
                    }
                })
            })

        setTokens({ dark, light, system })
    }, [])

    return tokens
}

export const convertTokenToTitle = (token: string) => {
    return token.split('-').slice(-1).join(' ')
}

export default function DesignSystem(props) {
    const { light, dark } = useTokens()
    const router = useRouter()

    return (
        <View
            p={30}
            className="docs-content">
            <Breadcrumb>
                <BreadcrumbItem>Documentation</BreadcrumbItem>
                <BreadcrumbItem>Design</BreadcrumbItem>
                <BreadcrumbItem active>Design System</BreadcrumbItem>
            </Breadcrumb>
            <Heading fontWeight="bold">Design System</Heading>
            <Heading as="h2">
                Welcome to the Fold Design System. This comprehensive guide outlines the principles, guidelines, and
                best practices that underpin the design and development of our React components. By following this
                design system, you'll ensure a consistent and visually pleasing user experience throughout your
                application.
            </Heading>
            <Text as="blockquote">
                Fold uses CSS variables to customize almost all aspects of the look & feel. Dark Mode is supported out
                of the box.
            </Text>
            <Heading as="h3">Introduction</Heading>
            <Text>
                Understanding the Fold Design System isn't necessary to begin using Fold in your project, but it can
                assist in tailoring your project to meet specific requirements and even in creating your own theme if
                necessary.
            </Text>
            <Text>
                The Fold Design System architecture consists of 3 layers: <i>System</i>, <i>Theme</i> & <i>Component</i>
                .
            </Text>
            <Notification variant="highlight">
                <NotificationIcon>
                    <IconLib icon="info" />
                </NotificationIcon>
                <NotificationContent>
                    <Heading
                        as="h5"
                        m="0 0 0.5rem 0"
                        fontWeight="bold">
                        What are Design Tokens?
                    </Heading>
                    <Text lineHeight={1.5}>
                        Design tokens are a way of abstracting and organizing design decisions in a systematic and
                        consistent manner. They are a set of variables or constants that store visual design attributes
                        such as colors, typography, spacing, and other styles. Design tokens help maintain design
                        consistency across different platforms, devices, and components in a scalable and maintainable
                        way.
                    </Text>
                </NotificationContent>
            </Notification>
            <Heading as="h3">1. System</Heading>
            <Text>
                The System layer consists of design tokens that form the base of the Design System. They are the
                building blocks on which everything else is built. Think of the font size used for this sentence - this
                font size is based on 1 of the available System font sizes. This System layer not only includes font
                sizes, but also colors, radii, shadows, margins, etc. They are the palette of the UI.
            </Text>
            <View
                row
                width="100%"
                justifyContent="stretch">
                {new Array(10).fill(null).map((_, i) => (
                    <View
                        flex={1}
                        bgToken={i == 0 ? `base-50` : `base-${i}00`}
                        width={30}
                        height={30}
                    />
                ))}
            </View>
            <Text
                size="sm"
                colorToken="text-weakest"
                m="0 0 1rem 0">
                Base color palette
            </Text>
            <View
                row
                width="100%"
                justifyContent="stretch">
                {new Array(10).fill(null).map((_, i) => (
                    <View
                        flex={1}
                        bgToken={i == 0 ? `accent-50` : `accent-${i}00`}
                        width={30}
                        height={30}
                    />
                ))}
            </View>
            <Text
                size="sm"
                colorToken="text-weakest"
                m={0}>
                Accent color palette
            </Text>
            <Heading as="h4">System Design Tokens</Heading>
            <Text>
                The Fold Design System has many tokens available to use. To find out more about these design tokens,
                click on the link in the navigation, or click on the most common ones below:
            </Text>
            <Grid
                columns={3}
                gap={10}>
                {[
                    { color: Token.ColorBlue400, icon: PiPaintBucket, title: 'Color', path: 'color' },
                    { color: Token.ColorViolet400, icon: PiTextAa, title: 'Typography', path: 'typography' },
                    { color: Token.ColorPurple400, icon: PiSelectionAll, title: 'Space', path: 'space' },
                    { color: Token.ColorPink400, icon: PiFrameCorners, title: 'Size', path: 'size' },
                    { color: Token.ColorRed400, icon: PiStop, title: 'Radius', path: 'radius' },
                    { color: Token.ColorOrange400, icon: PiSubtractSquare, title: 'Shadow', path: 'shadow' },
                ].map(({ color, icon, title, path }, index) => (
                    <Card
                        row
                        justifyContent="flex-start"
                        p={15}
                        key={index}
                        className="f-buttonize-outline docs-site__ds-card"
                        width="none"
                        onClick={() => router.push('/docs/tokens#' + path, { scroll: false })}>
                        <Pill
                            height={50}
                            color={color}
                            subtle
                            size="xl">
                            <Icon icon={icon} size="lg"/>
                        </Pill>
                        <Heading
                            as="h4"
                            p="0 0 0 0.5rem">
                            {title}
                        </Heading>
                    </Card>
                ))}
            </Grid>
            <Heading as="h3">2. Theme</Heading>
            <Text>The Theme layer is a superset of the System layer & mostly consists of color variations.</Text>
            <Text>
                This layer outlines color relationships that draw on tokens & values specified by the System layer. For
                example; this text color is specified as <code>--f-color-text</code>, where{' '}
                <span style={{ color: 'var(--f-color-accent)' }}>this text color</span> is specified as{' '}
                <code>--f-color-accent</code>. When you build a theme, it is this layer that you usually update.
            </Text>
            <Text as="blockquote">Fold ships with 2 default themes; light & dark.</Text>
            <Card
                p={50}
                width="100%"
                bgToken="white"
                m="0 0 0.5rem 0">
                <Heading
                    as="h4"
                    colorToken="base-800"
                    m="0 0 1rem 0">
                    Light Theme
                </Heading>
                {light
                    .filter((_, index) => index > 1)
                    .map((key, index) => (
                        <View
                            row
                            key={index}
                            gap={10}
                            m="3px 0">
                            <Text
                                as="code"
                                flex={2}
                                colorToken="base-800">
                                {key[0]}
                            </Text>
                            <Text
                                as="code"
                                colorToken="base-200">
                                {key[1]}
                            </Text>
                            <View 
                                radius="var(--f-radius)"
                                bg={key[1]}
                                width={20}
                                height={20}
                            />
                        </View>
                    ))}
            </Card>
            <Card
                p={50}
                width="100%"
                border={0}
                bgToken="base-800">
                <Heading
                    as="h4"
                    colorToken="base-100"
                    m="0 0 1rem 0">
                    Dark Theme
                </Heading>
                {dark
                    .filter((_, index) => index > 1)
                    .map((key, index) => (
                        <View
                            row
                            key={index}
                            gap={10}
                            m="3px 0">
                            <Text
                                as="code"
                                flex={2}
                                colorToken="base-200">
                                {key[0]}
                            </Text>
                            <Text
                                as="code"
                                colorToken="base-600">
                                {key[1]}
                            </Text>
                            <View 
                                radius="var(--f-radius)"
                                bg={key[1]}
                                width={20}
                                height={20}
                            />
                        </View>
                    ))}
            </Card>
            <Notification
                variant="highlight"
                m="1rem 0">
                <NotificationIcon>
                    <IconLib icon="info" />
                </NotificationIcon>
                <NotificationContent>
                    <Text>
                        Observe how every theme employs identical token names. When switching themes, only the token
                        values are modified, ensuring the preservation of the 3rd Component layer, which refers to Theme
                        values by name.
                    </Text>
                </NotificationContent>
            </Notification>
            <Heading as="h3">3. Component</Heading>
            <Text>
                The final layer in the stack is the Component layer. Here, specific color, radius, and spatial tokens
                are implemented in each component stylesheet. Each component token derives its value from the Theme
                layer mentioned above and is typically modified when making component-specific adjustments.
            </Text>
            <Text>For additional details, refer to the "CSS variables" tab on each component page.</Text>
            <Text as="blockquote">
                Please see our <Link href="/docs/theming">Theming</Link> guide to find out how to create your own theme.
            </Text>
            <Heading as="h3">Support</Heading>
            <Text>
                If you encounter any issues or have questions related to the design system, feel free to contact us or
                leave a comment on{' '}
                <Link
                    href="https://github.com/fold-ui/fold/discussions"
                    target="_blank">
                    GitHub
                </Link>
                . We are here to assist you in achieving the best design and user experience for your application.
            </Text>
        </View>
    )
}
