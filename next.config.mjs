import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'
import rehypePrettyCode from 'rehype-pretty-code'

const withMDX = createMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [
            /* [remarkGfm] */
        ],
        rehypePlugins: [
            [
                rehypePrettyCode,
                {
                    theme: 'one-dark-pro',
                },
            ],
        ],
        providerImportSource: '@mdx-js/react',
    },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    reactStrictMode: true,
    transpilePackages: ['@fold-ui/design/tokens-es6','@fold-pro/react'],
}

export default withMDX(nextConfig)
