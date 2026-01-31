import DocsLayout from '@/layouts/docs.layout'
import { Breadcrumb, BreadcrumbItem, Heading, IconLib, Link, Text, View, defaultIcons } from '@fold-ui/core'
import { CodeComponent } from '../../components/code.component'
import React, { useMemo } from 'react'
import { Table, TBody, Td, Th, THead, Tr } from '@fold-ui/core'

export default function Icons(props) {
    return (
        <View
            p={30}
            className="docs-content">
            <Breadcrumb>
                <BreadcrumbItem>Documentation</BreadcrumbItem>
                <BreadcrumbItem>Design</BreadcrumbItem>
                <BreadcrumbItem active>Icons</BreadcrumbItem>
            </Breadcrumb>
            <Heading fontWeight="bold">Icons</Heading>
            <Heading as="h2">
                Fold includes a minimal set of icons out of the box, that are easily overridable. This intentional
                design choice allows you the flexibility to seamlessly integrate any React icon set of your choice.
            </Heading>
            <Text>Fold ships with utility methods, giving you the ability to change some or all icons used.</Text>
            <Text as="blockquote">
                The core set of icons are adapted from{' '}
                <Link
                    href="https://heroicons.com/"
                    target="_blank">
                    HeroIcons
                </Link>
                .
            </Text>
            <Heading as="h3">Usage</Heading>
            <Text>
                The <code>{`<IconLib />`}</code> component enables any icon to be used by only referencing the
                identifier. This <i>Icon Library</i> component encapsulates the default <code>{`<Icon />`}</code>{' '}
                component, so that you don't need to worry about hardcoding any icon component.
                <code>{`<IconLib />`}</code> also inherits directly from <code>{`<Icon />`}</code> & supports all of its
                props.
            </Text>
            <Heading as="h3">Building a Library</Heading>
            <Text>
                In numerous instances, the default icons may prove insufficient to address all scenarios in your
                project. Alternatively, there might be a need to replace default icons if they fail to meet the desired
                aesthetic standards.
            </Text>
            <Text>
                Fold simplifies the process of creating your personalized icon library, allowing you to replace or
                incorporate your own icons. The following example demonstrates how you can achieve this.
            </Text>
            <Text as="blockquote">
                Make sure you call the helper methods before including <code>{`<FoldContext />`}</code>.
            </Text>
            <CodeComponent
                minHeight="fit-content"
                code={`
    import React from 'react'
    import { defaultIcons, setFoldIcons } from '@fold-ui/core'
    import { CubeIcon } from '@heroicons/react/24/outline'

    const iconLibrary = {
        ...defaultIcons,
        'super-new-icon': CubeIcon,
    }

    function App() {
        return (
            <FoldProvider>
                My super new icon: <IconLib icon="super-new-icon" />
            </FoldProvider>
        )
    }
                `}
                showSnippet
                dontConvert
                filename="App.tsx"
            />
            <Heading as="h3">Default Icons</Heading>
            <Text>
                Here is a list of default icons shipped with Fold, each accompanied by its respective identifier.
            </Text>
            <View
                row
                wrap="wrap">
                {Object.keys(defaultIcons).map((icon) => (
                    <View
                        column
                        width={100}
                        height={100}
                        gap={10}>
                        <IconLib
                            icon={icon}
                            color="var(--f-color-text)"
                        />
                        <Text
                            size="sm"
                            colorToken="text-weaker">
                            {icon}
                        </Text>
                    </View>
                ))}
            </View>
            <Heading as="h3">Support</Heading>
            <Text>
                If you need any help or support, please visit our{' '}
                <Link
                    href="https://github.com/fold-ui/fold/discussions"
                    target="_blank">
                    community
                </Link>
                .
            </Text>
        </View>
    )
}
