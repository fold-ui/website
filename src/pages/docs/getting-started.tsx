import DocsLayout from '@/layouts/docs.layout'
import { Breadcrumb, BreadcrumbItem, Heading, Link, Text, View } from '@fold-ui/core'
import { CodeComponent } from '../../components/code.component'
import React from 'react'

export default function GettingStarted(props) {
    return (
        <View
            p={30}
            className="docs-content">
            <Breadcrumb>
                <BreadcrumbItem>Documentation</BreadcrumbItem>
                <BreadcrumbItem>Overview</BreadcrumbItem>
                <BreadcrumbItem active>Getting Started</BreadcrumbItem>
            </Breadcrumb>
            <Heading fontWeight="bold">Getting Started</Heading>
            <Heading as="h2">Get started with Fold, the UI component library for product teams.</Heading>
            <Text>
                Welcome to Fold, a collection of reusable React components that will help you build beautiful and
                functional user interfaces. This guide will walk you through the steps to get started with our library
                so that you can quickly integrate these components into your projects.
            </Text>
            <Text as="blockquote">Fold has been developed using React v18.2</Text>
            <Heading as="h3">Installation</Heading>
            <Text>
                To begin using Fold, you'll need to install it in your project. You can do this via npm or Yarn:
            </Text>
            <CodeComponent
                showSnippet
                dontConvert
                lang="bash"
                filename="console"
                code={`
    # Using npm
    npm install @fold-ui/core

    # Using yarn
    yarn add @fold-ui/core
                `}
            />
            <Heading as="h3">Setup</Heading>
            <Text>
                Once the library is installed, you'll need to include the CSS stylesheet & React Context Provider.
            </Text>
            <Heading as="h4">CSS</Heading>
            <Text>
                Add the stylesheet to the root level of your project. If you're utilizing SASS, Less, or another CSS
                preprocessor, you can also import it directly.
            </Text>
            <CodeComponent
                code={`
    import '@fold-ui/core/dist/styles.css'
                `}
                showSnippet
                dontConvert
                filename="App.tsx"
            />
            <Heading as="h4">Context Provider</Heading>
            <Text>
                Include <code>FoldProvider</code> in the root if your app.
            </Text>
            <CodeComponent
                code={`
    import React from 'react'
    import { FoldProvider } from '@fold-ui/core'

    function App() {
        return (
            <FoldProvider>
                <YourApp />
            </FoldProvider>
        )
    }
                `}
                showSnippet
                dontConvert
                filename="App.tsx"
            />

            <Heading as="h3">Done</Heading>
            <Text>
                You're now ready to start building with Fold. Here's an example of how to use one of our components:
            </Text>

            <CodeComponent
                code={`
    import React from 'react'
    import { FoldProvider } from '@fold-ui/core'

    function MyComponent() {
        return (
            <View>
                <Heading>Hello Fold!</Heading>
                <Button label="Click me" onClick={() => alert('Button clicked!')} />
            </View>
        )
    }
                `}
                showSnippet
                dontConvert
                filename="App.tsx"
            />
            <br />
            <Heading as="h3">Build Targets</Heading>
            <Text>
                Fold has been crafted using TypeScript and exported to es2015 as a target. If you have preferences for
                an alternative compilation target,{' '}
                <Link
                    href="https://github.com/fold-ui/fold/discussions"
                    target="_blank">
                    let us know
                </Link>
                . We aim to cater to as many users as possible to facilitate the use of Fold in their projects.
            </Text>
        </View>
    )
}
