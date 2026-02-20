import { View } from "@fold-ui/core";

export const PatternComponent = (props) => (
    <>
        <View
            row
            justifyContent="flex-end"
            alignContent="flex-end"
            alignItems="flex-end"
            className="hide-on-mobile"
            position="absolute"
            zIndex={0}
            style={{ inset: 0, overflow: 'hidden' }}>
            <img 
                width={1750}
                src="./lines-logo.svg" 
                style={{ 
                    opacity: 0.75,
                    transform: 'translate(25%, 30%)',
                }}
            />
        </View>

        <View 
            row
            justifyContent="flex-start"
            alignContent="flex-start"
            alignItems="flex-start"
            className="hide-on-mobile"
            position="absolute"
            zIndex={0}
            style={{ inset: 0, overflow: 'hidden' }}>
            <img 
                width={1750}
                src="./lines-logo.svg" 
                style={{ 
                    opacity: 0.75,
                    transform: 'translate(-60%, -25%)',
                }}
            />
        </View>
    </>
)
