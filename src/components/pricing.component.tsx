import { LicenseContent } from '@/pages/license'
import {
    Accordion,
    AccordionHeading,
    AccordionItem,
    AccordionPanel,
    Button,
    Card,
    Divider,
    Flexer,
    Heading,
    Icon,
    IconLib,
    Li,
    Link,
    List,
    Modal,
    ModalClose,
    Notification,
    NotificationContent,
    Option,
    Options,
    Pill,
    Portal,
    Range,
    Text,
    Tooltip,
    TooltipContent,
    View,
    useVisibility
} from '@fold-ui/core'
import * as Token from '@fold-ui/design/tokens'
import { useEffect, useRef, useState } from 'react'
import { PiSparkle } from 'react-icons/pi'
import { GraphicLeft, GraphicRight } from './graphic.component'

export const FAQAccordion = (props) => (
    <Accordion>
        <AccordionItem>
            <AccordionHeading>
                What is Early Access?
            </AccordionHeading>
            <AccordionPanel>
                Early Access is the first release of Fold Pro, offering developers early access to Fold Pro's premium UI components.
            </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
            <AccordionHeading>
                What components are included?
            </AccordionHeading>
            <AccordionPanel>
                Kanban Board, Todo List, Calendar, Data Grid, CSV Importer & Date Picker.
            </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
            <AccordionHeading>
                Is it production ready?
            </AccordionHeading>
            <AccordionPanel>
                Consider Early Access as alpha software, which can be relatively unstable. 
                The team is diligently working to fix bugs and resolve other issues.
                To report a bug, open a new issue on <Link href="https://github.com/fold-ui/fold" target="_blank" fontSize="inherit">GitHub</Link> (label it as Pro).
            </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
            <AccordionHeading>
                How long will Early Access last?
            </AccordionHeading>
            <AccordionPanel>
                Not long!
                Until it becomes stable enough and all planned roadmap items are completed.
            </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
            <AccordionHeading>
                What comes after Early Access?
            </AccordionHeading>
            <AccordionPanel>
                After Early Access Fold Pro will go into a stable release schedule, incrementally rolling out further updates.
            </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
            <AccordionHeading>
                What support channels are available?
            </AccordionHeading>
            <AccordionPanel>
                Email us at <Link target="_blank" href="mailto:support@fold.dev">support@fold.dev</Link>, or post a message to the private <Link target="_blank" href="https://groups.google.com/a/fold-ui.com/g/pro">Fold Pro Google Group</Link>, or start a <Link target="_blank" href="https://github.com/fold-ui/fold/discussions">GitHub Discussion</Link>.
            </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
            <AccordionHeading>
                Where can I report bugs or submit feature requests?
            </AccordionHeading>
            <AccordionPanel>
                <Link target="_blank" href="https://github.com/fold-ui/fold/discussions">GitHub Discussions</Link> or on <Link href="https://github.com/fold-ui/fold/issues" target="_blank" fontSize="inherit">GitHub Issues</Link> (label it as Pro).
            </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
            <AccordionHeading>
                Is there a roadmap?
            </AccordionHeading>
            <AccordionPanel>
                Yes, you can view the public roadmap <Link target="_blank" href="https://github.com/orgs/fold-ui/projects/8/views/2">here</Link>.
            </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
            <AccordionHeading>
                What if I don't renew my license?
            </AccordionHeading>
            <AccordionPanel>
                You will retain access to the last version you downloaded and remain bound by the same license agreement as when you purchased the license.
                However, your access to NPM and the Google Group will be revoked, and you will not receive any further updates.
            </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
            <AccordionHeading>
                Is the source code available?
            </AccordionHeading>
            <AccordionPanel>
                The source code of every release will be posted to the <Link target="_blank" href="https://groups.google.com/a/fold-ui.com/g/pro">Fold Pro Google Group</Link>.
            </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
            <AccordionHeading>I have another question?</AccordionHeading>
            <AccordionPanel>
                For any other questions, please email <Link target="_blank" href="mailto:support@fold.dev">support@fold.dev</Link>.
            </AccordionPanel>
        </AccordionItem>
    </Accordion>
)

