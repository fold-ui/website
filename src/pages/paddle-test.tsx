import { HeaderComponent } from '@/components/header.component'
import { Button, View } from '@fold-ui/core'
import { useEffect, useState } from 'react'

function PaddleTest() {
    const [showChild, setShowChild] = useState(false)

    const openPayment = (seats) => {
        const Paddle: any = window['Paddle']

        // Paddle.Environment.set('sandbox')
        // Paddle.Initialize({ token: 'test_341b6905e3ca3a3b2a7b42ffdcc' })

        Paddle.Initialize({ token: 'live_d2beed0f09a4785cc33eadab587' })

        let items = []

        // switch (seats) {
        //     case 1:
        //         items = [
        //             {
        //                 priceId: 'pri_01hyazedstjg85vqm34pj8pfry',
        //                 quantity: 1,
        //             },
        //         ]
        //         break
        //     case 2:
        //         items = [
        //             {
        //                 priceId: 'pri_01hq64m3jpm5y1vf3rx6a5g8cx',
        //                 quantity: 1,
        //             },
        //         ]
        //         break
        //     case 3:
        //         items = [
        //             {
        //                 priceId: 'pri_01hzfv9ykmss43a2q1qb49km0f',
        //                 quantity: 1,
        //             },
        //         ]
        //         break
        //     case 4:
        //         items = [
        //             {
        //                 priceId: 'pri_01hzfvae3jfhen00vvk1852npt',
        //                 quantity: 1,
        //             },
        //         ]
        //         break
        // }

        switch (seats) {
            case 1:
                items = [
                    {
                        priceId: 'pri_01hyayzp0x0tmg4sh0g9t62nq6',
                        quantity: 1,
                    },
                ]
                break
            case 2:
                items = [
                    {
                        priceId: 'pri_01hq62nmznrvy201f7refbh4gp',
                        quantity: 1,
                    },
                ]
                break
            case 3:
                items = [
                    {
                        priceId: 'pri_01hzgvcm6kkccadzgyyfpvvskr',
                        quantity: 1,
                    },
                ]
                break
            case 4:
                items = [
                    {
                        priceId: 'pri_01hzgvd71e0mxvdr4nxdybpmet',
                        quantity: 1,
                    },
                ]
                break
        }

        Paddle.Checkout.open({ items })
    }

    useEffect(() => {
        setShowChild(true)
    }, [])

    if (!showChild) return null

    return (
        <>
        <HeaderComponent title="Buy Now" subtitle="Paddle" />
            <View row gap="1rem" p="1rem">
                <Button onClick={() => openPayment(1)}>p1</Button>
                <Button onClick={() => openPayment(2)}>p2</Button>
                <Button onClick={() => openPayment(3)}>p3</Button>
                <Button onClick={() => openPayment(4)}>p4</Button>
            </View>
        </>
    )
}

PaddleTest.noLayout = true

export default PaddleTest
