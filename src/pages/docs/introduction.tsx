import DocsLayout from '@/layouts/docs.layout'
import {
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Grid,
    Heading,
    Icon,
    Link,
    Notification,
    NotificationContent,
    NotificationIcon,
    Text,
    View,
    addAlpha
} from '@fold-ui/core'
import * as Token from '@fold-ui/design/tokens'
import { useRouter } from 'next/router'
import React from 'react'
import {
    PiFingerprintSimple,
    PiFlag,
    PiLightbulb,
    PiMarkerCircle,
    PiPlanet
} from 'react-icons/pi'

export default function Introduction(props) {
    const router = useRouter()

    return (
        <View
            p={30}
            className="docs-content">
            <Breadcrumb>
                <BreadcrumbItem>Documentation</BreadcrumbItem>
                <BreadcrumbItem>Overview</BreadcrumbItem>
                <BreadcrumbItem active>Introduction</BreadcrumbItem>
            </Breadcrumb>
            <Heading fontWeight="bold">Introduction</Heading>
            <Notification variant="highlight">
                <NotificationIcon>
                    <Icon icon={PiLightbulb} />
                </NotificationIcon>
                <NotificationContent>
                    <Text>
                        Please consider these docs a work in progress. We're adding more detail all the time, but if you
                        have any questions - please feel free to ask them on{' '}
                        <Link
                            href="https://github.com/fold-ui/fold/discussions"
                            target="_blank">
                            GitHub
                        </Link>{' '}
                        or email us at <Link href="mailto:support@fold.dev">support@fold.dev</Link>.
                    </Text>
                </NotificationContent>
            </Notification>
            <Heading as="h2">
                Fold is a zero-dependency React UI library for product teams, built on modern web standards that aims to
                be flexible & performant. With this philosphy in mind, we're also aiming to build a developer experience
                that is pleasant for beginners, but also for veterans.
            </Heading>
            <Text>
                We've just launched and would love your feedback. If you've found bugs, have ideas or generally want to
                say hello, please check out our{' '}
                <Link
                    href="https://github.com/fold-ui/fold/discussions"
                    target="_blank"
                    fontSize="inherit">
                    GitHub
                </Link>{' '}
                repository or our{' '}
                <Link
                    href="/docs/faq"
                    fontSize="inherit">
                    FAQ page
                </Link>
                . Below are some links to get you started.
            </Text>
            <Grid
                m="2.5rem 0 0rem 0"
                gap="1rem"
                columns={4}
                className="docs-site__intro-blocks"
                minChildWidth={150}>
                {[
                    {
                        title: 'Getting Started',
                        description: 'Quick guide on getting up and running with Fold.',
                        color: Token.ColorPurple400,
                        icon: PiFlag,
                        slug: 'getting-started',
                    },
                    {
                        title: 'Design System',
                        description: 'Overview of the Design System architecture of Fold.',
                        color: Token.ColorPink400,
                        icon: PiPlanet,
                        slug: 'design-system',
                    },
                    {
                        title: 'Theming',
                        description: 'Customize the current themes, or build your own.',
                        color: Token.ColorOrange400,
                        icon: PiMarkerCircle,
                        slug: 'theming',
                    },
                    {
                        title: 'Tokens',
                        description: 'Reference of the Design Tokens used throughout Fold.',
                        color: Token.ColorBlue300,
                        icon: PiFingerprintSimple,
                        slug: 'tokens',
                    },
                ].map((section, index) => (
                    <Card
                        key={index}
                        column
                        width="none"
                        flex={1}
                        colorToken={section.color}
                        height={250}
                        gap={5}
                        className="f-buttonize-outline"
                        onClick={() => router.push('/docs/' + section.slug)}>
                        <View
                            row
                            width={50}
                            height={50}
                            radius={50}
                            bg={addAlpha(section.color, 0.1)}>
                            <Icon
                                color={section.color}
                                icon={section.icon}
                                size="xl"
                                //style={{ '--f-icon-sizing-md': '50px' }}
                            />
                        </View>
                        <Heading
                            as="h3"
                            textAlign="center"
                            width="100%"
                            colorToken={section.color}>
                            {section.title}
                        </Heading>
                        <Text
                            colorToken="text-weak"
                            textAlign="center"
                            p="0 1rem">
                            {section.description}
                        </Text>
                    </Card>
                ))}
            </Grid>

            <br />

            <Heading as="h2">Contributing</Heading>

            <Heading as="h3">Reporting Bugs</Heading>

            <Text>
                If you've come across a bug or an issue, please don't hesitate to{' '}
                <Link
                    href="https://github.com/fold-ui/fold/issues"
                    target="_blank"
                    fontSize="inherit">
                    open a new issue
                </Link>
                . To make the process as smooth as possible, we've created some issue templates to get you started.
            </Text>

            <Heading as="h3">Sharing Feedback</Heading>

            <Text>
                We'd love to get your feedback, be it suggestions, feature requests, or general thoughts on your
                experience. If you believe that creating a new issue isn't the best choice, don't hesitate to initiate a{' '}
                <Link
                    href="https://github.com/fold-ui/fold/discussions"
                    target="_blank"
                    fontSize="inherit">
                    discussion
                </Link>{' '}
                instead.
            </Text>

            <Heading as="h3">Code of Conduct</Heading>

            <Text>
                Please note that we have a{' '}
                <Link
                    href="https://github.com/fold-ui/fold/blob/main/CODE_OF_CONDUCT.md"
                    target="_blank"
                    fontSize="inherit">
                    Code of Conduct
                </Link>{' '}
                that we expect everyone to follow when participating in this repository. We want to maintain a welcoming
                and inclusive environment for everyone.
            </Text>

            <Heading as="h3">License</Heading>

            <Text>
                This project is licensed under the MIT License - see the{' '}
                <Link
                    href="https://github.com/fold-ui/fold/blob/main/LICENSE"
                    target="_blank"
                    fontSize="inherit">
                    license
                </Link>{' '}
                file for details.
            </Text>

            <Heading as="h3">Support</Heading>

            <Text>
                If you encounter any issues or have questions, feel free to{' '}
                <Link
                    href="https://github.com/fold-ui/fold/issues"
                    target="_blank"
                    fontSize="inherit">
                    open an issue
                </Link>{' '}
                or start a{' '}
                <Link
                    href="https://github.com/fold-ui/fold/discussions"
                    target="_blank"
                    fontSize="inherit">
                    discussion
                </Link>
                .
            </Text>
        </View>
    )
}
