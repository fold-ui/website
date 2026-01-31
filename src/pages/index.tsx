import { Divider } from '@fold-ui/core'
import { useEffect, useState } from 'react'
import { CoreComponent } from '@/components/core.component'
import { FAQComponent } from '@/components/faq.component'
import { GoComponent } from '@/components/go.component'
import { HeroComponent } from '@/components/hero.component'
import { PricingComponent } from '@/components/pricing.component'
import { ProComponent } from '@/components/pro.component'
import { SupportComponent } from '@/components/support.component'

function Home() {
    const [showChild, setShowChild] = useState(false)

    useEffect(() => {
        setShowChild(true)
    }, [])

    if (!showChild) return null

    return (
        <>
            <HeroComponent />
            <ProComponent />
            <CoreComponent />
            <Divider />
            {/* 
            <PricingComponent />
            <Divider />
            <FAQComponent />
            <Divider />      
            */} 
            <SupportComponent />
            <Divider />
            {/* 
            <GoComponent />   
            */}
        </>
    )
}

Home.noLayout = true

export default Home
