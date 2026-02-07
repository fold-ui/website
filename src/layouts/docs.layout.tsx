import { colors } from '@/components/core.component'
import { SearchComponent } from '@/components/search.component'
import {
    App,
    Button,
    Content,
    DarkModeToggle,
    Flexer,
    FoldProvider,
    Header,
    Heading,
    Icon,
    Li,
    Link,
    List,
    Logo,
    Main,
    Navigation,
    NavigationDivider,
    NavigationHeading,
    NavigationItem,
    NavigationSection,
    Option,
    Options,
    Palette,
    Pill,
    Popover,
    Range,
    Resizable,
    Sidebar,
    SkipNav,
    SkipNavMain,
    Stack,
    Text,
    View,
    useVisibility
} from '@fold-ui/core'
import * as Token from '@fold-ui/design/tokens'
import Head from 'next/head'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import {
    PiFaders,
    PiFingerprintSimple,
    PiFlag,
    PiGithubLogo,
    PiLifebuoy,
    PiLineSegment,
    PiLinkedinLogo,
    PiMarkerCircle,
    PiPackage,
    PiPersonArmsSpread,
    PiPinwheel,
    PiPlanet,
    PiQuestion,
    PiRocketLaunch,
    PiSignpost,
    PiTwitterLogo
} from 'react-icons/pi'
import { navigation, navigationPro } from '../navigation'
import { Bars3Icon } from '@heroicons/react/24/outline'

export const CircleIcon = ({
    children,
    background,
}) => {
    return (
        <div 
            style={{ 
                width: 20,
                height: 20,
                background,
            }}
            className="f-row">
            {children}
        </div>
    )
}

export const StorybookIcon = (props: any) => {
    return (
        <svg
            width={18}
            height={20}
            viewBox="-31.5 0 319 319"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="xMidYMid"
            fill="#000000">
            <g
                id="SVGRepo_bgCarrier"
                strokeWidth={0}
            />
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
                <defs>
                    <path
                        d="M9.87245893,293.324145 L0.0114611411,30.5732167 C-0.314208957,21.8955842 6.33948896,14.5413918 15.0063196,13.9997149 L238.494389,0.0317105427 C247.316188,-0.519651867 254.914637,6.18486163 255.466,15.0066607 C255.486773,15.339032 255.497167,15.6719708 255.497167,16.0049907 L255.497167,302.318596 C255.497167,311.157608 248.331732,318.323043 239.492719,318.323043 C239.253266,318.323043 239.013844,318.317669 238.774632,318.306926 L25.1475605,308.712253 C16.8276309,308.338578 10.1847994,301.646603 9.87245893,293.324145 L9.87245893,293.324145 Z"
                        id="path-1">
                    </path>
                </defs>
                <g>
                    <mask
                        id="mask-2"
                        fill="white">
                        <use xlinkHref="#path-1"> </use>
                    </mask>
                    <use
                        fill="#FF4785"
                        fillRule="nonzero"
                        xlinkHref="#path-1">
                    </use>
                    <path
                        d="M188.665358,39.126973 L190.191903,2.41148534 L220.883535,0 L222.205755,37.8634126 C222.251771,39.1811466 221.22084,40.2866846 219.903106,40.3327009 C219.338869,40.3524045 218.785907,40.1715096 218.342409,39.8221376 L206.506729,30.4984116 L192.493574,41.1282444 C191.443077,41.9251106 189.945493,41.7195021 189.148627,40.6690048 C188.813185,40.2267976 188.6423,39.6815326 188.665358,39.126973 Z M149.413703,119.980309 C149.413703,126.206975 191.355678,123.222696 196.986019,118.848893 C196.986019,76.4467826 174.234041,54.1651411 132.57133,54.1651411 C90.9086182,54.1651411 67.5656805,76.7934542 67.5656805,110.735941 C67.5656805,169.85244 147.345341,170.983856 147.345341,203.229219 C147.345341,212.280549 142.913138,217.654777 133.162291,217.654777 C120.456641,217.654777 115.433477,211.165914 116.024438,189.103298 C116.024438,184.317101 67.5656805,182.824962 66.0882793,189.103298 C62.3262146,242.56887 95.6363019,257.990394 133.753251,257.990394 C170.688279,257.990394 199.645341,238.303123 199.645341,202.663511 C199.645341,139.304202 118.683759,141.001326 118.683759,109.604526 C118.683759,96.8760922 128.139127,95.178968 133.753251,95.178968 C139.662855,95.178968 150.300143,96.2205679 149.413703,119.980309 Z"
                        fill="#FFFFFF"
                        fillRule="nonzero"
                        mask="url(#mask-2)">
                    </path>
                </g>
            </g>
        </svg>
    )
}

