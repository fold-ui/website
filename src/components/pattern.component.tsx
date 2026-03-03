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
            className="hide-mobile"
            position="absolute"
            zIndex={1}
            style={{ inset: 0, overflow: 'hidden' }}>
            <div className="grid-squares" />
            <div className="gradient" />
                
            <View 
                position="absolute"
                width="100%"
                height={200}
                zIndex={5}
                style={{ bottom: 0, left: 0  }}
                className="hide-on-mobile"
                bg="linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)"
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
