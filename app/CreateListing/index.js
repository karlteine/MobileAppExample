import React, { useState } from "react";
import { View, Text, TouchableOpacity, Pressable, ActivityIndicator, KeyboardAvoidingView, ScrollView, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import Header from "@components/Header";

import * as ImagePicker from 'expo-image-picker';

import Input from "@components/Input";
import Button from "@components/Button";
import { categories } from "@data/categories";

const CreateListing = ({ navigation }) => {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({})

    console.log("values => ", values)

    const goBack = () => {
        navigation.goBack()
    }

    const uploadNewImage = async () => {
        console.log("Preparing to launch image library...");
        setLoading(true);
        
        // Request permission to access the media library
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            setLoading(false);
            return;
        }

        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            console.log("Image Picker Result:", result);

            if (!result.canceled) {
                setImages((list) => [...list, result.assets[0]]);
            } else {
                console.log("User cancelled image picker");
            }
        } catch (error) {
            console.error("Error uploading image: ", error);
        } finally {
            setLoading(false);
        }
    };

    const onDeleteImage = (image) => {
        setImages((list) => {
            const filteredImages = list.filter((img) => img?.fileName !== image?.fileName)
            return filteredImages
        })
    }

    const onChange = (value, key) => {
        setValues((val) => ({...val, [key]: value}))
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
            <Header showBack={true} onBackPress={goBack} title="Create a new listing"/>
            <ScrollView style={styles.container}>
                <Text style={styles.sectionTitle}>Upload photos</Text>
                <View style={styles.imageRow}>
                <TouchableOpacity style={styles.uploadContainer} onPress={uploadNewImage}>
                    <View style={styles.uploadCircle}>
                        <Text style={styles.uploadPlus}>+</Text>
                    </View>
                </TouchableOpacity>
                {images?.map(image => (
                    <View key={image?.fileName} style={styles.imageContainer}>
                        <Image style={styles.image} source={{uri: image?.uri}}/>
                        <Pressable hitSlop={20} onPress={() => onDeleteImage(image)}>
                            <Image style={styles.delete} source={require('@assets/close.png')}/>
                        </Pressable>
                    </View>
                ))}
                {loading ? (<ActivityIndicator/>) : null}
            </View>
            <Input label="Title" placeholder="Listing Title" value={values.title} onChangeText={(v) => onChange(v, "title")}/>
            <Input label="Category" placeholder="Select the category" value={values.category} onChangeText={(v) => onChange(v, "category")} type="picker" options={categories} />
            <Input label="Price" placeholder="Enter price in USD" value={values.price} onChangeText={(v) => onChange(v, "price")} keyboardType="numeric"/>
            <Input style={styles.textarea} label="Description" placeholder="Tell us more..." value={values.description} onChangeText={(v) => onChange(v, "description")} multiline/>
            <View style={{ paddingBottom: 40 }}>
            <Button title="Submit"/>
            </View>
            </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
        )
} 

export default React.memo(CreateListing)