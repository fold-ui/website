
import { View } from '@fold-ui/core'
import { useEffect, useMemo, useState } from 'react'

export const ContentContainerComponent = (props) => {
    return (
        <>
            <View
                p="5rem 0" 
                className="text-content"
                m="0 auto"
                style={{  maxWidth: 'var(--f-max-width)' }}>
                {props.children}
            </View>
            <div style={{ borderBottom: '1px solid var(--f-color-surface-strongest)' }} />
        </>
    )
}
