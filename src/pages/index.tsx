import React, { useEffect, useState } from 'react'
import { All, CoreComponent } from '@/components/core.component'
import { FAQComponent } from '@/components/faq.component'
import { GoComponent } from '@/components/go.component'
import { HeroComponent, HeroSpace } from '@/components/hero.component'
import { PricingComponent } from '@/components/pricing.component'
import {
    CalendarExample,
    DataGridExample,
    KanbanExample,
    ProComponent,
    TodoExample,
} from '@/components/pro.component'
import { SupportComponent } from '@/components/support.component'
import { CtaSection } from '@/components/cta.component'
import {
    Attachment,
    Avatar,
    Button,
    ButtonGroup,
    Card,
    ColorPicker,
    Copy,
    DarkModeToggle,
    DatePickerProvider,
    Divider,
    Flexer,
    Grid,
    Header,
    Heading,
    IconLib,
    Image,
    Link,
    Logo,
    Menu,
    MenuItemOption,
    MenuOptionGroup,
    Navigation,
    NavigationItem,
    Option,
    Options,
    Pill,
    Range,
    ScrollingDatePicker,
    Select,
    Sparkline,
    Stack,
    Tab,
    TabList,
    Tabs,
    Text,
    Timeline,
    TimelineItem,
    View,
    documentObject,
    timezones,
    useCopy,
    useScrollingDatePicker
} from '@fold-ui/core'

const work = [
    {
        eyebrow: 'The parts every interface needs',
        title: 'Core',
        body: 'Start with buttons, forms, menus and layouts that work together. Use them as shipped, theme them with tokens or change the source. It\'s MIT licensed, so the choice stays yours.',
        link: 'Explore Core',
        href: '/docs/introduction',
        image: '/fold-studio/lane-workspace.jpg',
        alt: 'Lane workspace showing a project plan and structured workflow',
    },
    {
        eyebrow: 'Dense data, kept workable',
        title: 'Data Grid',
        body: 'Build editable tables with resizable columns, row selection and custom cells. The common behaviour is built in; the parts specific to your product stay configurable.',
        link: 'Explore Data Grid',
        href: '/docs/core/data-grid',
        image: '/fold-studio/lane-economics.jpg',
        alt: 'Lane project economics interface with budgets and delivery data',
    },
    {
        eyebrow: 'Put time in context',
        title: 'Calendar',
        body: 'Build day, week and month views for events, schedules and availability. Users can see what is happening, move through time and adjust the plan in one place.',
        link: 'Explore Calendar',
        href: '/docs/pro/calendar',
        image: '/fold-studio/product-system.png',
        alt: 'A product interface built from a reusable component system',
    },
    {
        eyebrow: 'See where work is stuck',
        title: 'Kanban',
        body: 'Organize cards into columns, move work between stages and shape the board around your process. The interaction is handled; your application keeps control of the data.',
        link: 'Explore Kanban',
        href: '/docs/pro/kanban',
        image: '/fold-studio/product-system.png',
        alt: 'A product interface built from a reusable component system',
    },
    {
        eyebrow: 'Keep the details with the task',
        title: 'Todo',
        body: 'Group tasks, track progress and keep subtasks, dates and assignees attached to the work. Enough context to act, without turning a todo list into a second project manager.',
        link: 'Explore Todo',
        href: '/docs/pro/todo',
        image: '/fold-studio/product-system.png',
        alt: 'A product interface built from a reusable component system',
    },
]

const documentationLinks = [
    { label: 'Get your first Fold interface up and running.', href: '/docs/getting-started' },
    { label: 'Explore the design system behind every component.', href: '/docs/design-system' },
    { label: 'Make Fold your own with custom themes.', href: '/docs/theming' },
    { label: 'Shape your interface with colour, spacing and type.', href: '/docs/tokens' },
    { label: 'Find the right icons for your interface.', href: '/docs/icons' },
    { label: 'Build flexible layouts from simple primitives.', href: '/docs/core/layout' },
]

