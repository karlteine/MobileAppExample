import React, { useState} from "react";
import { TextInput, View, Text, Pressable, Image, Modal, TouchableOpacity } from "react-native"; // react-native-web
import { styles } from "./styles";

const Input = ({label, placeholder, isPassword, value, onChangeText, onSubmitEditing, returnKeyType, style, type, options, ...props}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isPickerModalVisible, setPickerModalVisible] = useState(false)

    const onEyePress = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    const onSelect = (opt) => {
        onChangeText(opt),
        setPickerModalVisible(false)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            {type === "picker" ? (
                <Pressable onPress={() => setPickerModalVisible(true)} style={styles.inputContainer}>
                    {value ? (<Text style={[styles.placeholder, style]}>{value?.title}</Text>) : (
                        <Text style={[styles.placeholder, style]}>{placeholder}</Text>)}
                    <Image style={styles.arrow} source={require('../../assets/arrow2.png')}/>
                </Pressable>
            ) : (
            <View style={styles.inputContainer}>
                <TextInput value={value} onChangeText={onChangeText} secureTextEntry={isPassword && !isPasswordVisible}
                onSubmitEditing={onSubmitEditing}
                returnKeyType={returnKeyType || "done"}  placeholder={placeholder} style={[styles.input, style]} {...props}/>
                {
                    isPassword ? (
                    <Pressable onPress={onEyePress}>
                        <Image style={styles.eye} source={ isPasswordVisible ? require('../../assets/eye.png') : 
                        require('../../assets/eye_closed.png')}/>
                    </Pressable>
                    ) : null    
                }
            </View>
            )}
            <Modal transparent visible={isPickerModalVisible}>
                <TouchableOpacity activeOpacity={1} onPress={() => setPickerModalVisible(false)} style={styles.modalWrapper}>
                    <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
                        <Text style={styles.optionTitle}>Select options</Text>
                        {
                            options?.map( opt => {
                                if(!opt?.id) {
                                    return null
                                }

                                const selected = value?.id === opt?.id

                                return (<Text onPress={() => onSelect(opt)} style={[styles.optionText, selected ? styles.selectedOption : {}]} key={opt?.title}>{opt?.title}</Text>)
                            })
                        }
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}
export default Input