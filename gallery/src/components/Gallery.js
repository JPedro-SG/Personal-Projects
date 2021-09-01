import React, { useEffect, useMemo, useState } from 'react';
import {
    Image,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ImageStore
} from 'react-native';

import deviceStorageImages from '../imgPaths';
import ImageFullScreen from './ImageFullScreen';

const numOfColumns = 4
const imgMargins = 2
const width = Dimensions.get('window').width - (numOfColumns) * imgMargins
const imgSize = (width/numOfColumns)

const Gallery = props => {
    const [imageAddresses, setImageAddresses] = useState([])

    useEffect(() => {
        
        deviceStorageImages().getImages().then(results => setImageAddresses([...results]))
        // console.log(numOfColumns)
        // console.log(imageAddresses[0].path)
    }, [])

    const openInFullScreen = item => {
        props.navigation.navigate('Image', {path: item.path})
    }

    const renderImages = ({index, item}) => {
        const stylesArr = [styles.img]
        if(index % numOfColumns !== 0) stylesArr.push({marginLeft: imgMargins})

        return (
            <TouchableOpacity onPress={() => openInFullScreen(item)}>
                <Image 
                    style={stylesArr} 
                    source={{uri: "file://" + item.path}} 
                />
            </TouchableOpacity>
        )
    }

    const renderImagesMemorized = useMemo(() => renderImages, [imageAddresses])
    
    return (
        <FlatList 
            contentContainerStyle={{margin: imgMargins}}
            horizontal={false}
            numColumns={numOfColumns}
            initialNumToRender={10}
            data={imageAddresses}
            renderItem={renderImages}
            keyExtractor={(item, index) => index}
        />
    );
};

const styles = StyleSheet.create({
    img: {
        height: imgSize, 
        width: imgSize,
        marginBottom: imgMargins
    }
})

export default Gallery;
