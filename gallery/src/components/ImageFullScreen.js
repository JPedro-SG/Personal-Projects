import React, { useState } from 'react'
import { View, 
    Image, 
    Text, 
    StyleSheet, 
    TouchableWithoutFeedback,
    TouchableOpacity,
    Animated
} from 'react-native'
// "file://"
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useEffect } from 'react/cjs/react.development'

const ImageFullScreen = props => {
    
    // console.log(props.route.params.path)
    const [yPosition, setYPosition] = useState(new Animated.Value(0))
    const [showHeader, setShowHeader] = useState(true)
    const {path} = props.route.params
    const hideOrShowHeader = () => {
        if(!showHeader) {
            Animated.timing(yPosition, {
                toValue: -45,
                duration: 400, 
                useNativeDriver: false
            }).start()
        }else {
            Animated.timing(yPosition, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false
            }).start()
        }
    }
    useEffect(() => {
        // {width: "100%", height:"100%", resizeMode: 'contain'}
        // console.log(yPosition) 
        hideOrShowHeader()  
    }, [showHeader]) 
    // onPress={() => props.navigation.goBack()
    
    return (
        <View style={{flex: 1, backgroundColor: "#000"}}>
            <Animated.View style={[styles.header, {top: yPosition, opacity: Animated.subtract(1, Animated.divide(yPosition, -45))}]}>
                <TouchableOpacity style={styles.iconWrapper} onPress={() => props.navigation.goBack()}>
                    <Icon name='arrow-back' size={40} color="#fff" />
                </TouchableOpacity>
            </Animated.View>
            <TouchableWithoutFeedback onPress={() => setShowHeader(!showHeader)}>
                <Image  source={{uri: "file://" + path}} style={{width: "100%", height:"100%", resizeMode: 'contain'}} />
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 45,
        position: 'absolute',
        zIndex: 1,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, .3)',
        flexDirection: 'row',

    },
    iconWrapper: {
        // fontSize: 50,
        marginLeft: 15,
        justifyContent: 'center'
    }
})

export default ImageFullScreen