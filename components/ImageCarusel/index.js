import React, { useState } from "react";
import { styles } from "./styles"
import { FlatList, Image, View, Dimensions } from "react-native";

const {width} = Dimensions.get('window')

const ImageCarusel = ({images}) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const handleScrollEnd = (event) => {
        const horizontalOffset = event.nativeEvent.contentOffset.x
        const index = Math.ceil(horizontalOffset / width);
        setActiveIndex(index)
    }
    const renderImage = ({item}) => {
        return (
            <Image style={styles.image} source={{uri: item}}/>
        )}

        return (
            <View>
                <FlatList horizontal pagingEnabled style={styles.list} data={images}
                renderItem={renderImage} onMomentumScrollEnd={handleScrollEnd}/>
                <View style={styles.paggination}>
                    {images?.map((_, i) => (
                        <View key={i} style={[styles.pagginationLine, i === activeIndex ? styles.activeLine : {}]}/>
                    ))}
                </View>
            </View>
        )
}

export default React.memo(ImageCarusel)