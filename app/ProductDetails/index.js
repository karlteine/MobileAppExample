import React from "react";
import { View, Text, ScrollView, Image, Pressable, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles"
import Button from "@components/Button";
import ImageCarusel from "@components/ImageCarusel";
import { Link } from "expo-router";

const ProductDetails = ({navigation, route}) => {
    const {product} = route.params || {}
    console.log('product => ', product)
    
    const onBackPress = () => {
        navigation.goBack()
    }

    const onContact = () => {
        let phone = "real phone number"
        Linking.openURL(`tel:${phone}`)

        let email = "real email"
        Linking.openURL(`mailto:${email}`)
    }

    return (
        <SafeAreaView style={styles.save}>
            <ScrollView>
            {product?.images?.length ? (
                <ImageCarusel images={product?.images}/>
            ) : (
                <Image style={styles.image} source={{uri: product?.image}}/>
            )}
            <View style={styles.content}>
                <Text style={styles.title}>{product?.title}</Text>
                <Text style={styles.price}>{product?.price}</Text>
                <Text style={styles.description}>{product?.description}</Text>
            </View>
            <Pressable onPress={onBackPress} style={styles.backContainer}>
                <Image style={styles.backIcon} source={require('@assets/back2.png')}/>
            </Pressable>
            </ScrollView>
            <View style={styles.footer}>
                <Pressable>
                    <Image source={require('@assets/bookmark.png')}/>
                </Pressable>
                <Button onPress={onContact} style={styles.button} title="Contact Seller"/>
            </View>
        </SafeAreaView>
    )
}

export default React.memo(ProductDetails)
