import React, { useMemo } from 'react'
import BlogLayout from '@/layouts/blog.layout'
import { useRouter } from 'next/navigation'
import { articles } from '../../blog'
import * as Token from '@fold-ui/design/tokens'
import { Card, Heading, Image, Link, Pill, Stack, Text, View } from '@fold-ui/core'
import { HeaderComponent } from '@/components/header.component'
import { ContentContainerComponent } from '@/components/content-container.component'

export default function Blog({ children }) {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    return (
        <>
            <HeaderComponent 
                title="Articles"
                subtitle="Blog"
            />

            <ContentContainerComponent>
                <Text>coming soon</Text>
                {/* {articles.map((article: any, index: number) => (
                    <Stack
                        direction="vertical"
                        spacing="0.5rem">
                        <Heading
                            as="h2"
                            p={0}
                            m={0}>
                            {article.title}
                        </Heading>
                        <View 
                            row
                            justifyContent="flex-start">
                            <Text
                                colorToken="text-weaker"
                                p={0}
                                m={0}>
                                {article.author} on {formatDate(article.date)}
                            </Text>
                        </View>
                        <Text
                            p={0}
                            m={0}>
                            {article.summary}
                        </Text>
                        <Link
                            p={0}
                            m={0} 
                            textDecoration="none"
                            href={'/blog/' + article.slug}>
                            Continue reading ↗
                        </Link>
                    </Stack>
                ))} */}
            </ContentContainerComponent>
        </>
    )
}
