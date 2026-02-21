import React from 'react'
import { Divider, Heading, Li, Link, List, Notification, NotificationContent, Text, View } from '@fold-ui/core'
import { GraphicLeft, GraphicRight } from '../components/graphic.component'
import * as Token from '@fold-ui/design/tokens'

export const HeaderComponent = ({ title, subtitle = null, description = null }) => {
    return  (
        <>
            <View
                column
                id="home"
                gap="1.5rem"
                flex={1}
                p="211px 0 150px 0"
                m="-140px 0 0 0"
                position="relative"
                style={{  overflow: 'hidden' }}
                className="hero-background"
                width="100%"
                justifyContent="stretch">
               {/*  {!!subtitle && (
                    <Text
                        textAlign="center"
                        style={{ textTransform: 'uppercase' }}
                        letterSpacing={5}
                        colorToken="accent">
                        {subtitle}
                    </Text>
                )} */}
                <Heading
                    huge
                    colorToken="base-100"
                    textAlign="center">
                    {title}
                </Heading>

                {!!description && (
                    <Heading
                        as="h3"
                        textAlign="center"
                        colorToken="base-400"
                        width="80%">
                        {description}
                    </Heading>
                )}
            </View>
        </>
    )
}