const inclusions = [
    'Getting Fold running in your application',
    'Choosing the right component for the job',
    'Working through TypeScript and API questions',
    'Integrating components with your application state',
    'Adapting themes and design tokens',
    'Handling responsive layouts',
    'Reviewing accessibility',
    'Configuring Data Grid',
    'Setting up calendars and schedules',
    'Building Kanban and task workflows',
    'Extending components for your product',
    'Finding and fixing integration bugs',
    'Reviewing performance',
    'Planning upgrades and migrations',
    'Reviewing implementation code with your team',
    'Working through difficult decisions together',
    'Planning what Fold needs next',
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
function Home() {
    const [showChild, setShowChild] = useState(false)

    useEffect(() => {
        setShowChild(true)
    }, [])

    useEffect(() => {
        if (showChild && window.location.hash) {
            document.getElementById(window.location.hash.slice(1))?.scrollIntoView()
        }
    }, [showChild])

    if (!showChild) return null

    return (
        <View
            width="100%"
            className="revamp-home">
            <View>
                <View
                    className="revamp-sections"
                    column
                    alignItems="flex-start"
                    gap="10rem">
                    <View className="revamp-hero" width="100%" position="relative">
                        <HeroSpace />
                        <View
                            className="revamp-hero__copy"
                            column
                            alignItems="flex-start"
                            gap="1rem">
                            <Text
                                style={{ textTransform: 'uppercase' }}
                                colorToken="text-weaker">
                                Zero Gravity UI Components
                            </Text>
                            <Heading
                                fontWeight="var(--f-font-weight-light)"
                                fontSize="var(--f-font-size-large)">
                                Product UI without dependency hell.&nbsp;
                                <Text as="span" colorToken="text-weak" fontSize="inherit">
                                Fold is an OSS React library for everyday controls, data grids and advanced interactions. 
                                Lightspeed DX, with no runtime dependencies beyond React.
                                </Text>
                            </Heading>
                        </View>
                    </View>

                    {work.map((item, index) => (
                        <View
                            id={item.title.toLowerCase().replace(/ /g, '-')}
                            width="100%"
                            key={index}>
                            <View
                                className="revamp-section__copy"
                                column
                                width="50%"
                                alignItems="flex-start"
                                gap="0.75rem">
                                <Text
                                    style={{ textTransform: 'uppercase' }}
                                    colorToken="text-weaker">
                                    {item.eyebrow}
                                </Text>
                                <Heading as="h3">
                                    {item.title}
                                </Heading>
                                <Text colorToken="text-weak">
                                    {item.body}
                                </Text>
                                <Link
                                    row
                                    gap="0.35rem"
                                    className="f-underline"
                                    href={item.href}>
                                    {item.link}{' '}
                                    <IconLib
                                        icon="arrow-right"
                                        size="sm"
                                    />
                                </Link>
                            </View>
                            <Card
                                className="revamp-example"
                                p="2rem"
                                m="7.5rem 0 0 0"
                                border="none"
                                width="100%"
                                height="fit-content">
                                {index == 0 && <All />}
                                {index == 1 && <DataGridExample />}
                                {index == 2 && <CalendarExample />}
                                {index == 3 && <KanbanExample />}
                                {index == 4 && <TodoExample />}
                            </Card>
                        </View>
                    ))}
                </View>

                <View
                    width="100%"
                    m="5rem 0">
                    <View
                        className="revamp-docs__heading"
                        row
                        justifyContent="space-between"
                        width="100%"
                        p="0 0 3rem 0">
                        <Text
                            size="lg"
                            fontWeight="var(--f-font-weight-medium)">
                            Explore the documentation.
                        </Text>
                        <Button
                            as="a"
                            href="#offers"
                            size="lg">
                            Get implementation help
                        </Button>
                    </View>

                    <Divider />

                    {documentationLinks.map(({ label, href }) => (
                        <React.Fragment key={href}>
                            <View
                                as="a"
                                href={href}
                                color="inherit"
                                textDecoration="none"
                                row
                                className="documentation-link"
                                justifyContent="space-between"
                                width="100%"
                                p="1.5rem 0">
                                <Text
                                    size="lg"
                                    fontWeight="var(--f-font-weight-medium)">
                                    {label}
                                </Text>
                                <IconLib icon="arrow-right" size="sm" aria-hidden="true" />
                            </View>
                            <Divider />
                        </React.Fragment>
                    ))}
                </View>

                <View
                    id="offers"
                    width="100%">
                    <Grid
                        className="revamp-offers"
                        columns={2}
                        gap="2.5rem"
                        width="100%"
                        alignItems="stretch">
                        <Card
                            column
                            alignItems="stretch"
                            justifyContent="flex-start"
                            bgToken="surface-stronger"
                            border="none"
                            width="auto"
                            height="100%"
                            p="2.25rem 2rem">
                            <View
                                column
                                alignItems="flex-start"
                                gap="1rem">
                                <Text fontWeight="var(--f-font-weight-medium)">Get help where you need it</Text>
                                <Text
                                    className="revamp-offers__description"
                                    colorToken="text-weaker"
                                    width="65%"
                                    lineHeight="1.5">
                                    Pick the areas your team wants help with. We will agree the scope, response times
                                    and availability before anything starts.
                                </Text>
                            </View>

                            <View
                                column
                                alignItems="flex-start"
                                gap="0.875rem"
                                m="3.5rem 0 0 0">
                                {inclusions.map((item) => (
                                    <View
                                        row
                                        justifyContent="flex-start"
                                        gap="1rem"
                                        key={item}>
                                        <IconLib
                                            icon="plus"
                                            size="xs"
                                            color="var(--f-color-text-weaker)"
                                        />
                                        <Text fontWeight="var(--f-font-weight-medium)">{item}</Text>
                                    </View>
                                ))}
                            </View>
                        </Card>

                        <Card
                            column
                            alignItems="stretch"
                            width="auto"
                            height="100%"
                            p="2.25rem 2rem"
                            bgToken="base-900"
                            border="none">
                            <View
                                column
                                alignItems="flex-start"
                                gap="1rem">
                                <Text
                                    colorToken="base-200"
                                    fontWeight="var(--f-font-weight-medium)">
                                    A direct line while you build
                                </Text>
                                <Text
                                    className="revamp-offers__description"
                                    colorToken="base-500"
                                    width="55%"
                                    lineHeight="1.5">
                                    Get practical answers by email or work through implementation decisions with us in
                                    scheduled sessions.
                                </Text>
                            </View>

                            <Flexer />

                            <View>
                                <View
                                    row
                                    justifyContent="flex-start"
                                    gap="1rem">
                                    <Text colorToken="base-200">Monthly support</Text>
                                    <Text colorToken="base-500">·</Text>
                                    <Text colorToken="base-500">USD</Text>
                                </View>

                                <View m="2rem 0 0 0">
                                    {offers.map((offer, index) => (
                                        <React.Fragment key={offer.name}>
                                            <View
                                                className="revamp-offers__price"
                                                row
                                                justifyContent="space-between"
                                                width="100%"
                                                p="0.75rem 0">
                                                <Text colorToken="base-200">
                                                    {offer.name} · {offer.timing}
                                                </Text>
                                                <View
                                                    row
                                                    gap="0.5rem">
                                                    <Text
                                                        size="lg"
                                                        colorToken="base-200">
                                                        {offer.price}
                                                    </Text>
                                                    <Text colorToken="base-500">{offer.qualifier}</Text>
                                                </View>
                                            </View>
                                            {index < offers.length - 1 && (
                                                <View
                                                    width="100%"
                                                    height="1px"
                                                    bgToken="base-750"
                                                />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </View>

                                <Button
                                    as="a"
                                    href="mailto:support@fold.dev?subject=Fold%20support%20waitlist"
                                    size="lg"
                                    width="100%"
                                    m="2rem 0 0 0"
                                    bgToken="base-50"
                                    colorToken="base-600"
                                    border="1px solid var(--f-color-base-400)">
                                    Join waitlist
                                </Button>

                                <Text
                                    className="revamp-offers__description"
                                    size="sm"
                                    colorToken="base-500"
                                    width="70%"
                                    lineHeight="1.4"
                                    m="1rem 0 0 0">
                                    Fold stays free and open source. Paid support covers the hands-on help, response
                                    times and working sessions agreed with your team.
                                </Text>
                            </View>
                        </Card>
                    </Grid>
                </View>
            </View>
        </View>
    )

    return (
        <>
            <HeroComponent />
            <ProComponent />
            <CoreComponent />
            <Divider />
            {/* 
            <PricingComponent />
            <Divider />
            <FAQComponent />
            <Divider />      
            <SupportComponent />
            <Divider />
            <GoComponent />   
            */}
            <CtaSection />
        </>
    )
}

Home.noLayout = true

export default Home
