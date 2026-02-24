import React from 'react'
import { Heading, Li, Link, List, Notification, NotificationContent, Text, View } from '@fold-ui/core'
import { GraphicLeft, GraphicRight } from '../components/graphic.component'
import * as Token from '@fold-ui/design/tokens'
import { HeaderComponent } from '@/components/header.component'
import { ContentContainerComponent } from '@/components/content-container.component'

export const LicenseContent = (props) => (
    <View className="text-content">
        <Text>This license is a legal agreement between you (either an individual or a single entity, also referred to as "LICENSEE", "YOU") and Johannes du Plessis ("Fold") for the use of Fold Pro (the "SOFTWARE").</Text>
        <Text>By purchasing, installing, or using the SOFTWARE, you agree to be bound by the terms and conditions of this License Agreement. Johannes du Plessis ("Fold") reserves the right to alter this agreement at any time, for any reason, without notice.</Text>

        <Heading as="h2">Permitted Use</Heading>
        
        <Text>The LICENSEE is granted a license to use the SOFTWARE as the basis of any non commercial/internal application, so long as that application is owned and operated by you, the LICENSEE.</Text>

        <Heading as="h3">Indie License</Heading>
        <Text>The LICENSEE is permitted to have a maximum of three (3) developers utilizing the license key. This limitation includes any Continuous Integration/Continuous Deployment (CI/CD) platforms, which shall be considered as one of the developers.</Text>

        <Heading as="h3">Team License</Heading>
        <Text>The LICENSEE is permitted to have a maximum of ten (10) developers utilizing the license key. This limitation includes any Continuous Integration/Continuous Deployment (CI/CD) platforms, which shall be considered as one of the developers.</Text>
        <Text>Email <Link href="mailto:support@fold.dev">support@fold.dev</Link> for upgrading your Indie license to a Team license, or obtaining additional seats.</Text>

        <Heading as="h3">OEM License</Heading>
        <Text>Please enquire about OEM license options by emailing <Link href="mailto:support@fold.dev">support@fold.dev</Link>.</Text>

        <Heading as="h2">Restrictions</Heading>
        <Text>Unless the LICENSEE has been granted prior, written consent from Johannes du Plessis ("Fold"), the LICENSEE may not:</Text>
        <List as="ul">
            <Li>At no time may the SOFTWARE be used for development purposes by other individuals than the licensed developer(s).</Li>
            <Li>The SOFTWARE may not be distributed without entering into an OEM licensing agreement with Johannes du Plessis ("Fold").</Li>
            <Li>The SOFTWARE may not be distributed for use with solutions or packaged products other than those developed by the LICENSEE.</Li>
            <Li>The SOFTWARE may not be distributed as part of products that have the same or substantially the same primary functionality.</Li>
            <Li>The LICENSEE is not allowed to resell, transfer, rent, lease, or sublicense the SOFTWARE and the LICENSEE's associated rights.</Li>
            <Li>Under no circumstances shall the LICENSEE grant further redistribution rights to the end-users of the LICENSEE's solution or product.</Li>
            <Li>The LICENSEE is not allowed to use, copy, modify, or merge copies of the SOFTWARE, and any accompanying documents except as permitted in this LICENSE.</Li>
        </List>

        <Heading as="h2">Redistribution Rights</Heading>
        <Text>The LICENSEE may distribute the SOFTWARE provided that:</Text>
        <List as="ul">
            <Li>The LICENSEE has entered into an OEM licensing agreement with Johannes du Plessis ("Fold").</Li>
            <Li>The LICENSEE must reasonably ensure that the SOFTWARE is not distributed in any form that allows it to be reused by any application other than the LICENSEE's solution. The LICENSEE needs to duly inform its customers that they are not allowed to use the SOFTWARE independently from their solution, and that to redistribute the SOFTWARE in any form they must obtain an appropriate license from Johannes du Plessis ("Fold").</Li>
            <Li>The LICENSEE may not redistribute the SOFTWARE to anyone and via any means other than to the LICENSEE's customers as a part of a purchased, integrated solution, that includes functionality above and beyond that provided solely by the SOFTWARE.</Li>
        </List>

        <Heading as="h2">Technical Support</Heading>
        <Text>Technical support is limited to bug reports and feature requests. No support will be provided to diagnose or advise application-level code issues. If you require more specialised support or consultancy email support@fold.dev.</Text>

        <Heading as="h2">Refunds</Heading>
        <Text>Johannes du Plessis ("Fold") does not provide refunds, whether full or partial, for the SOFTWARE.</Text>
        <Text>Exceptions to this policy may be made solely at the discretion of Johannes du Plessis ("Fold") on a case-by-case basis. Refund requests may be sent to <Link href="mailto:support@fold.dev">support@fold.dev</Link>.</Text>
        <Text>If a refund is issued, the LICENSEE agrees to delete all files within 24 hours and is not permitted to use SOFTWARE in projects (including personal/non-commercial projects).</Text>

        <Notification variant="highlight">
            <NotificationContent>
                We encourage you to try out the <Link href="https://codesandbox.io/p/devbox/zen-banach-wdgzlr?file=%2Fsrc%2Fmain.tsx%3A13%2C1" target="_blank">CodeSandbox</Link> before making a decision to purchase a license, to make sure it's right for you.
            </NotificationContent>
        </Notification>

        <Heading as="h2">Indemnity</Heading>
        <Text>LICENSEE agrees to indemnify and hold harmless Johannes du Plessis ("Fold") and its resellers for any third-party claims, actions or suits, as well as any related expenses, liabilities, damages, settlements or fees arising from your use or misuse of the Software, or a violation of any terms of this license.</Text>

        <Heading as="h2">Expiration</Heading>
        <Text>Upon the expiration of the initial SOFTWARE access duration, the LICENSEE remains bound by the terms and conditions set forth in the initial agreement. All obligations, restrictions, and permissions granted under this license will continue to apply, ensuring that the LICENSEE's responsibilities and commitments stipulated in the initial agreement persist beyond the termination of the license. This continuation of the license terms ensures that the LICENSEE's conduct and usage remain in compliance with the original provisions, even after the license period has ended.</Text>

        <Heading as="h2">Disclaimer Of Warranty</Heading>
        <Text>The software is provided “as is,” without warranty of any kind, expressed or implied, including, but not limited to, warranties of quality, performance, non-infringement, merchantability, or fitness for a particular purpose. Further, Johannes du Plessis ("Fold") does not warrant that the software or any related service will always be available.</Text>

        <Heading as="h2">Limitations Of Liability</Heading>
        <Text>You assume all risk associated with the installation and use of the software. In no event shall Johannes du Plessis ("Fold") be liable for claims, damages, or other liability arising from, out of, or in connection with the software. License holders are solely responsible for determining the appropriateness of use and assume all risks associated with its use, including but not limited to the risks of program errors, damage to equipment, loss of data or software programs, or unavailability or interruption of operations.</Text>

        <Heading as="h2">Miscellaneous</Heading>
        <Text>This license is governed by the laws of South Africa. If any provision of this license is to be held unenforceable, such holding will not affect the validity of the other provisions hereof. Failure of a party to enforce any provision of this license shall not constitute or be construed as a waiver of such provision or of the right to enforce such provision. This license represents the entire understanding between the parties with respect to its subject matter.</Text>

        <Heading as="h2">Contact Information</Heading>
        <Text>Address: Marine Drive, Umhlanga, KZN, ZA</Text>
        <Text>Email: <Link href="mailto:support@fold.dev">support@fold.dev</Link></Text>
    </View>
)

export default function License(props){
    return (
        <>
            <HeaderComponent 
                title="License Agreement"
                subtitle="Last updated on 26 May 2024"
            />

            <ContentContainerComponent>
                <LicenseContent />
            </ContentContainerComponent>
        </>
    )
}
