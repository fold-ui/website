import {
    Button,
    FISearch,
    Flexer,
    Header,
    Heading,
    Icon,
    Input,
    InputControl,
    InputSuffix,
    Menu,
    MenuItem,
    Pill,
    Popover,
    Stack,
    Text,
    View,
    getKey,
    useEvent,
    useVisibility,
} from '@fold-ui/core'
import * as Token from '@fold-ui/design/tokens'
import {
    ChatBubbleBottomCenterIcon,
    ChatBubbleLeftEllipsisIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    CircleStackIcon,
    CubeIcon,
    HashtagIcon,
    UserIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { PiCubeDuotone } from 'react-icons/pi'

export const plural = (qty, str) => (qty == 1 ? str : str + 's')

const SearchRow = ({ title, description, resource, type, selected, onSelect }) => {
    const [over, setOver] = useState(false)
    const icon = useMemo(() => {
        switch (type) {
            // room for others (eventually)
            default:
                return PiCubeDuotone
        }
    }, [type])

    return (
        <View
            row
            p="0.5rem 1rem"
            gap={10}
            width="100%"
            colorToken="text-weaker"
            justifyContent="center"
            alignContent="center"
            alignItems="center"
            bgToken={selected || over ? 'surface-strong' : undefined}
            onMouseEnter={() => setOver(true)}
            onMouseLeave={() => setOver(false)}
            onClick={onSelect}
            className="f-buttonize">
            <Icon icon={icon} />
            <Text
                width={100}
                display="block">
                {title}
            </Text>
            <View
                flex={1}
                style={{ overflow: 'hidden' }}>
                <Text
                    size="sm"
                    width="100%"
                    display="block"
                    className="f-ellipsis"
                    colorToken="text-weakest">
                    {description}
                </Text>
            </View>
            <Pill
                size="sm"
                style={{ textTransform: 'capitalize' }}>
                {type}
            </Pill>
        </View>
    )
}

export const SearchComponent = (props: any) => {
    const [index, setIndex] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const open = useMemo(() => !!results.length, [results.length])
    const router = useRouter()

    const handleFocus = (e) => {
        setTimeout(() => searchPages(''), 500)
    }

    const handleResultSelect = ({ title, subtitle, type, slug, resource, description }) => {
        setResults([])
        setSearch('')
        router.push('/docs/core/' + slug)
    }

    const searchPages = async (query) => {
        setLoading(true)
        setError(false)

        try {
            const response = await fetch('/api/search?query=' + query)
            const { results } = await response.json()

            setLoading(false)
            setResults(
                results.slice(0, 7).map(({ title, subtitle, description, slug }) => ({
                    title,
                    subtitle,
                    description,
                    resource: 'Something?',
                    type: 'component',
                    slug,
                }))
            )
        } catch (e) {
            setLoading(false)
            setError(true)
        }
    }

    const handleKeyDown = (e) => {
        const { isDown, isUp, isEscape, isEnter } = getKey(e)

        if (isUp) {
            e.preventDefault()
            setIndex(index == 0 ? results.length - 1 : index - 1)
        }

        if (isDown) {
            e.preventDefault()
            setIndex(index == results.length - 1 ? 0 : index + 1)
        }

        if (isEscape) {
            setResults([])
        }

        if (isEnter) {
            e.preventDefault()
            handleResultSelect(results[index])
        }
    }

    useEffect(() => {
        setIndex(0)
    }, [results.length])

    return (
        <Popover
            arrow
            width="100%"
            anchor="bottom-center"
            isVisible={open}
            onDismiss={() => {
                setResults([])
                setSearch('')
            }}
            content={
                <View
                    p={10}
                    column
                    alignItems="flex-start">
                    <Heading
                        as="h6"
                        p="0.5rem 1rem"
                        m="0 0 0.2rem 0"
                        colorToken="text-weakest">
                        Found {results.length} {plural(results.length, 'result')}
                    </Heading>
                    {results.map((result: any, i: number) => (
                        <SearchRow
                            key={i}
                            title={result.title}
                            description={result.subtitle}
                            resource={result.resource}
                            type={result.type}
                            selected={index == i}
                            onSelect={() => handleResultSelect(result)}
                        />
                    ))}
                </View>
            }>
            <View
                p="0 0 0 0.5rem"
                flex={1}>
                <InputControl 
                    border="1px solid var(--f-color-base-700)"
                    bgToken="base-900">
                    <Input
                        placeholder="Search"
                        border="none"
                        bgToken="base-900"
                        colorToken="base-300"
                        value={search}
                        onFocus={handleFocus}
                        onKeyDown={handleKeyDown}
                        style={{
                            '--f-input-color-placeholder': 'var(--f-color-base-600)',
                        }}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            searchPages(e.target.value)
                        }}
                    />
                    <InputSuffix>
                        <Icon
                            color={Token.ColorBase600}
                            icon={FISearch}
                            className="f-buttonize"
                        />
                    </InputSuffix>
                </InputControl>
            </View>
        </Popover>
    )
}

export default SearchComponent
