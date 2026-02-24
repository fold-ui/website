import {
    Accordion,
    AccordionHeading,
    AccordionItem,
    AccordionPanel,
    Heading,
    Link,
    Text,
    View
} from '@fold-ui/core'

export const FAQComponent = () => {
    return (
        <View 
            row 
            id="faq"
            position="relative"
            p="5rem 0rem"
            width="100%"
            style={{ overflow: 'hidden' }}>
            <View
                column
                gap="2rem"
                position="relative">
                <Text
                    textAlign="center"
                    style={{ textTransform: 'uppercase' }}
                    letterSpacing={5}
                    colorToken="text-weakest">
                    FAQ
                </Text>
                <Heading
                    textAlign="center"
                    fontWeight={400}
                    width="80%">
                    Frequently Asked Questions
                </Heading>
                <Accordion 
                    m="1rem 0 0 0"
                    width="85%"
                    style={{ '--f-accordion-background': 'transparent' }}>
                    <AccordionItem>
                        <AccordionHeading>Is it production ready?</AccordionHeading>
                        <AccordionPanel>
                            Consider Early Access to be pre-release software & still relatively unstable. We have made every effort to minimize bugs & other issues,
                            but there is still work left to do. If you have a Pro license & have experienced a bug, please consider posting 
                            it to the <Link target="_blank" href="https://groups.google.com/a/fold-ui.com/g/pro" colorToken="accent">Fold Pro Google Group</Link> or 
                            on <Link href="https://github.com/fold-ui/fold" target="_blank" fontSize="inherit" colorToken="accent">GitHub.</Link> (label it as Pro)
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeading>Is the source code available?</AccordionHeading>
                        <AccordionPanel>
                            The source code will not be available during Early Access. If you have an Enterprise or SaaS license, the source code will be made available once Early Access ends.
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeading>How long will Early Access last?</AccordionHeading>
                        <AccordionPanel>
                            Until it is stable. However we anticipate this being no more than 2 to 3 months at most.
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeading>What comes after Early Access?</AccordionHeading>
                        <AccordionPanel>
                            After Early Access we will go into public Beta. If you have purchased an Early Access license, you will automatically get access. Any licensing purchase limits will fall away for Beta.
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeading>I'm unsure which license applies to me?</AccordionHeading>
                        <AccordionPanel>
                            To briefly explain the license types: 
                            Indie is for teams currently building a product that hasn't launched yet, or need to prototype on an idea.
                            Enterpise is for teams generally inward facing, building apps that do not generate revenue or who do not directly contribute to revenue generation within the company.
                            SaaS is for teams that have a product that users pay for.
                            We are more than happy to assist with any questions you may have.
                            Please <Link
                                href="support@fold.dev"
                                target="_blank"
                                fontSize="inherit"
                                colorToken="accent">
                                email
                            </Link> us & we'll reply as soon as we can.
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>


            </View>
        </View>
    )
}
