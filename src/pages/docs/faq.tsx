import DocsLayout from '@/layouts/docs.layout'
import {
    Text,
    Progress,
    Heading,
    View,
    Card,
    Icon,
    Link,
    Accordion,
    AccordionItem,
    AccordionHeading,
    AccordionPanel,
    Breadcrumb,
    BreadcrumbItem,
} from '@fold-ui/core'
import { LifebuoyIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function Faq(props) {
    return (
        <View
            p={30}
            className="docs-content">
            <Breadcrumb>
                <BreadcrumbItem>Documentation</BreadcrumbItem>
                <BreadcrumbItem>Overview</BreadcrumbItem>
                <BreadcrumbItem active>FAQ</BreadcrumbItem>
            </Breadcrumb>
            <Heading fontWeight="bold">FAQ</Heading>
            <Heading as="h2">Frequently asked questions.</Heading>
            <Text as="blockquote">
                This list is not exhaustive and will expand to include other frequently asked questions. If your
                specific question has not been addressed or if you require additional information, please feel free to
                reach out to us at our{' '}
                <Link
                    href="https://github.com/fold-ui/fold/discussions"
                    target="_blank">
                    GitHub
                </Link>{' '}
                repository.
            </Text>
            <Accordion>
                <AccordionItem>
                    <AccordionHeading>Are there really no dependencies?</AccordionHeading>
                    <AccordionPanel>
                        None. The sole dependencies are React and ReactDOM, and of course any additional libraries you
                        integrate into your project.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeading>Does Fold use CSS-in-JS?</AccordionHeading>
                    <AccordionPanel>
                        No. Fold utilizes pure CSS, compiled at build time, to tailor the appearance of components and
                        provides helper classes for added customization.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeading>Are there other runtime targets available?</AccordionHeading>
                    <AccordionPanel>
                        Currently, only ES6 Modules are supported. However, we are actively seeking feedback on how we
                        can accommodate a broader range of users. Please let us on know at our{' '}
                        <Link
                            href="https://github.com/fold-ui/fold/discussions"
                            target="_blank"
                            fontSize="inherit">
                            repository
                        </Link>{' '}
                        on GitHub.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeading>Where can I file bugs or feature requests?</AccordionHeading>
                    <AccordionPanel>
                        Please visit at our{' '}
                        <Link
                            href="https://github.com/fold-ui/fold"
                            target="_blank"
                            fontSize="inherit">
                            repository
                        </Link>{' '}
                        on GitHub.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeading>Are there plans to support other frameworks like Svelte or Vue?</AccordionHeading>
                    <AccordionPanel>Not yet.</AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeading>Can I use this for production?</AccordionHeading>
                    <AccordionPanel>
                        Certainly, however Fold is currently in its alpha stage. Nevertheless, you have the option to
                        use it in a production environment if you wish.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeading>Can I contribute?</AccordionHeading>
                    <AccordionPanel>
                        Absolutely! Please visit at our{' '}
                        <Link
                            href="https://github.com/fold-ui/fold"
                            target="_blank"
                            fontSize="inherit">
                            repository
                        </Link>{' '}
                        on GitHub to find out how.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeading>Is there a premium support package available?</AccordionHeading>
                    <AccordionPanel>Not yet.</AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeading>What are the future plans for Fold?</AccordionHeading>
                    <AccordionPanel>
                        Please see our{' '}
                        <Link
                            href="https://github.com/orgs/fold-ui/projects/8"
                            target="_blank"
                            fontSize="inherit">
                            Roadmap
                        </Link>{' '}
                        for upcoming development.
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </View>
    )
}