export default function DocsLayout(props: any) {
    const { children } = props
    const router = useRouter()
    const { visible, show, hide } = useVisibility(false)
    const [color, setColor] = useState(Token.ColorBlue400)
    const [value, setValue] = useState(3)
    const [option, setOption] = useState(2)
    const [toc, setToc] = useState([])
    const [showChild, setShowChild] = useState(false)
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const url = useMemo(() => {
        const parts = pathname.split('/')
        return parts[parts.length - 1]
    }, [pathname, searchParams])
    const noToc = useMemo(() => {
        switch (url) {
            case 'community':
                return true
            case 'faq':
                return true
            case 'releases':
                return true
            default:
                return false
        }
    }, [url])

    useEffect(() => {
        if (!showChild) return

        if (!noToc) {
            setTimeout(() => {
                const headings = document.querySelectorAll('.docs-content > h3, .docs-content > h4')
                const toc: any = []

                Array.from(headings).forEach((element: any) => {
                    const id = element.innerText.toLowerCase().split(' ').join('-')

                    element.id = id

                    toc.push({
                        href: '#' + id,
                        text: element.innerText,
                        type: element.tagName.toLowerCase(),
                    })
                })

                setToc(toc)
            }, 10)
        }
    }, [children, showChild, noToc])

    const setAccent = (color) => {
        document.getElementById('custom-styles').innerHTML = colors[color]
    }

    const setFont = (family) => {
        const d: any = document.querySelector(':root')

        d.style.setProperty('--f-font-heading', family)
        d.style.setProperty('--f-font-body', family)
    }

    useEffect(() => {
        setTimeout(() => {
            setFont('Inter, -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif')
        }, 10)
    }, [])

    useEffect(() => {
        switch (option) {
            case 0:
                return setFont(
                    'ui-sans-serif,-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif'
                )
            case 1:
                return setFont(
                    'Inter, -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif'
                )
            case 2:
                return setFont(
                    'Instrument Sans,  -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif'
                )
        }
    }, [option])

    useEffect(() => {
        if (!showChild) return

        const of = 3
        const percent = value / 10
        const radius = of * percent + 'rem'
        const d: any = document.querySelector(':root')

        d.style.setProperty('--f-radius', radius)
    }, [value])

    useEffect(() => {
        if (!showChild) return
        return

        switch (color) {
            case Token.ColorPurple400:
                return setAccent('purple')
            case Token.ColorPink400:
                return setAccent('neonpink')
            case Token.ColorRed400:
                return setAccent('red')
            case Token.ColorOrange400:
                return setAccent('orange')
            case Token.ColorYellow400:
                return setAccent('yellow')
            case Token.ColorGreen400:
                return setAccent('green')
            case Token.ColorTeal400:
                return setAccent('teal')
            case Token.ColorCyan400:
                return setAccent('cyan')
            case Token.ColorBlue400:
                return setAccent('electric')
        }
    }, [color])

    useEffect(() => {
        setShowChild(true)
    }, [])

    if (!showChild) return null

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta
                    httpEquiv="X-UA-Compatible"
                    content="IE=edge, IE=11, IE=10"
                />
                <meta
                    name="robots"
                    content="noindex,follow"
                />
                <meta
                    name="description"
                    content="Powerful, fully customizable React components for scaling your product to the next level. Supercharge your dev workflow by using our zero-dependency UI components."
                />
                <title>Fold Documentation</title>
            </Head>

            <style id="custom-styles" />

            <SkipNav>Skip To Content</SkipNav>

            <FoldProvider license="fake-license-code">
                {/* 
                <View
                    row
                    height="3rem"
                    gap={10}
                    width="100%"
                    colorToken="base-100"
                    bg="linear-gradient(177deg, var(--f-color-base-800), var(--f-color-base-700))">
                    <Text colorToken="base-100">
                        We've just launched! <Link colorToken="accent-300">Click here</Link> to let us know what you
                        think. 🚀
                    </Text>
                </View> 
                */}
                <App className="docs-site">
                    <Content
                        row
                        width="100%"
                        height="100%">
                        <Sidebar
                            left
                            width="fit-content"
                            height="100%"
                            className={open ? "docs-site__nav is-open" : "docs-site__nav"}>
                            <Resizable
                                column
                                justifyContent="stretch"
                                width={250}
                                max={400}
                                min={220}
                                height="100%"
                                handle={<></>}
                                style={{ '--f-resizable-color': 'transparent' }}>
                                <Header
                                    height="4.5rem"
                                    p="0 1.5rem"
                                    width="101%"
                                    gap={10}
                                    style={{ borderColor: Token.ColorBase700 }}
                                    bgToken="base-900">
                                    <Link
                                        href="/"
                                        row>
                                        <Logo size="sm" color="var(--f-color-accent)" />
                                    </Link>
                                    <Heading
                                        as="h4"
                                        colorToken="base-200"
                                        fontWeight="semibold">
                                        Documentation
                                    </Heading>
                                    <Flexer />
                                </Header>
                                <View
                                    flex={1}
                                    width="100%"
                                    style={{ overflowY: 'scroll' }}>
                                    <Navigation
                                        style={{ 
                                            '--f-navigation-item-color-active': 'var(--f-color-text)',
                                            '--f-navigation-item-height': '33px',
                                        }}
                                        width="100%"
                                        height="100%"
                                        alignItems="flex-start"
                                        onClick={() => setOpen(false)}>
                                        <NavigationHeading>Overview</NavigationHeading>
                                        <NavigationItem
                                            active={url == 'introduction'}
                                            onClick={() =>
                                                router.push('/docs/introduction', { scroll: false })
                                            }
                                            prefix={
                                                <Icon
                                                    icon={PiPackage}
                                                    color={Token.ColorTeal400}
                                                    strokeWidth={2}
                                                />
                                            }>
                                            Introduction
                                        </NavigationItem>
                                        <NavigationItem
                                            active={url == 'getting-started'}
                                            onClick={() =>
                                                router.push('/docs/getting-started', {
                                                    scroll: false,
                                                })
                                            }
                                            prefix={
                                                <Icon
                                                    color={Token.ColorBlue400}
                                                    icon={PiRocketLaunch}
                                                    strokeWidth={2}
                                                />
                                            }>
                                            Getting Started
                                        </NavigationItem>
                                        {/* 
                                        <NavigationItem
                                            active={url == 'pro'}
                                            onClick={() =>
                                                router.push('/docs/pro', {
                                                    scroll: false,
                                                })
                                            }
                                            suffix={
                                                <Pill
                                                    size="xs"
                                                    border="0"
                                                    color={Token.ColorSlate200}>
                                                    EARLY ACCESS
                                                </Pill>
                                            }
                                            prefix={
                                                <Logo
                                                    customSize={18} 
                                                    color={Token.ColorSlate200}
                                                    style={{ marginLeft: 2 }} 
                                                />
                                            }>
                                            Pro
                                        </NavigationItem>
                                        */}
                                        <NavigationItem
                                            active={url == 'community'}
                                            onClick={() =>
                                                router.push('/docs/community', { scroll: false })
                                            }
                                            prefix={
                                                <Icon
                                                    icon={PiPersonArmsSpread}
                                                    color={Token.ColorPink400}
                                                    strokeWidth={2}
                                                />
                                            }>
                                            Community
                                        </NavigationItem>
                                        <NavigationItem
                                            active={url == 'faq'}
                                            onClick={() =>
                                                router.push('/docs/faq', { scroll: false })
                                            }
                                            prefix={
                                                <Icon
                                                    icon={PiQuestion}
                                                    color={Token.ColorOrange400}
                                                    strokeWidth={2}
                                                />
                                            }>
                                            FAQ
                                        </NavigationItem>
                                        <NavigationItem
                                            active={url == 'releases'}
                                            onClick={() =>
                                                router.push('/docs/releases', { scroll: false })
                                            }
                                            prefix={
                                                <Icon
                                                    icon={PiFlag}
                                                    color={Token.ColorYellow400}
                                                    strokeWidth={2}
                                                />
                                            }>
                                            Releases
                                        </NavigationItem>
                                        <NavigationItem
                                            href="https://github.com/orgs/fold-ui/projects/8/views/2"
                                            target="_blank"
                                            prefix={
                                                <Icon
                                                    icon={PiSignpost}
                                                    color={Token.ColorTeal400}
                                                    strokeWidth={2}
                                                />
                                            }>
                                            Roadmap
                                        </NavigationItem>
                                        <NavigationItem
                                            href="https://storybook.fold-ui.com"
                                            target="_blank"
                                            prefix={<StorybookIcon />}>
                                            Storybook
                                        </NavigationItem>
                                        <NavigationDivider />
                                        <NavigationHeading>Design</NavigationHeading>
                                        <NavigationItem
                                            active={url == 'design-system'}
                                            onClick={() =>
                                                router.push('/docs/design-system', {
                                                    scroll: false,
                                                })
                                            }
                                            prefix={
                                                <Icon
                                                    icon={PiPlanet}
                                                    color={Token.ColorPink400}
                                                    strokeWidth={2}
                                                />
                                            }>
                                            Design System
                                        </NavigationItem>
                                        <NavigationItem
                                            active={url == 'theming'}
                                            onClick={() =>
                                                router.push('/docs/theming', { scroll: false })
                                            }
                                            prefix={
                                                <Icon
                                                    icon={PiMarkerCircle}
                                                    color={Token.ColorOrange400}
                                                    strokeWidth={2}
                                                />
                                            }>
                                            Theming
                                        </NavigationItem>
                                        <NavigationItem
                                            active={url == 'icons'}
                                            onClick={() =>
                                                router.push('/docs/icons', { scroll: false })
                                            }
                                            prefix={
                                                <Icon
                                                    icon={PiPinwheel}
                                                    color={Token.ColorPurple400}
                                                    strokeWidth={2}
                                                />
                                            }>
                                            Icons
                                        </NavigationItem>
                                        <NavigationItem
                                            active={url == 'tokens'}
                                            onClick={() =>
                                                router.push('/docs/tokens', { scroll: false })
                                            }
                                            prefix={
                                                <Icon
                                                    icon={PiFingerprintSimple}
                                                    color={Token.ColorBlue400}
                                                    strokeWidth={2}
                                                />
                                            }>
                                            Tokens
                                        </NavigationItem>
                                        <NavigationDivider />
                                        {/* 
                                        <NavigationHeading 
                                            suffix={(
                                                <Pill
                                                    color={Token.ColorSlate200}
                                                    size="xs"
                                                    subtle>
                                                    v0.1.2
                                                </Pill>)}>
                                                Pro Components
                                        </NavigationHeading>
                                        {navigationPro.map((component: any, index: number) => (
                                            <NavigationItem
                                                active={url == component.slug}
                                                key={index}
                                                onClick={() =>
                                                    router.push('/docs/pro/' + component.slug, {
                                                        scroll: false,
                                                    })
                                                }
                                                suffix={
                                                    <View
                                                        gap={5}
                                                        row>
                                                        {component.experimental && (
                                                            <Pill
                                                                size="xs"
                                                                subtle>
                                                                BETA
                                                            </Pill>
                                                        )}
                                                    </View>
                                                }>
                                                {component.title}
                                            </NavigationItem>
                                        ))}
                                        <NavigationDivider />
                                        */}
                                        <NavigationHeading
                                            suffix={            
                                                <Pill
                                                    size="xs"
                                                    subtle>
                                                    v0.22.0
                                                </Pill>                                               
                                            }>
                                            Core Components
                                        </NavigationHeading>
                                        {navigation.map((component: any, index: number) => (
                                            <NavigationItem
                                                active={url == component.slug}
                                                key={index}
                                                style={{ textTransform: 'capitalize' }}
                                                onClick={() =>
                                                    router.push('/docs/core/' + component.slug, {
                                                        scroll: false,
                                                    })
                                                }
                                                suffix={
                                                    <View
                                                        gap={5}
                                                        row>
                                                        {component.experimental && (
                                                            <Pill
                                                                size="xs"
                                                                subtle>
                                                                BETA
                                                            </Pill>
                                                        )}
                                                    </View>
                                                }>
                                                {component.slug.replace('-', ' ')}
                                            </NavigationItem>
                                        ))}
                                        <NavigationDivider />
                                        <NavigationHeading
                                            suffix={            
                                                <Pill
                                                    size="xs"
                                                    subtle>
                                                    v0.22.0
                                                </Pill>                                               
                                            }>
                                            Pro Components
                                        </NavigationHeading>
                                        {navigationPro.map((component: any, index: number) => (
                                            <NavigationItem
                                                active={url == component.slug}
                                                key={index}
                                                style={{ textTransform: 'capitalize' }}
                                                onClick={() =>
                                                    router.push('/docs/pro/' + component.slug, {
                                                        scroll: false,
                                                    })
                                                }
                                                suffix={
                                                    <View
                                                        gap={5}
                                                        row>
                                                        {component.experimental && (
                                                            <Pill
                                                                size="xs"
                                                                subtle>
                                                                BETA
                                                            </Pill>
                                                        )}
                                                    </View>
                                                }>
                                                {component.slug.replace('-', ' ')}
                                            </NavigationItem>
                                        ))}
                                        <NavigationDivider />
                                        <NavigationHeading>Helpers</NavigationHeading>
                                        <NavigationItem
                                            active={url == 'hooks'}
                                            onClick={() =>
                                                router.push('/docs/core/hooks', { scroll: false })
                                            }>
                                            Hooks
                                        </NavigationItem>
                                        <NavigationItem
                                            href="https://fold-ui.github.io/fold"
                                            target="_blank">
                                            TypeDocs
                                        </NavigationItem>
                                        <NavigationSection>
                                            <Heading
                                                p="1rem"
                                                as="h6"
                                                colorToken="text-weakest"
                                                fontWeight={500}>
                                                Fold &copy; 2024
                                            </Heading>
                                        </NavigationSection>
                                    </Navigation>
                                </View>
                            </Resizable>
                        </Sidebar>

                        <Main
                            column
                            flex={1}
                            height="100%"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            style={{ overflow: 'hidden' }}
                            bgToken="surface">
                            <Header
                                gap="0.5rem"
                                height="4.5rem"
                                p="0.5rem 1rem 0.5rem 0"
                                bgToken="base-900"
                                style={{ borderColor: Token.ColorBase700, '--f-popout-buffer': '1rem' }}
                                colorToken="text-weaker">
                                <SearchComponent />
                                <Stack
                                    m="0 0 0 1rem"
                                    spacing="1rem"
                                    noStretch>
                                    <Link
                                        target="_blank"
                                        href="https://github.com/fold-ui/fold">
                                        <Pill
                                            p="0"
                                            subtle
                                            height={30}
                                            width={30}
                                            className="f-buttonize-outline"
                                            color={Token.ColorSlate200}>
                                            <Icon icon={PiGithubLogo} />
                                        </Pill>
                                    </Link>
                                   {/*  <Link
                                        href="https://twitter.com/fold_dev"
                                        target="_blank">
                                        <Pill
                                            p="0"
                                            subtle
                                            height={30}
                                            width={30}
                                            className="f-buttonize-outline"
                                            color={Token.ColorSlate200}>
                                            <Icon icon={PiTwitterLogo} />
                                        </Pill>
                                    </Link>
                                    <Link
                                        href="https://www.linkedin.com/company/fold-ui"
                                        target="_blank">
                                        <Pill
                                            p="0"
                                            subtle
                                            height={30}
                                            width={30}
                                            className="f-buttonize-outline"
                                            color={Token.ColorSlate200}>
                                            <Icon icon={PiLinkedinLogo} />
                                        </Pill>
                                    </Link>
                                    <Link
                                        href="mailto:support@fold-ui.com"
                                        style={{ textWrap: 'nowrap' }}>
                                        <Pill
                                            p="0"
                                            subtle
                                            height={30}
                                            width={30}
                                            className="f-buttonize-outline"
                                            color={Token.ColorSlate200}>
                                            <Icon icon={PiLifebuoy} />
                                        </Pill>
                                    </Link> */}
                                    <Popover
                                        arrow
                                        width={350}
                                        anchor="bottom-right"
                                        content={
                                            <View
                                                p={20}
                                                column
                                                gap={10}
                                                alignItems="flex-start">
                                                <Heading as="h5">Font Family:</Heading>
                                                <Options
                                                    animated
                                                    width="100%"
                                                    selected={option}
                                                    onOptionChange={setOption}>
                                                    <Option>System</Option>
                                                    <Option>Inter</Option>
                                                    <Option>Instrument</Option>
                                                </Options>
                                                {/* <Heading as="h5">Color:</Heading> */}
                                                <Palette
                                                    display="none"
                                                    justifyContent="center"
                                                    gap={1}
                                                    color={color}
                                                    colors={[
                                                        Token.ColorPurple400,
                                                        Token.ColorPink400,
                                                        Token.ColorRed400,
                                                        Token.ColorOrange400,
                                                        Token.ColorYellow400,
                                                        Token.ColorGreen400,
                                                        Token.ColorTeal400,
                                                        Token.ColorCyan400,
                                                        Token.ColorBlue400,
                                                    ]}
                                                    onChange={setColor}
                                                />
                                                <Heading as="h5">Radius:</Heading>
                                                <Range
                                                    min={0}
                                                    max={10}
                                                    step={1}
                                                    value={value}
                                                    onChange={(e: any) => setValue(e.target.value)}
                                                />
                                            </View>
                                        }
                                        isVisible={visible}
                                        onDismiss={hide}>
                                        <View
                                            row
                                            colorToken="slate-300"
                                            className="f-buttonize"
                                            onClick={show}>
                                            <Icon
                                                icon={PiFaders}
                                                size="lg"
                                            />
                                        </View>
                                    </Popover>
                                    {/* 
                                    <Button
                                        outline
                                        as="a"
                                        href="https://app-sandbox.fold-ui.com"
                                        target="_blank"
                                        variant="accent">
                                        AppSandbox ↗
                                    </Button> 
                                    <Button
                                        as="a"
                                        href="/#pro"
                                        target="_blank"
                                        variant="accent">
                                        Buy Now
                                    </Button> 
                                    */}
                                    <DarkModeToggle />
                                </Stack>
                                <View 
                                    row 
                                    gap={20}
                                    width="100%"
                                    p="0 0 0 1rem"
                                    className="docs-site__mobile-header">
                                    <Link
                                        href="/"
                                        row>
                                        <Logo size="sm" />
                                    </Link>
                                    <Heading
                                        as="h4"
                                        colorToken="base-200"
                                        fontWeight="semibold">
                                        Documentation
                                    </Heading>
                                    <Flexer />
                                    <DarkModeToggle />
                                    <Button onClick={() => setOpen(!open)}>
                                        <Icon icon={Bars3Icon} />
                                    </Button>
                                </View>
                            </Header>

                            <View
                                row
                                flex={1}
                                bgToken="surface"
                                width="100%"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                className="scroll-content">
                                <View
                                    p={0}
                                    flex={1}
                                    width="100%"
                                    position="relative"                                    
                                    style={
                                        {
                                            'overflow': 'hidden',
                                            '--f-tabs-panel-padding': '30px',
                                        } as any
                                    }>
                                    <SkipNavMain />
                                    <div className="docs-site__warning">
                                        We are working on improving mobile support.
                                        For the best experience, please use a desktop or tablet for now.
                                    </div>
                                    {children}
                                </View>

                                {/* <PageNavigationComponent /> */}

                                {!noToc && (
                                    <Sidebar
                                        right
                                        p={30}
                                        width={250}
                                        display="block"
                                        bgToken="surface"
                                        style={{ top: 0 }}
                                        className="docs-site__toc"
                                        position="sticky"
                                        alignContent="flex-start">
                                        <Heading as="h4">On this page</Heading>

                                        <List
                                            type="none"
                                            bullet=""
                                            p={0}
                                            m="1rem 0 0 0">
                                            {!toc.length && <Text>No sections available.</Text>}
                                            {toc.map(({ href, text, type }, index: number) => (
                                                <Li key={index}>
                                                    <Link
                                                        href={href}
                                                        size={type == 'h3' ? 'md' : 'sm'}
                                                        p={type == 'h3' ? '' : '0 0 0 1rem'}
                                                        textDecoration="none"
                                                        fontWeight="normal">
                                                        {text}
                                                    </Link>
                                                </Li>
                                            ))}
                                        </List>
                                    </Sidebar>
                                )}
                            </View>
                        </Main>
                    </Content>
                </App>
            </FoldProvider>
        </>
    )
}
