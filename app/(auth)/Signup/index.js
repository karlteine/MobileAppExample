import React, { useState } from "react"
import {Text, View, Image, Pressable, Alert} from "react-native"
import Button from "@components/Button"
import { styles } from "./styles"
import Input from "@components/Input"
import Checkbox from "@components/Checkbox"
import AuthHeader from "@components/AuthHeader"
import Separator from "@components/Separator"
import GoogleLogin from "@components/GoogleLogin"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { createUser, signIn, getSession } from "../../../lib/appWrite"

const Signup = ({ navigation, setIsSignedin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const onBack = () => {
    navigation.goBack();
  };

  const handleSignUp = async () => {
    if (!checked) {
        Alert.alert("Terms and Privacy", "Please agree to the terms and privacy policy");
        return;
    }

    try {
        const newUser = await createUser(email, password, name);
        if (newUser) {
            Alert.alert("Success", "Account created");
            
            // Check if the user is already signed in
            const currentSession = await getSession();
            if (!currentSession) {
                // Only sign in if there is no active session
                await signIn(email, password);
            }
            setIsSignedin(true)
            navigation.replace("Tabs"); // Redirect to Home or another screen
        }
    } catch (error) {
        Alert.alert("Error", error.message);
    }
};

  return (
    <SafeAreaProvider>
        <View style={styles.container}>
            <AuthHeader onBackPress={onBack} title="Sign up" />
            <Input label="Name" placeholder="John Doe" onChangeText={setName} />
            <Input label="Email" placeholder="example@gmail.com" onChangeText={setEmail} />
            <Input isPassword label="Password" placeholder="******" onChangeText={setPassword} />
            <View style={styles.agreeRow}>
                <Checkbox checked={checked} onCheck={setChecked} />
                <Text style={styles.agreeText}>I agree with<Text style={styles.agreeTextBold}> Terms </Text>&<Text style={styles.agreeTextBold}> Privacy</Text></Text>
            </View>
            <Button style={styles.button} title="Sign up" onPress={handleSignUp} />
            <Separator text="Or sign up with" />
            <GoogleLogin />
            <Text style={styles.footerText}>
                Already have an account?{" "}
                <Text style={styles.footerLink}>Sign In</Text>
            </Text>
        </View>
    </SafeAreaProvider>
    )
}

export default React.memo(Signup)