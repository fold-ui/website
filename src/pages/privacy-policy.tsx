import { ContentContainerComponent } from '@/components/content-container.component'
import { HeaderComponent } from '@/components/header.component'
import { View } from '@fold-ui/core'
import Link from 'next/link'

export default function PrivacyPolicy(props) {
    return (
        <>
            <HeaderComponent 
                title="Privacy Policy"
                subtitle="Last updated on 23 May 2024"
                description="We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines our practices regarding the collection, use, and protection of your information when you visit this website."
            />

            <ContentContainerComponent>
                <h2>Information Collection</h2>
                <p>We do not collect or track any personal information about our visitors. You can browse this website without revealing any personal data.</p>

                <h2>Cookies and Tracking</h2>
                <p>We do not use cookies or any other tracking technologies on this website. Your browsing activities are not monitored or recorded in any way.</p>

                <h2>Google Fonts</h2>
                <p>Our website uses Google Fonts for uniform and visually appealing text styling. When you visit our site, your browser loads the required web fonts directly from Google's servers. This means Google may receive your IP address and other data related to your browser and device.</p>

                <h2>Third-Party Links</h2>
                Our website may contain links to third-party sites. We are not responsible for the privacy practices of these sites and encourage you to review their privacy policies.

                <h2>Changes to This Policy</h2>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the date of the latest revision will be indicated at the top.

                <h2>Contact Us</h2>
                If you have any questions or concerns about this Privacy Policy, please contact us at <Link href="mailto:support@fold.dev">support@fold.dev</Link>.
                
                <h2>Consent</h2>
                <p>By using this website, you hereby consent to our Privacy Policy and agree to its terms.</p>

                <h2>Contact Information</h2>
                <p>Address: Marine Drive, Umhlanga, KZN, ZA</p>
                <p>Email: <Link href="mailto:support@fold.dev">support@fold.dev</Link></p>
            </ContentContainerComponent>
        </>
    )
}
