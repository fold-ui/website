import { Heading, View } from '@fold-ui/core'
import { useEffect, useState } from 'react'

export default function PageNavigationComponent({ tocHtml }) {
    const [toc, setToc] = useState([])

    useEffect(() => {
        const toc = []
        new DOMParser()
            .parseFromString(tocHtml, 'text/xml')
            .querySelectorAll('a')
            .forEach((element) => {
                toc.push({
                    href: element.getAttribute('href'),
                    text: element.innerHTML,
                })
            })
        setToc(toc)
    }, [tocHtml])

    return (
        <>
            <Heading
                as="h4"
                width="100%">
                On this page
            </Heading>
            <br />
            <View
                width="100%"
                dangerouslySetInnerHTML={{ __html: tocHtml }}
            />
            {/* <List 
                type="none" 
                bullet="" 
                width="100%">
                {toc.map((line: any, index: number) => (
                    <Li key={index}>
                        <Link href={line.href} className="f-link">
                            {line.text}
                        </Link>
                    </Li>
                ))}
            </List> */}
            {/* <MDXRemote {...mdxToc} /> */}
            <br />
            <br />
            <br />
            {/* <Link href="/docs">go back to docs</Link> */}
        </>
    )
}
