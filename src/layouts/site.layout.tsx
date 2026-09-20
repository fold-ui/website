import {
    Affix,
    Button,
    Cookie,
    Flexer,
    AppProvider,
    AppContext,
    Header,
    Icon,
    Li,
    Link,
    List,
    Logo,
    Navigation,
    NavigationItem,
    SkipNavMain,
    Text,
    View,
    useCacheValue,
    useVisibility,
    Heading,
    IconLib,
    Grid,
    DarkModeToggle,
    Badge
} from '@fold-ui/core'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { PiSparkle } from 'react-icons/pi'
import { SocialIcon } from 'react-social-icons'

const work = [
    {
        eyebrow: 'Open source. Yours to build on.',
        title: 'Core',
        body: 'Start with the buttons, forms, menus and layouts your product needs. Fold\'s MIT-licensed React components are free to use, easy to theme and yours to build on.',
        link: 'Explore the components',
        image: '/fold-studio/lane-workspace.jpg',
        alt: 'Lane workspace showing a project plan and structured workflow',
    },
    {
        eyebrow: 'Make complex data useful',
        title: 'Data Grid',
        body: 'Give complex data a useful place to live. Build editable tables with resizable columns, row selection and custom cells that fit the way your users work.',
        link: 'Explore Data Grid',
        image: '/fold-studio/lane-economics.jpg',
        alt: 'Lane project economics interface with budgets and delivery data',
    },
    {
        eyebrow: 'Give every plan its place',
        title: 'Calendar',
        body: 'Put schedules, events and availability in context. Build day, week and month views that make time easier to plan, navigate and work with.',
        link: 'Explore Calendar',
        image: '/fold-studio/product-system.png',
        alt: 'A product interface built from a reusable component system',
    },
    {
        eyebrow: 'Keep work moving',
        title: 'Kanban',
        body: 'Turn work into a shared view of what\'s next. Organize cards into columns, move tasks between stages and shape each board around your team\'s process.',
        link: 'Explore Kanban',
        image: '/fold-studio/product-system.png',
        alt: 'A product interface built from a reusable component system',
    },
    {
        eyebrow: 'Bring the details together',
        title: 'Todo',
        body: 'Keep the details close to the work. Group tasks, track progress and bring subtasks, due dates and assignees into a focused planning interface.',
        link: 'Explore Todo',
        image: '/fold-studio/product-system.png',
        alt: 'A product interface built from a reusable component system',
    },
]

const capabilities = [
    'React components with no extra runtime dependencies',
    'TypeScript APIs for a smoother development workflow',
    'Design tokens that adapt Fold to your brand',
    'Light and dark themes built into the system',
    'Composable layouts for everyday and complex interfaces',
    'Open source, with room to make it your own',
]

const inclusions = [
    'Getting started with Fold',
    'Choosing the right components',
    'TypeScript and API guidance',
    'Component integration support',
    'Theming and design tokens',
    'Layout and responsive behaviour',
    'Accessibility reviews',
    'Data Grid configuration',
    'Calendar and scheduling setup',
    'Kanban and task workflows',
    'Custom component patterns',
    'Debugging and troubleshooting',
    'Performance reviews',
    'Upgrade and migration guidance',
    'Code reviews with your team',
    'Scheduled working sessions',
    'Planning your next Fold feature',
]

const offers = [
    {
        name: 'Developer',
        timing: 'Email guidance',
        price: '$99',
        qualifier: '/ month',
    },
    {
        name: 'Team',
        timing: 'Working sessions',
        price: '$399',
        qualifier: '/ month',
    },
    {
        name: 'Partner',
        timing: 'Ongoing collaboration',
        price: '$999',
        qualifier: '/ month',
    },
]

const SiteThemeToggle = () => {
    const { app: { theme } } = useContext(AppContext)

    return (
        <DarkModeToggle
            aria-label="Dark mode"
            aria-checked={theme === 'dark'}
        />
    )
}

