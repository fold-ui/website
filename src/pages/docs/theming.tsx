import DocsLayout from '@/layouts/docs.layout'
import {
    Breadcrumb,
    BreadcrumbItem,
    Heading,
    IconLib,
    Li,
    Link,
    List,
    Notification,
    NotificationContent,
    NotificationIcon,
    Text,
    View,
} from '@fold-ui/core'
import { CodeComponent } from '../../components/code.component'
import React from 'react'

export default function Theming(props) {
    return (
        <View
            p={30}
            className="docs-content">
            <Breadcrumb>
                <BreadcrumbItem>Documentation</BreadcrumbItem>
                <BreadcrumbItem>Design</BreadcrumbItem>
                <BreadcrumbItem active>Theming</BreadcrumbItem>
            </Breadcrumb>
            <Heading fontWeight="bold">Theming</Heading>
            <Heading as="h2">Create your own theme or customize an existing theme.</Heading>
            <Text>
                Fold uses design tokens & utility methods to manage the overall theme of your project. It's important to
                note that your project needs to have the <code>{`<FoldProvider />`}</code> already set up. To find out
                how to do this, please see the{' '}
                <Link
                    href="/docs/getting-started"
                    fontSize="inherit">
                    Getting Started
                </Link>{' '}
                guide.
            </Text>
            <Heading as="h3">Design Tokens</Heading>
            <Notification
                variant="highlight"
                leftAccent>
                <NotificationIcon>
                    <IconLib icon="info" />
                </NotificationIcon>
                <NotificationContent>
                    <Heading
                        as="h5"
                        m="0 0 0.5rem 0"
                        fontWeight="bold">
                        What are Design Tokens?
                    </Heading>
                    <Text lineHeight={1.5}>
                        Design tokens are a way of abstracting and organizing design decisions in a systematic and
                        consistent manner. They are a set of variables or constants that store visual design attributes
                        such as colors, typography, spacing, and other styles. Design tokens help maintain design
                        consistency across different platforms, devices, and components in a scalable and maintainable
                        way.
                    </Text>
                </NotificationContent>
            </Notification>
            <Text>
                Fold's design tokens are managed with <code>@fold-ui/design</code>, a package located im{' '}
                <Link
                    href="https://github.com/fold-ui/fold/packages/design"
                    target="_blank">
                    GitHub
                </Link>
                . Follow the README guide on GitHub to get up and running with the project.
            </Text>
            <Text>Below you will find a quick snippet to get your started:</Text>
            <CodeComponent
                showSnippet
                dontConvert
                lang="bash"
                filename="console"
                code={` 
    git clone https://github.com/fold-ui/fold.git
    cd fold
    npm install
    cd packages/design
    npm run build
                `}
            />
            <Text as="blockquote">
                Fold Design uses Style Dictionary to build tokens. For more information about this, please see their{' '}
                <Link href="https://amzn.github.io/style-dictionary">website</Link>.
            </Text>
            <Heading as="h3">System Themes</Heading>
            <Text>
                Fold already ships with a default <i>light</i> & <i>dark</i> mode - these styles are included in CSS
                stylesheet of Fold by default. To customise the existing <i>light</i> & <i>dark</i> mode theme, these
                values need to be overrided by adding custom CSS variables:
            </Text>
            <List
                as="ul"
                type="circle">
                <Li>
                    Navigate to <code>tokens/themes</code> file inside the newly set up <code>design</code> repo.
                </Li>
                <Li>
                    Open the <code>light.json</code> or <code>dark.json</code> file in your favourite JSON editor.
                </Li>
                <Li>Update the color values that you want to change.</Li>
                <Li>
                    Build the theme file by running <code>npm run build</code>.
                </Li>
                <Li>
                    This will output <i>light</i> & <i>dark</i> mode CSS files.
                </Li>
                <Li>Include the updated theme file below the Fold CSS include:</Li>
            </List>
            <CodeComponent
                showSnippet
                dontConvert
                filename="App.tsx"
                code={` 
    import '@fold-ui/core/dist/styles.css'
    import '../path/to/new/tokens-light.css'
    import '../path/to/new/tokens-dark.css'
                `}
            />
            <Text>You can repeat this process customizing the System Design Tokens.</Text>
            <Heading as="h3">Custom Theme</Heading>
            <Text>
                Many times you want a project to support multiple themes. Fold enables you to roll your own theme and
                use helper methods to activate it.
            </Text>
            <Heading as="h4">Create the Design Tokens</Heading>
            <Text>Creating your own theme as simple as:</Text>
            <List
                as="ul"
                type="circle">
                <Li>
                    Navigate to <code>tokens/themes</code> file inside the newly set up <code>design</code> repo.
                </Li>
                <Li>
                    Duplicate the <code>light.json</code> or <code>dark.json</code> file (call it something unique & no
                    spaces are allowed).
                </Li>
                <Li>Update the color values.</Li>
                <Li>
                    Build the new theme file by running <code>npm run build</code>.
                </Li>
                <Li>This will output a new CSS file with your chosen name.</Li>
                <Li>Include the new theme file below the Fold CSS include:</Li>
            </List>
            <CodeComponent
                showSnippet
                dontConvert
                filename="App.tsx"
                code={` 
    import '@fold-ui/core/dist/styles.css'
    import '../path/to/new/tokens-mytheme.css'
                `}
            />
            <Heading as="h4">Use the Design Tokens</Heading>
            <Text>You can now use Fold's helper methods to activate your new theme.</Text>
            <CodeComponent
                code={`
    import React from 'react'
    import { useTheme } from '@fold-ui/core'

    function App() {
        const { setTheme, getSystemTheme, getStoredTheme } = useTheme()

        useLayoutEffect(() => {
            // get the default theme
            const theme = getStoredTheme() || getSystemTheme()
            // use your new theme, by name
            const newTheme = 'mytheme'
            // activate your theme
            // this method will also store the theme
            // so next time getStoredTheme() will return this theme
            setTheme(theme)
        }, [])

        return (
            <YourApp>
                <YourApp />
            </YourApp>
        )
    }
                `}
                showSnippet
                dontConvert
                filename="App.tsx"
            />
            <Heading as="h3">Support</Heading>
            <Text>
                We are actively improving these docs, so if you encounter any issues or have questions related to
                creating themes, feel free to contact us or leave a comment on{' '}
                <Link
                    href="https://github.com/fold-ui/fold/discussions"
                    target="_blank">
                    GitHub
                </Link>
                . We are here to assist you in achieving the best design and user experience for your application.
            </Text>
        </View>
    )
}
