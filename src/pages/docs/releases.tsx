import DocsLayout from '@/layouts/docs.layout'
import {
    Breadcrumb,
    BreadcrumbItem,
    Divider,
    Heading,
    Icon,
    If,
    Link,
    Notification,
    NotificationContent,
    Option,
    Options,
    Pill,
    Progress,
    Stack,
    TBody,
    THead,
    Table,
    Td,
    Text,
    Th,
    Tr,
    View,
} from '@fold-ui/core'
import { NextPageContext } from 'next'
import * as Token from '@fold-ui/design/tokens'
import { Octokit } from 'octokit'
import React, { useEffect, useState } from 'react'
import { PiGithubLogo, PiTag, PiTagDuotone } from 'react-icons/pi'
import { remark } from 'remark'
import html from 'remark-html'

function convertUrlsToLinks(text) {
    const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(urlPattern, '<a href="$1" target="_blank">$1</a>');
}

async function markdownToHtml(markdown: string) {
    const result = await remark().use(html).process(markdown)
    return result.toString()
}

export const ReleaseNote = ({ markdown, core, pro }) => {
    const [html, setHtml] = useState('')

    const generateHtml = async () => {
        const md = markdown
            .split('\n')
            .map((line) => {
                return line.split(' by @')[0]
            })
            .filter((line) => {
                if (pro && line.includes('Full Changelog')) {
                    return false 
                } else {
                    return true
                }
            })
            .join('\n')
        const html = await markdownToHtml(md)
        setHtml(convertUrlsToLinks(html))
    }

    useEffect(() => {
        generateHtml()
    }, [])
    
    return (
        <div className="f-text" dangerouslySetInnerHTML={{ __html: html }} />
    )
} 

export default function Releases(props) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [releases, setReleases] = useState([])
    const [option, setOption] = useState(0)

    const getProReleases = async () => {
        setLoading(true)
        setError(false)

        try {
            const response = await fetch('/api/releases?repo=pro')
            const res = await response.json()
            const { results } = res

            setReleases(results)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            setError(true)
        }
    }

    const getCoreReleases = async () => {
        setLoading(true)
        setError(false)

        try {
            const response = await fetch('/api/releases?repo=fold')
            const res = await response.json()
            const { results } = res

            setReleases(results)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            setError(true)
        }
    }

    useEffect(() => {
        if (option == 0) {
            getCoreReleases()
        } else {
            getProReleases()
        }
    }, [option])

    return (
        <View
            p={30}
            className="docs-content releases-content">
            <Breadcrumb>
                <BreadcrumbItem>Documentation</BreadcrumbItem>
                <BreadcrumbItem active>Releases</BreadcrumbItem>
            </Breadcrumb>
            <Heading fontWeight="bold">Releases</Heading>
            <Heading as="h2">Below is a list of all Fold releases.</Heading>
            <Divider />

            <If if={error}>
                <Notification
                    variant="danger"
                    leftAccent>
                    <NotificationContent>
                        <Text fontWeight="bold">Whoops, something has gone wrong.</Text>
                    </NotificationContent>
                </Notification>
            </If>

            <If if={loading}>
                <Progress
                    variant="accent"
                    value={50}
                    thickness={3}
                    indeterminate
                    bgToken="transparent"
                    position="absolute"
                    width="100%"
                    zIndex={1000}
                    style={{
                        inset: 0,
                    }}
                />
            </If>
            {/* 
            <Options
                m="2rem 0"
                selected={option}
                onOptionChange={setOption}>
                <Option>Core</Option>
                <Option>Pro</Option>
            </Options>
            */}
            {!loading && (
                <>
                    {releases.map(({ html_url, tag_name, published_at, body }, index) => (
                        <div key={index}>
                            <View 
                                column
                                gap="0.5rem"
                                m="1rem 0"
                                p="0.5rem 0"
                                alignItems="flex-start">
                                <Heading>
                                    {tag_name}
                                </Heading>
                                <Text 
                                    size="sm" 
                                    colorToken="text-weaker"
                                    fontWeight={600}>
                                    {new Date(published_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </Text>
                                <div style={{ lineHeight: '3rem' }}>
                                    <ReleaseNote 
                                        markdown={body} 
                                        core={option == 0}
                                        pro={option == 1}
                                    />
                                </div>
                                {option == 0 && (
                                    <Link 
                                        href={html_url}
                                        target="_blank">
                                        <Pill
                                            p="0"
                                            subtle
                                            height={30}
                                            width={30}
                                            className="f-buttonize-outline"
                                            color={Token.ColorAccent400}>
                                            <Icon icon={PiGithubLogo} />
                                        </Pill>
                                    </Link>
                                )}
                            </View>
                            <Divider />
                        </div>
                    ))}
                </>
            )}

            {(!releases.length && !loading) && <Text as="blockquote">There are no releases here (yet).</Text>}
        </View>
    )
}