export default function SiteLayout(props: any) {
    const { children } = props
    const router = useRouter()
    const [showChild, setShowChild] = useState(false)
    const { visible, hide, show } = useVisibility(false)
    const { isCached, getSafeCache, setCache } = useCacheValue('cookies')
    const [currentTime, setCurrentTime] = useState('')
    const [isOutsideWorkHours, setIsOutsideWorkHours] = useState(false)
    const currentYear = new Date().getFullYear()

    const denied = () => {
        setCache('no')
        hide()
    }

    const accepted = () => {
        setCache('yes')
        hide()
    }

    useEffect(() => {
        if (showChild) {
            if (getSafeCache().trim() == 'no') {
                document.querySelectorAll('[data-google="yes"]').forEach((el) => el.remove())
                hide()
            } else if (getSafeCache().trim() == 'yes') {
                hide()
            } else {
                show()
            }
        }
    }, [showChild, isCached])

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const saTime = new Intl.DateTimeFormat('en-ZA', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZone: 'Africa/Johannesburg',
            }).format(now)

            const saHour = parseInt(
                new Intl.DateTimeFormat('en-ZA', {
                    hour: 'numeric',
                    hour12: false,
                    timeZone: 'Africa/Johannesburg',
                }).format(now)
            )

            // Outside work hours: 5pm (17) to 8am (before 8)
            setIsOutsideWorkHours(saHour >= 17 || saHour < 8)
            setCurrentTime(saTime)
        }

        updateTime()
        const interval = setInterval(updateTime, 60 * 1000) // update every minute
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        setShowChild(true)
    }, [])

    if (!showChild) return null

    return (
        <>
            <AppProvider license="fake-license-code">
                <style id="custom-styles" />

                <SkipNavMain />

                <Cookie
                    style={{
                        border: 'none',
                        background: 'var(--f-color-background)',
                    }}
                    onDismiss={() => null}
                    isVisible={visible}
                    buttons={[
                        { label: 'Deny', action: denied, variant: 'accent' },
                        { label: 'Accept', action: accepted, variant: 'accent' },
                    ]}
                    title="🍪 Cookie Policy"
                    description={
                        <Text>
                            We use essential cookies to make our site work. With your consent, we may also use
                            non-essential cookies to improve user experience and analyze website traffic.
                        </Text>
                    }
                />

                {/* 
                <View
                    row
                    p="0.75rem 1rem"
                    gap={10}
                    zIndex={10000}
                    width="100%"
                    position="relative"
                    //bg="linear-gradient(8deg, var(--f-color-violet-600), var(--f-color-indigo-600))"
                    colorToken="accent"
                    style={{ borderBottom: '1px solid var(--f-color-slate-800)' }}
                    >
                    <Text
                        textAlign="center"
                        color="inherit">
                            New <strong>Kanban</strong>, <strong>Todo</strong> & <strong>Calendar</strong> components! Check out the <a href="/docs" style={{ color: 'currentColor' }}>docs</a> for more information.
                    </Text>
                    <Icon icon={PiSparkle} style={{ transform: 'rotate(45deg)', color: 'currentColor' }} size="lg" />
                </View> 
                */}

                {/* 
                <Affix zIndex={100}>
                    {(stuck) => true  ? null : (
                        <View 
                            className="navigation"
                            position="sticky"
                            height={100}
                            zIndex={10}
                            style={{ 
                                top: 0,
                            }}>
                            <Header
                                height={100}
                                position="relative"
                                className="page-nav"
                                border="none"
                                style={{
                                    background: 'rgb(from var(--f-color-nav-translucent) r g b / 0.9)',
                                    backdropFilter:'blur(10px)',
                                    transition: 'background 0.1s',
                                }}>
                                <View
                                    row
                                    gap="1rem"
                                    width="100%"
                                    p="0 4rem">
                                    <Link href="/">
                                        <Logo color="var(--f-color-accent-50)" />
                                    </Link>
                                    <Flexer />
                                    <Navigation
                                        display="none"
                                        bg="transparent"
                                        variant="navbar">
                                        <NavigationItem href="/#home">Home</NavigationItem>
                                        <NavigationItem href="/#core">Core</NavigationItem>
                                        <NavigationItem href="/#pro">Pro</NavigationItem>
                                        <NavigationItem href="/#support">Support</NavigationItem>
                                    </Navigation>
                                    <Button
                                        href="/docs"
                                        as="a"
                                        target="_blank"
                                        border="none"
                                        style={{
                                            '--f-button-color': 'var(--f-color-accent-50)',
                                            '--f-button-color-hover': 'var(--f-color-accent-50)',
                                            '--f-button-background-color': 'transparent',
                                            '--f-button-background-color-hover': 'rgb(from var(--f-color-nav-translucent) r g b / 0.33)',
                                        }}>
                                        Documentation
                                    </Button>
                                    <Button
                                        target="_blank"
                                        href="https://github.com/fold-ui/fold"
                                        as="a"
                                        border="none"
                                        style={{
                                            '--f-button-color': 'var(--f-color-accent-50)',
                                            '--f-button-color-hover': 'var(--f-color-accent-50)',
                                            '--f-button-background-color': 'transparent',
                                            '--f-button-background-color-hover': 'rgb(from var(--f-color-nav-translucent) r g b / 0.33)',
                                        }}>
                                        Download
                                    </Button>
                                    <SocialIcon
                                        url="https://github.com/fold-ui"
                                        target="_blank"
                                        style={{ width: 35, height: 35 }}
                                        fgColor="var(--f-color-base-100)"
                                        bgColor="transparent"
                                    />
                                </View>
                            </Header>
                        </View>
                    )}
                </Affix>
                */}
                <Header
                    className="site-header"
                    bg="transparent"
                    m="0 0 1rem 0"
                    p="2rem"
                    gap="0.5rem"
                    border="none"
                    radius="var(--f-radius)">
                    <Logo
                        size="md"
                        color="var(--f-color-text)"
                    />
                    {/* <View 
                        width="3.5rem"
                        height="2rem"
                        border="0.25rem solid var(--f-color-text-weakest)"
                        radius={100}
                    /> */}

                    <Flexer />

                    <Navigation 
                        variant="navbar" 
                        className="site-header__products" 
                        m="0 0 0 1rem" 
                        style={{ 
                            '--f-focus': 'none',
                            '--f-toggle-background-color': 'var(--f-color-surface-strongest)',
                        }}>
                        <NavigationItem><SiteThemeToggle /></NavigationItem>
                        {work.map(({ title }, index) => (
                            <NavigationItem key={index} href={`/#${title.toLowerCase().replace(/ /g, '-')}`}>
                                {title}
                            </NavigationItem>
                        ))}
                    </Navigation>

                    <Navigation variant="navbar" className="site-header__links">
                        <NavigationItem href="/docs" suffix={<Badge variant="accent" outline size="xs">v0.26.0</Badge>}>Documentation</NavigationItem>
                        <NavigationItem href="mailto:support@fold.dev">Support</NavigationItem>
                        
                        <NavigationItem 
                            m="0 0 0 0.5rem"
                            style={{ '--f-navbar-item-padding': '0rem' }}>
                            <Button
                                onClick={() => router.push('/docs')}
                                variant="accent"
                                suffix={
                                    <IconLib
                                        icon="arrow-right"
                                        size="sm"
                                    />
                                }>
                                Get started
                            </Button>
                        </NavigationItem>
                    </Navigation>
                </Header>

                {children}

                <View
                    className="site-footer"
                    bgToken="base-900"
                    m="5rem 0 0 0">
                    <View>
                        <View
                            className="site-footer__cta"
                            p="5rem"
                            row
                            justifyContent="space-between">
                            <Heading
                                colorToken="base-200"
                                width="75%">
                                Build with Fold. Get help when the edge cases arrive. &nbsp;
                                <Text
                                    as="span"
                                    fontSize="inherit"
                                    colorToken="base-400">
                                    Bring us the implementation problem and work through it with people who know the code.
                                </Text>
                            </Heading>

                            <Button
                                as="a"
                                href="mailto:support@fold.dev?subject=Fold%20support%20subscription"
                                variant="accent"
                                size="lg"
                                suffix={
                                    <IconLib
                                        icon="arrow-right"
                                        size="sm"
                                    />
                                }>
                                Get implementation help
                            </Button>
                        </View>

                        <View
                            className="site-footer__content"
                            column
                            alignItems="stretch"
                            p="6.5rem 5rem 3.5rem">
                            <Grid
                                className="site-footer__links"
                                columns={4}
                                gap="5rem"
                                width="100%"
                                p="0 0 5rem 0">
                                <View
                                    column
                                    alignItems="flex-start"
                                    justifyContent="flex-start"
                                    gap="1.5rem">
                                    <Text
                                        as="span"
                                        size="sm"
                                        colorToken="base-500">
                                        Fold
                                    </Text>
                                    <Text
                                        as="a"
                                        href="/docs/introduction"
                                        colorToken="base-300"
                                        fontWeight="var(--f-font-weight-normal)"
                                        textDecoration="none">
                                        Core
                                    </Text>
                                    <Text
                                        as="a"
                                        href="/docs"
                                        colorToken="base-300"
                                        fontWeight="var(--f-font-weight-normal)"
                                        textDecoration="none">
                                        Documentation
                                    </Text>
                                    <Text
                                        as="a"
                                        href="/docs/design-system"
                                        colorToken="base-300"
                                        fontWeight="var(--f-font-weight-normal)"
                                        textDecoration="none">
                                        Design system
                                    </Text>
                                    <Text
                                        as="a"
                                        href="/#offers"
                                        colorToken="base-300"
                                        fontWeight="var(--f-font-weight-normal)"
                                        textDecoration="none">
                                        Support plans
                                    </Text>
                                </View>

                                <View
                                    column
                                    alignItems="flex-start"
                                    justifyContent="flex-start"
                                    gap="1.5rem">
                                    <Text
                                        as="span"
                                        size="sm"
                                        colorToken="base-500">
                                        Resources
                                    </Text>
                                    <Text
                                        as="a"
                                        href="/docs/getting-started"
                                        colorToken="base-300"
                                        fontWeight="var(--f-font-weight-normal)"
                                        textDecoration="none">
                                        Getting started
                                    </Text>
                                    <Text
                                        as="a"
                                        href="/docs/theming"
                                        colorToken="base-300"
                                        fontWeight="var(--f-font-weight-normal)"
                                        textDecoration="none">
                                        Theming
                                    </Text>
                                    <Text
                                        as="a"
                                        href="https://github.com/fold-ui/fold"
                                        colorToken="base-300"
                                        fontWeight="var(--f-font-weight-normal)"
                                        textDecoration="none">
                                        GitHub
                                    </Text>
                                </View>

                                <View
                                    column
                                    alignItems="flex-start"
                                    justifyContent="flex-start"
                                    gap="1.5rem">
                                    <Text
                                        as="span"
                                        size="sm"
                                        colorToken="base-500">
                                        Community
                                    </Text>
                                    <Text
                                        as="a"
                                        href="https://github.com/fold-ui/fold/discussions"
                                        colorToken="base-300"
                                        fontWeight="var(--f-font-weight-normal)"
                                        textDecoration="none">
                                        Discussions
                                    </Text>
                                    <Text
                                        as="a"
                                        href="https://github.com/fold-ui/fold"
                                        colorToken="base-300"
                                        fontWeight="var(--f-font-weight-normal)"
                                        textDecoration="none">
                                        Contribute
                                    </Text>
                                </View>

                                <View
                                    column
                                    alignItems="flex-start"
                                    justifyContent="flex-start"
                                    gap="1.5rem">
                                    <Text
                                        as="span"
                                        size="sm"
                                        colorToken="base-500">
                                        Support
                                    </Text>
                                    <Text
                                        as="a"
                                        href="mailto:support@fold.dev?subject=Fold%20support%20subscription"
                                        colorToken="base-300"
                                        fontWeight="var(--f-font-weight-normal)"
                                        textDecoration="none">
                                        Discuss a plan
                                    </Text>
                                    <Text
                                        as="a"
                                        href="mailto:support@fold.dev"
                                        colorToken="base-300"
                                        fontWeight="var(--f-font-weight-normal)"
                                        textDecoration="none">
                                        support@fold.dev
                                    </Text>
                                </View>
                            </Grid>

                            <View
                                width="100%"
                                height="1px"
                                bgToken="base-750"
                                m="1rem 0 2rem 0"
                            />

                            <Logo
                                size="sm"
                                color="var(--f-color-base-500)" 
                            />

                            <View
                                className="site-footer__meta"
                                row
                                gap="1rem"
                                justifyContent="flex-start"
                                width="100%"
                                m="2rem 0 0 0">
                                <Text
                                    as="span"
                                    size="sm"
                                    colorToken="base-500">
                                    © 2026 Fold. All rights reserved.
                                </Text>
                                <Flexer />

                                <View
                                    row
                                    gap="1rem">
                                    <View
                                        width={10}
                                        height={10}
                                        bgToken={isOutsideWorkHours ? 'rose-500' : 'teal-500'}
                                        radius={100}></View>
                                    <Text size="sm" colorToken="base-500">{currentTime}</Text>
                                </View>
                                <Text
                                    as="span"
                                    size="sm"
                                    colorToken="base-500">
                                    Open-source React UI · Built for real product work
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* 
                <View
                    row
                    p="3rem 100px 100px 100px"
                    alignItems="flex-start"
                    className="footer">
                    <View
                        flex={1}
                        column
                        gap={20}
                        className="footer_block">
                        <Logo color="var(--f-color-accent)" />
                        <View 
                            row
                            gap="1rem">
                                <Text
                                    as="a"
                                    href="https://github.com/fold-ui/fold"
                                    target="_blank"
                                    fontWeight={400}
                                    textDecoration="none"
                                    colorToken="text-weaker">
                                    GitHub
                                </Text>
                                <Text
                                    as="a"
                                    href="/docs"
                                    target="_blank"
                                    fontWeight={400}
                                    textDecoration="none"
                                    colorToken="text-weaker">
                                    Documentation
                                </Text>
                                <Text
                                    as="a"
                                    target="_blank"
                                    href="/privacy-policy"
                                    fontWeight={400}
                                    textDecoration="none"
                                    colorToken="text-weaker">
                                    Privacy Policy
                                </Text>
                                <Text
                                    as="a"
                                    target="_blank"
                                    href="/terms-of-use"
                                    fontWeight={400}
                                    textDecoration="none"
                                    colorToken="text-weaker">
                                    Terms of Use
                                </Text>
                        </View>
                        <Text colorToken="text-weakest">Fold &copy; 2026</Text>
                    </View>
                </View>
                */}
            </AppProvider>
        </>
    )
}
