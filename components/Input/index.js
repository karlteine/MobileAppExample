import React, { useState} from "react";
import { TextInput, View, Text, Pressable, Image } from "react-native"; // react-native-web
import { styles } from "./styles";

const Input = ({label, placeholder, isPassword, value, onChangeText, onSubmitEditing, returnKeyType}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    
    const onEyePress = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                <TextInput value={value} onChangeText={onChangeText} secureTextEntry={isPassword && !isPasswordVisible}
                onSubmitEditing={onSubmitEditing}
                returnKeyType={returnKeyType || "done"}  placeholder={placeholder} style={styles.input}/>
                {
                    isPassword ? (
                    <Pressable onPress={onEyePress}>
                        <Image style={styles.eye} source={ isPasswordVisible ? require('../../assets/eye.png') : 
                        require('../../assets/eye_closed.png')}/>
                    </Pressable>
                    ) : null    
                }
            </View>
        </View>
    )
}
export default Input