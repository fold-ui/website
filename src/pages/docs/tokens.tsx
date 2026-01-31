import DocsLayout from '@/layouts/docs.layout'
import {
    Text,
    Progress,
    Heading,
    View,
    Card,
    Icon,
    Palette,
    Link,
    Breadcrumb,
    BreadcrumbItem,
    Stack,
} from '@fold-ui/core'
import { LifebuoyIcon } from '@heroicons/react/24/outline'
import React, { useMemo } from 'react'
import { useTokens } from './design-system'
import { convertTokenToTitle } from './design-system'
import CodeComponent from '../../components/code.component'

export default function Tokens(props) {
    const { system } = useTokens()
    const {
        blur,
        color,
        fontSize,
        fontWeight,
        font,
        iconSize,
        index,
        letterSpacing,
        lineHeight,
        radius,
        shadow,
        size,
        space,
        transition,
    } = useMemo(() => {
        const blur: any = []
        const color: any = []
        const fontSize: any = []
        const fontWeight: any = []
        const font: any = []
        const iconSize: any = []
        const index: any = []
        const letterSpacing: any = []
        const lineHeight: any = []
        const radius: any = []
        const shadow: any = []
        const size: any = []
        const space: any = []
        const transition: any = []

        system.map((rule) => {
            if (rule[0].includes('-f-blur-')) blur.push(rule)
            if (rule[0].includes('-f-color-')) {
                if (!rule[0].includes('palette') && !rule[0].includes('picker')) color.push(rule)
            }
            if (rule[0].includes('-f-font-size-')) fontSize.push(rule)
            if (rule[0].includes('-f-font-weight-')) fontWeight.push(rule)
            if (rule[0].includes('-f-font-')) font.push(rule)
            if (rule[0].includes('-f-icon-size-')) iconSize.push(rule)
            if (rule[0].includes('-f-index-')) index.push(rule)
            if (rule[0].includes('-f-letter-spacing-')) letterSpacing.push(rule)
            if (rule[0].includes('-f-line-height-')) lineHeight.push(rule)
            if (rule[0].includes('-f-radius-')) radius.push(rule)
            if (rule[0].includes('-f-shadow-')) shadow.push(rule)
            if (rule[0].includes('-f-size-')) size.push(rule)
            if (rule[0].includes('-f-space-')) space.push(rule)
            if (rule[0].includes('-f-transition-')) transition.push(rule)
        })

        return {
            blur,
            color,
            fontSize,
            fontWeight,
            font,
            iconSize,
            index,
            letterSpacing,
            lineHeight,
            radius,
            shadow,
            size,
            space,
            transition,
        }
    }, [system])

    return (
        <View
            p={30}
            className="docs-content">
            <Breadcrumb>
                <BreadcrumbItem>Documentation</BreadcrumbItem>
                <BreadcrumbItem>Design</BreadcrumbItem>
                <BreadcrumbItem active>Tokens</BreadcrumbItem>
            </Breadcrumb>
            <Heading fontWeight="bold">Tokens</Heading>
            <Heading as="h2">
                Below is a list of the most common Design Tokens, along with their values and examples. Each of these
                tokens are available to your project and ready to be used by referencing them as CSS variables.
            </Heading>
            <Text>In addition to CSS variables, tokens can also be consumed as a NodeJS module or named ES6 modules:</Text>
            <CodeComponent
                showSnippet
                dontConvert
                lang="typescript"
                filename="App.tsx"
                code={` 
    // NodeJS module
    import * as Token from '@fold-ui/design/tokens'

    // ES6 modules
    import { ColorBlue400 } from '@fold-ui/design/tokens-es6'    
                `}
            />
            <Text as="blockquote">
                The provided list is not exhaustive, but encompasses the tokens most commonly used. You can locate all
                the tokens in our repository on{' '}
                <Link href="https://github.com/fold-ui/fold/tree/main/packages/design/tokens" target="_blank">Github</Link>.
            </Text>
            <Heading
                as="h3"
                m="0 0 1rem 0">
                Color
            </Heading>
            {color.map((key, index) => (
                <View
                    row
                    width="100%"
                    key={index}
                    gap={10}>
                    <Text
                        as="code"
                        flex={2}>
                        {key[0]}
                    </Text>
                    <Text
                        as="code"
                        colorToken="text-weakest">
                        {key[1]}
                    </Text>
                    <Palette
                        colors={[key[1]]}
                        color=""
                    />
                </View>
            ))}

            <Heading
                as="h3"
                m="2rem 0 1rem 0">
                Font Weight
            </Heading>
            {fontWeight.map((key, index) => (
                <View
                    row
                    key={index}
                    gap={10}>
                    <Text
                        as="code"
                        flex={2}>
                        {key[0]}
                    </Text>
                    <Text
                        as="code"
                        colorToken="text-weakest">
                        {key[1]}
                    </Text>
                    <Text fontWeight={key[1]}>{convertTokenToTitle(key[0])}</Text>
                </View>
            ))}

            <Heading
                as="h3"
                m="2rem 0 1rem 0">
                Font Size
            </Heading>
            {fontSize.map((key, index) => (
                <View
                    row
                    key={index}
                    gap={10}>
                    <Text
                        as="code"
                        flex={2}>
                        {key[0]}
                    </Text>
                    <Text
                        as="code"
                        colorToken="text-weakest">
                        {key[1]}
                    </Text>
                    <Text fontSize={key[1]}>{convertTokenToTitle(key[0])}</Text>
                </View>
            ))}

            <Heading
                as="h3"
                m="2rem 0 1rem 0">
                Radius
            </Heading>
            <Stack
                direction="vertical"
                spacing={5}>
                {radius.map((key, index) => (
                    <View
                        row
                        width="100%"
                        key={index}
                        gap={10}>
                        <Text
                            as="code"
                            flex={2}>
                            {key[0]}
                        </Text>
                        <Text
                            as="code"
                            colorToken="text-weakest">
                            {key[1]}
                        </Text>
                        <View
                            radius={key[1]}
                            p={10}
                            bgToken="surface-strong">
                            <Text>{convertTokenToTitle(key[0])}</Text>
                        </View>
                    </View>
                ))}
            </Stack>

            <Heading
                as="h3"
                m="2rem 0 1rem 0">
                Shadow
            </Heading>
            <Stack
                direction="vertical"
                spacing={5}>
                {shadow.map((key, index) => (
                    <View
                        row
                        key={index}
                        gap={10}>
                        <Text
                            as="code"
                            flex={2}
                            style={{ whiteSpace: 'nowrap' }}>
                            {key[0]}
                        </Text>
                        <Text
                            as="code"
                            colorToken="text-weakest">
                            {key[1]}
                        </Text>
                        <View
                            shadow={key[1]}
                            p={10}
                            bgToken="surface-strong">
                            <Text>{convertTokenToTitle(key[0])}</Text>
                        </View>
                    </View>
                ))}
            </Stack>

            <Heading
                as="h3"
                m="2rem 0 1rem 0">
                Size
            </Heading>
            <Stack
                direction="vertical"
                spacing={5}>
                {size.map((key, index) => (
                    <View
                        row
                        key={index}
                        gap={10}>
                        <Text
                            as="code"
                            flex={2}>
                            {key[0]}
                        </Text>
                        <Text
                            as="code"
                            colorToken="text-weakest">
                            {key[1]}
                        </Text>
                        <Text as="code">{convertTokenToTitle(key[0])}</Text>
                    </View>
                ))}
            </Stack>

            <Heading
                as="h3"
                m="2rem 0 1rem 0">
                Space
            </Heading>
            <Stack
                direction="vertical"
                spacing={5}>
                {space.map((key, index) => (
                    <View
                        row
                        key={index}
                        gap={10}>
                        <Text
                            as="code"
                            flex={2}>
                            {key[0]}
                        </Text>
                        <Text
                            as="code"
                            colorToken="text-weakest">
                            {key[1]}
                        </Text>
                        <View
                            p={key[1]}
                            bgToken="surface-strong">
                            <Text>{convertTokenToTitle(key[0])}</Text>
                        </View>
                    </View>
                ))}
            </Stack>
        </View>
    )
}
