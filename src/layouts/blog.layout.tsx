import { HeaderComponent } from '@/components/header.component'
import { Heading, Notification, NotificationContent, View } from '@fold-ui/core'
import { useEffect, useMemo, useState } from 'react'
import { articles } from '../blog'
import { ContentContainerComponent } from '@/components/content-container.component'

export default function BlogLayout(props: any) {
    const { children } = props
    const [showChild, setShowChild] = useState(false)
    const { slug, title, summary, date, author } = useMemo(() => {
        const parts = window.location.pathname.split('/')
        const lastPart = parts[parts.length - 1]
        const { slug, title, summary, date, author } = articles.find(
            (article) => article.slug == lastPart
        )

        return { 
            slug, 
            title, 
            summary, 
            author, 
            date: new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }),             
        }
    }, [])
   
    useEffect(() => {
        setShowChild(true)
    }, [])

    if (!showChild) return null

    return (
        <>
            <HeaderComponent 
                title={title}
                subtitle="Blog"
                description={author}
            />

            <ContentContainerComponent>
                <Notification variant="highlight">
                    <NotificationContent>Whoa, this is placeholder content.</NotificationContent>
                </Notification>
                {children}
            </ContentContainerComponent>
        </>
    )
}
