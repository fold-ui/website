import React, { useEffect, useState } from 'react'
import { Html, Head, Main, NextScript } from 'next/document'
import { useCacheValue } from '@fold-dev/core'

export default function Document() {
    const { isCached, getSafeCache, setCache } = useCacheValue('cookies')
    const [showChild, setShowChild] = useState(false)

    useEffect(() => {
        setShowChild(true)
    }, [])

    return (
        <Html lang="en">
            <Head>
                <meta charSet="UTF-8" />

                <meta
                    httpEquiv="X-UA-Compatible"
                    content="IE=edge, IE=11, IE=10"
                />
                {/* <meta
                    name="robots"
                    content="noindex,follow"
                /> */}
                <meta
                    name="description"
                    content="Powerful, fully customizable React components for scaling your project to the next level. Supercharge your dev workflow by using Fold's zero-dependency UI components."
                />

                <script src="https://assets.lemonsqueezy.com/lemon.js" defer></script>
                <script src="https://cdn.paddle.com/paddle/v2/paddle.js"></script>

                <link
                    rel="icon"
                    type="image/png"
                    href="/favicon.png"
                />

                <meta property="og:title" content="Fold" />
                <meta property="og:url" content="https://fold.dev" />
                <meta property="og:image" content="https://fold.dev/og.png" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="1280" />
                <meta property="og:image:height" content="630" />
                <meta property="og:description" content="Powerful, fully customizable React components for scaling your project to the next level. Supercharge your dev workflow by using Fold's zero-dependency UI components." />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
