import {
    Breadcrumb,
    BreadcrumbItem,
    Divider,
    Heading,
    IconLib,
    Link,
    LogoSolid,
    Notification,
    NotificationContent,
    NotificationIcon,
    Stack,
    Tab,
    Table,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    TBody,
    Td,
    Text,
    Th,
    THead,
    Tr,
    View,
} from '@fold-ui/core'
import { useEffect, useMemo, useState } from 'react'
import React from 'react'
import DocsLayout from './docs.layout'
import { useRouter } from 'next/navigation'
import * as Token from '@fold-ui/design/tokens'

export default function ComponentLayout({ children, docs, props, css }) {
    const [showChild, setShowChild] = useState(false)
    const [selected, setSelected] = useState<any>(0)
    const hasCss = useMemo(() => !!css.length, [css])
    const hasProps = useMemo(() => !!props.length, [props])
    const router = useRouter()

    useEffect(() => {
        setShowChild(true)
    }, [])

    if (!showChild) return null

    return (
        <View className="styled-content">
            <View className="styled-content" bgToken="surface" p="0 0 1rem 0">
                <View p="30px 30px 0 30px">
                    <Breadcrumb>
                        <BreadcrumbItem>Documentation</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem active>{docs.title}</BreadcrumbItem>
                    </Breadcrumb>
                </View>
                <Heading
                    fontWeight="bold"
                    p="0px 30px">
                    {docs.title}
                </Heading>
                <Heading
                    as="h2"
                    p="0 30px">
                    {docs.subtitle}
                </Heading>
                <Text
                    p="0 30px"
                    size="lg"
                    fontWeight={400}>
                    {docs.description}
                </Text>
                {docs.pro && (
                    <Notification
                        variant="highlight"
                        m="0 30px">
                        <NotificationIcon>
                            <LogoSolid color={Token.ColorPurple400} size="sm" />
                        </NotificationIcon>
                        <NotificationContent>
                            More documentation & examples coming very soon.
                            If you are a Fold Pro customer and need help implementing this component, 
                            please email us at <a href="mailto:support@fold.dev">support</a> or leave a message 
                            on the <a href="https://groups.google.com/a/fold-ui.com/g/pro" target="_blank">Fold Pro Google Group</a>.
                        </NotificationContent>
                    </Notification>
                )}
                {docs.experimental && (
                    <Notification
                        variant="warning"
                        m="0 30px">
                        <NotificationIcon>
                            <IconLib icon="warning" />
                        </NotificationIcon>
                        <NotificationContent>This component is currently in beta.</NotificationContent>
                    </Notification>
                )}
            </View>
            <View
                bgToken="surface"
                width="100%">
                <Tabs
                    animated
                    selected={selected}
                    onSelect={setSelected}
                    width="100%">
                    <TabList
                        width="100%"
                        p="0 30px">
                        <Tab>Usage</Tab>
                        <Tab>Props</Tab>
                        <Tab>CSS Variables</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel
                            bgToken="surface-strong"
                            p={30}>
                            <View
                                width="100%"
                                className="docs-content">
                                {children}
                            </View>
                        </TabPanel>
                        <TabPanel>
                            <View
                                column
                                alignItems="flex-start"
                                width="100%">
                                {!docs.pro && (
                                    <Notification
                                        leftAccent
                                        width="100%">
                                        <NotificationContent>
                                            We are actively improving the documentation. For more information on prop
                                            types,{' '}
                                            <Link
                                                href="https://fold-ui.github.io/fold/"
                                                target="_blank">
                                                see our TypeDocs
                                            </Link>
                                            .
                                        </NotificationContent>
                                    </Notification>
                                )}

                                {docs.pro && (
                                    <Notification
                                        leftAccent
                                        variant="danger"
                                        width="100%">
                                        <NotificationContent>
                                            More prop information coming soon! We are currently improving the Pro documentation. For more information on prop
                                            types,{' '}
                                            <Link
                                                href="https://fold-ui.github.io/pro/"
                                                target="_blank">
                                                see our TypeDocs for Pro
                                            </Link>
                                            .
                                        </NotificationContent>
                                    </Notification>
                                )}
                                <Stack
                                    m="10px 0 0 0"
                                    direction="vertical"
                                    spacing={10}
                                    width="100%">
                                    {props.map(({ description, displayName, props }, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <Heading>{displayName}</Heading>
                                                <Table>
                                                    <THead>
                                                        <Tr>
                                                            <Th>Prop name</Th>
                                                            <Th>Type</Th>
                                                            <Th>Default value</Th>
                                                            <Th>Description</Th>
                                                            <Th>Required</Th>
                                                        </Tr>
                                                    </THead>
                                                    <TBody>
                                                        {!Object.keys(props).length && (
                                                            <Tr>
                                                                <Td colspan={5}>
                                                                    <Text p={20}>There are no props available.</Text>
                                                                </Td>
                                                            </Tr>
                                                        )}
                                                        {Object.keys(props).map((key, index) => {
                                                            const { description, name, required, type, tags } =
                                                                props[key]

                                                            return (
                                                                <Tr key={index}>
                                                                    <Td>{name}</Td>
                                                                    <Td>{type.name}</Td>
                                                                    <Td>{tags.defaultValue || 'Not available'}</Td>
                                                                    <Td>{description || 'Not available'}</Td>
                                                                    <Td>{required ? 'yes' : 'no'}</Td>
                                                                </Tr>
                                                            )
                                                        })}
                                                    </TBody>
                                                </Table>
                                            </React.Fragment>
                                        )
                                    })}
                                    {!hasProps && <Text p={20}>There are no props available.</Text>}
                                </Stack>
                            </View>
                        </TabPanel>
                        <TabPanel>
                            <View
                                column
                                alignItems="flex-start"
                                width="100%">
                                <Notification
                                    leftAccent
                                    width="100%">
                                    <NotificationContent>
                                        For more information about the Fold Design System,{' '}
                                        <Link href="/docs/design-system">see our guide</Link>.
                                    </NotificationContent>
                                </Notification>
                                <Stack
                                    m="10px 0 0 0"
                                    direction="vertical"
                                    spacing={10}
                                    width="100%">
                                    {hasCss && (
                                        <Table>
                                            <THead>
                                                <Tr>
                                                    <Th>Variable name</Th>
                                                    <Th>Default value</Th>
                                                </Tr>
                                            </THead>
                                            <TBody>
                                                {css.map((set) =>
                                                    set.map((property, index) => (
                                                        <Tr key={index}>
                                                            <Td>
                                                                <code>{property[0]}</code>
                                                            </Td>
                                                            <Td>
                                                                <code>{property[1]}</code>
                                                            </Td>
                                                        </Tr>
                                                    ))
                                                )}
                                            </TBody>
                                        </Table>
                                    )}
                                    {!hasCss && <Text p={20}>There are no CSS variables available.</Text>}
                                </Stack>
                            </View>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                <Divider />
            </View>
        </View>
    )
}
