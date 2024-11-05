import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import Header from "@components/Header";
import ListItem from "@components/ListItem";
import Button from "@components/Button";
import { signOut, getUserProfile } from "@lib/appWrite"; // Import the new function
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const Profile = ({ navigation, setIsSignedin }) => {
    const [user, setUser] = useState({ username: "", email: "" }); // State to hold user data
    const num = 10; // Example for number of listings

    // Fetch user profile data when the component is focused
    useFocusEffect(
        React.useCallback(() => {
            const fetchUserProfile = async () => {
                try {
                    const userProfile = await getUserProfile(); // Fetch the user profile
                    setUser(userProfile); // Update state with user profile data
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                }
            };

            fetchUserProfile();
        }, [])
    );

    const onLogout = async () => {
        try {
            await signOut(); // Call your logout function
            console.log('Logout successful');
            setIsSignedin(false); 
            navigation.navigate('Splash'); // Navigate to the Sign In screen after logout
        } catch (error) {
            console.error('Logout failed:', error); // Handle errors appropriately
        }
    };

    const onSettingsPress = () => {
        navigation.navigate('Settings');
    };

    const onNewListingPress = () => {
        navigation.navigate('CreateListing');
    };
    
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Header title="Profile" showLogout onLogout={onLogout}/>
                    <Text style={styles.name}>{user.username || "User name"}</Text>
                    <Text style={styles.email}>{user.email || "User email"}</Text>
            
                    <ListItem title="My Listings" subtitle={`Already have ${num} listings`}/>
                    <ListItem title="Settings" subtitle="Account, FAQ, Contact" onPress={onSettingsPress}/>
                </View>
                <Button style={styles.button} onPress={onNewListingPress} title="Add new Listing"/>
            </View>
        </SafeAreaView>
    );
};

export default React.memo(Profile);