export const FAQ = (props) => (
    <View
        row
        flex={2}
        alignItems="flex-start"
        p="4rem 2rem 4rem 0"
        style={{
            '--f-link-color': 'var(--f-color-accent-400)',
            '--f-accordion-border-color': 'var(--f-color-base-700)',
            '--f-accordion-background': 'var(--f-color-base-900)',
            '--f-accordion-color': 'var(--f-color-base-300)',
            '--f-accordion-color-heading': 'var(--f-color-base-300)',
            '--f-accordion-color-description': 'var(--f-color-base-300)',
            '--f-accordion-hover-border-color': 'var(--f-color-base-700)',
            '--f-accordion-hover-background-color': 'var(--f-color-base-800)',
            '--f-accordion-active-background-color': 'var(--f-color-base-500)',
            '--f-accordion-active-background': 'var(--f-color-base-600)',
            '--f-accordion-active-color': 'var(--f-color-base-300)',
        } as any}>
        <FAQAccordion />
    </View>
)

export const PricingComponent = () => {
    const [down, setDown] = useState(false)
    const selectSeat = useRef(null)
    const { show, hide, visible } = useVisibility()

    const openPayment = () => {
        // const Paddle: any = window['Paddle']

        // Paddle.Environment.set('sandbox')
        // Paddle.Initialize({ token: 'test_341b6905e3ca3a3b2a7b42ffdcc' })

        const Paddle: any = window['Paddle']
        Paddle.Initialize({ token: 'live_d2beed0f09a4785cc33eadab587' })

        const seats = selectSeat.current
        hide()

        
        // let url = ''

        // switch (seats) {
        //     case 1: 
        //         url = 'https://store.fold-ui.com/checkout/buy/e5520e31-4851-4aa8-be18-b79f9f509bb0'
        //         break
        //     case 2: 
        //         url = 'https://store.fold-ui.com/checkout/buy/503cb195-7f56-4608-b32d-1124e545aa24'
        //         break
        //     case 3: 
        //         url = 'https://store.fold-ui.com/checkout/buy/60e2704b-f358-4b30-bdac-a0aac1f981ef'
        //         break
        //     case 4: 
        //         url = 'https://store.fold-ui.com/checkout/buy/66d427b3-7df1-4aed-b943-ac8d9171b9ff'
        //         break
        // }

        // window.open(url)

        let items = []

        switch (seats) {
            case 1:
                items = [
                    {
                        priceId: 'pri_01hyayzp0x0tmg4sh0g9t62nq6',
                        quantity: 1,
                    },
                ]
                break
            case 2:
                items = [
                    {
                        priceId: 'pri_01hq62nmznrvy201f7refbh4gp',
                        quantity: 1,
                    },
                ]
                break
            // unused:
            // case 3:
            //     items = [
            //         {
            //             priceId: 'pri_01hzgvcm6kkccadzgyyfpvvskr',
            //             quantity: 1,
            //         },
            //     ]
            //     break
            // case 4:
            //     items = [
            //         {
            //             priceId: 'pri_01hzgvd71e0mxvdr4nxdybpmet',
            //             quantity: 1,
            //         },
            //     ]
            //     break
        }

        Paddle.Checkout.open({ items })
    }

    useEffect(() => {
        if (!visible) setDown(false)
    }, [visible])

    return (
        <>
            <Modal
                portal={Portal}
                width={600}
                height="fit-content"
                anchor="middle-center"
                onDismiss={hide}
                isVisible={visible}
                header={
                    <View
                        row
                        gap={10}
                        width="100%">
                        <Heading as="h4">
                            License Agreement
                        </Heading>
                        <Flexer />
                        <ModalClose onClick={hide} />
                    </View>
                }
                footer={
                    <View
                        row
                        gap={10}
                        width="100%">
                        <Button onClick={hide}>
                            Cancel
                        </Button>
                        <Flexer />
                        <Button
                            onClick={openPayment}
                            variant="accent"
                            outline
                            disabled={!down}>
                            Accept & Continue
                        </Button>
                    </View>
                }>
                <View
                    p={20}
                    width="100%"
                    className="f-overflow-y-auto"
                    onScroll={(e) => {
                        setDown((e.currentTarget.scrollTop + 50) > (e.currentTarget.scrollHeight - e.currentTarget.offsetHeight))
                    }}
                    height={500}>
                    <LicenseContent />
                </View>
            </Modal>
            <View
                id="pro"
                column
                gap="2rem"
                flex={1}
                bgToken="base-900"
                width="100%"
                position="relative"
                style={{ overflow: 'hidden' }}
                p="10rem 0"
                className="pricing">
                <GraphicRight
                    color={Token.ColorAccent200}
                    style={{ position: 'absolute', top: -100, right: -100, opacity: 0.1 }}
                    height={882 / 2}
                    width={1456 / 2}
                />

                <Text
                    textAlign="center"
                    style={{ textTransform: 'uppercase' }}
                    letterSpacing={5}
                    colorToken="base-500">
                    Fold Pro
                </Text>

                <Heading
                    textAlign="center"
                    colorToken="base-200"
                    fontWeight={400}
                    width="80%">
                    Supercharge your next project with Fold Pro.
                    Fold Pro is built specifically for teams who need high-end components for building exceptional product experiences.
                </Heading>

                <Pill
                    subtle
                    color={Token.ColorPurple500}
                    m="2rem 0">
                    Early Access has launched.<Icon icon={PiSparkle} color="var(--f-purple-500)" style={{ margin: '0 7px' }} />Keep reading below to find out more.
                </Pill>

                <View
                    row
                    justifyContent="stretch"
                    alignContent="stretch"
                    alignItems="stretch"
                    width="75%"
                    style={{ minWidth: '50%', maxWidth: '90%' }}
                    m="0 auto"
                    gap={20}
                    position="relative"
                    className="pricing__cards">

                    <Card
                        column
                        flex={1}
                        height="auto"
                        p="2rem"
                        gap="1rem"
                        alignItems="flex-start"
                        alignContent="flex-start"
                        justifyContent="flex-start"
                        bgToken="surface">
                        <Text size="lg">
                            Fold Pro offers developers and teams the tools they need to scale their ideas to the next level.
                        </Text>
                        {/* 
                        <View
                            row
                            m="1rem 0 0 0"
                            gap={5}
                            alignItems="flex-start">
                            <Heading huge>{pricingSaas()}</Heading>
                            <Heading as="h5" fontWeight={600}>USD</Heading>
                        </View>
                        <Heading
                            as="h4"
                            colorToken="text-weakest"
                            textDecoration="line-through">
                            {pricingSaas(1999)} USD
                        </Heading>  
                        */}
                        <List>
                            <Li
                                row
                                width="fit-content">
                                <IconLib icon="check" color="var(--f-color-accent)" /> Kanban Board, Todo List, Calendar, Data Grid, CSV Importer & Date Picker components
                            </Li>
                            <Li
                                row
                                width="fit-content">
                                <IconLib icon="check" color="var(--f-color-accent)" /> Perpetual use
                            </Li>
                            <Li
                                row
                                width="fit-content">
                                <IconLib icon="check" color="var(--f-color-accent)" /> Prioritized support
                            </Li>
                            <Li
                                row
                                width="fit-content">
                                <IconLib icon="check" color="var(--f-color-accent)" /> Private NPM access
                            </Li>
                            <Li
                                row
                                width="fit-content">
                                <IconLib icon="check" color="var(--f-color-accent)" /> Source code
                            </Li>
                            <Li
                                row
                                width="fit-content">
                                <IconLib icon="check" color="var(--f-color-accent)" /> 1 year of updates
                            </Li>
                            <Tooltip text="Non commercial/internal use.">
                                <Li
                                    row
                                    width="fit-content">
                                    <IconLib icon="check" color="var(--f-color-accent)" /> Unlimited projects&nbsp;<span style={{ color: 'var(--f-color-accent)' }}>*</span>
                                </Li>
                            </Tooltip>
                            <Tooltip text="As they become available.">
                                <Li
                                    row
                                    width="fit-content">
                                    <IconLib icon="check" color="var(--f-color-accent)" /> Access to future roadmap items&nbsp;<span style={{ color: 'var(--f-color-accent)' }}>*</span>
                                </Li>
                            </Tooltip>
                        </List>
                        <Divider style={{ '--f-divider-color': 'var(--f-color-text-weakest)' }} />
                        <Text colorToken="text-weak">
                            <Link href="support@fold.dev" target="_blank">Contact us</Link> for distributable OEM license options.
                        </Text>

                    </Card>

                    <Card
                        flex={1}
                        column
                        height="auto"
                        p="2rem"
                        gap="1rem"
                        alignItems="flex-start"
                        alignContent="flex-start"
                        justifyContent="flex-start">
                        <Heading as="h2">
                            Indie
                        </Heading>
                        <Text colorToken="base-300">
                            For teams of up to 3 developers, who need to level up their next big idea.
                        </Text>
                        <View
                            row
                            m="1rem 0 0 0"
                            gap={5}
                            alignItems="flex-start">
                            <Heading huge>
                                329
                            </Heading>
                            <Heading
                                as="h5"
                                fontWeight={600}>
                                USD
                            </Heading>
                        </View>
                        <Text 
                            size="lg"
                            colorToken="text-weakest"
                            textDecoration="line-through">
                            449 USD
                        </Text>
                        <Flexer />
                        <Button
                            onClick={() => {
                                selectSeat.current = 1
                                show()
                            }}
                            m="1rem 0 0 0"
                            size="xl"
                            width="100%"
                            variant="accent">
                            Buy
                        </Button>
                    </Card>

                    <Card
                        flex={1}
                        column
                        p="2rem"
                        height="auto"
                        gap="1rem"
                        alignItems="flex-start"
                        alignContent="flex-start"
                        justifyContent="flex-start">
                        <Heading as="h2">
                            Team
                        </Heading>
                        <Text colorToken="base-300">
                            For teams of up to 10 developers, who need to supercharge their project.
                        </Text>
                        <View
                            row
                            m="1rem 0 0 0"
                            gap={5}
                            alignItems="flex-start">
                            <Heading huge>
                                749
                            </Heading>
                            <Heading
                                as="h5"
                                fontWeight={600}>
                                USD
                            </Heading>
                        </View>
                        <Text 
                            size="lg"
                            colorToken="text-weakest"
                            textDecoration="line-through">
                            999 USD
                        </Text>
                        <Text
                            size="sm"
                            m="1rem 0 0 0">
                            Need more than 10 developers? <Link href="mailto:support@fold.dev" size="sm">Contact us</Link>.
                        </Text>                        
                        <Flexer />
                        <Button
                            onClick={() => {
                                selectSeat.current = 2
                                show()
                            }}
                            m="1rem 0 0 0"
                            size="xl"
                            width="100%"
                            variant="accent">
                            Buy
                        </Button>
                    </Card>
                </View>

                <View lineHeight={2}>
                    <Text colorToken="base-600" textAlign="center">
                        Please email <Link href="mailto:support@fold.dev" colorToken="accent-400">support@fold.dev</Link> if you are unsure which license applies to you.
                    </Text>
                    <Text colorToken="base-600" textAlign="center">
                        Purchasing a license is subject to the <Link href="/license" target="_blank">license agreement</Link>.
                    </Text>
                    <Text colorToken="base-600" textAlign="center">
                        VAT may apply based on your location.
                    </Text>
                </View>
            </View>

            <View
                row
                bgToken="base-900"
                position="relative"
                p="0 0rem 11rem 0rem"
                width="100%"
                style={{ overflow: 'hidden' }}>
                <GraphicLeft
                    color={Token.ColorAccent200}
                    style={{ position: 'absolute', bottom: -100, left: -200, opacity: 0.1 }}
                    width={1107 / 2}
                    height={559 / 2}
                />

                <View
                    p="0.5rem"
                    width="85%"
                    radius="var(--f-radius)"
                    bg="linear-gradient(162deg, #EDCB1B -110.38%, #FF154D -59.98%, #C15AF1 -14.21%, #2087FF 41.76%, #00E1B9 100%)">
                    <View
                        row
                        gap={50}
                        width="100%"
                        radius="var(--f-radius)"
                        bgToken="base-900"
                        position="relative"
                        style={{ overflow: 'hidden' }}
                        alignItems="flex-start"
                        className="pricing__faq">
                        <View
                            column
                            flex={0.5}
                            gap={30}
                            alignItems="flex-start"
                            p="5rem 0rem 5rem 5rem">
                            <Pill
                                subtle
                                style={{ textTransform: 'uppercase' }}
                                color={Token.ColorPurple400}>
                                Fold Pro
                            </Pill>
                            <Text
                                style={{ textTransform: 'uppercase' }}
                                letterSpacing={5}
                                colorToken="base-500"
                                id="features">
                                The Fineprint
                            </Text>
                            <Heading
                                fontSize="3rem"
                                colorToken="base-100"
                                fontWeight={400}>
                                What is Early Access?
                            </Heading>
                        </View>

                        <FAQ />
                    </View>
                </View>
            </View>
        </>
    )
}
