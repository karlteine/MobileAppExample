import React, { useState } from "react";
import { Text, View, Alert } from "react-native";
import Button from "@components/Button";
import { styles } from "./styles";
import Input from "@components/Input";
import AuthHeader from "@components/AuthHeader";
import Separator from "@components/Separator";
import GoogleLogin from "@components/GoogleLogin";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { signIn } from "@lib/appWrite";

const Signup = ({ navigation, setIsSignedin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onBack = () => {
        navigation.goBack();
    };

    const handleSignIn = async () => {
        try {
            const session = await signIn(email, password);
            if (session) {
                Alert.alert("Success", "You are signed in");
                setIsSignedin(true);
                navigation.replace("Tabs");
            }
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };


    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <AuthHeader onBackPress={onBack} title="Sign In" />
                <Input 
                    label="Email" 
                    placeholder="example@gmail.com" 
                    value={email} 
                    onChangeText={setEmail} 
                />
                <Input 
                    isPassword 
                    label="Password" 
                    placeholder="******" 
                    value={password} 
                    onChangeText={setPassword}
                />
                <Button 
                    style={styles.button} 
                    title="Sign In" 
                    onPress={handleSignIn}
                />
                <Separator text="Or sign up with" />
                <GoogleLogin />
                <Text style={styles.footerText}>
                    Don't have an account?
                    <Text style={styles.footerLink} onPress={() => navigation.navigate("Signup")}> Sign Up</Text>
                </Text>
            </View>
        </SafeAreaProvider>
    );
}

export default React.memo(Signup);
