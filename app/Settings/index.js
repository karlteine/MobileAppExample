import React, { useState, useEffect } from "react";
import { View, Text, Linking, Image, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import Header from "@components/Header";
import ListItem from "@components/ListItem";
import EditableBox from "@components/EditableBox";
import Button from "@components/Button";
import PasswordModal from "@components/PasswordModal"; // Import the new modal
import { appwriteConfig, getUserProfile, databases, account } from "@lib/appWrite"; 
import { Query } from "react-native-appwrite"; 

const Settings = () => {
    const [editing, setEditing] = useState(false);
    const [values, setValues] = useState({ name: "User", email: "user@gmail.com" });
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const user = await getUserProfile();
                setValues({ name: user.username, email: user.email });
            } catch (error) {
                console.error('Error fetching current user:', error);
                Alert.alert('Error', 'Could not fetch user information.');
            }
        };

        fetchCurrentUser();
    }, []);

    const onChange = (key, value) => {
        setValues(v => ({ ...v, [key]: value }));
    };

    const onEditPress = () => {
        setEditing(true);
    };

    const handlePasswordSubmit = async (password) => {
        try {
            // Fetch the current account information
            const currentAccount = await account.get();
            let emailChanged = values.email !== currentAccount.email;
            
            // If the email has changed, update it with password validation
            if (emailChanged) {
                await account.updateEmail(values.email, password);
            }
    
            // Fetch user profile document in the database
            const currentUser = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.userCollectionId,
                [Query.equal('accountId', currentAccount.$id)]
            );
    
            if (currentUser.documents.length === 0) {
                Alert.alert('Error', 'User profile not found.');
                return;
            }
    
            const userId = currentUser.documents[0].$id;
            
            // Only update the database document if either the username or email changed
            if (values.name !== currentUser.documents[0].username || emailChanged) {
                await databases.updateDocument(
                    appwriteConfig.databaseId,
                    appwriteConfig.userCollectionId,
                    userId,
                    {
                        username: values.name,
                        email: values.email,
                    }
                );
            }
    
            // Update the local state with the new values
            setValues({ name: values.name, email: values.email });
            Alert.alert('Success', 'Profile updated successfully.');
            setEditing(false);
            setModalVisible(false); // Close modal
    
        } catch (error) {
            console.error('Error updating user profile:', error);
            Alert.alert('Error', 'Incorrect password or an error occurred.');
        }
    };

    const onItemPress = () => {
        Linking.openURL('https://google.com');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="Settings" />
            <View style={styles.container}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Personal Information</Text>
                    <Pressable onPress={onEditPress}>
                        <Image style={styles.icon} source={require('@assets/edit.png')} />
                    </Pressable>
                </View>
                <EditableBox 
                    onChangeText={(v) => onChange("name", v)} 
                    label="Name" 
                    value={values.name} 
                    editable={editing} 
                />
                <EditableBox 
                    onChangeText={(v) => onChange("email", v)} 
                    label="Email" 
                    value={values.email} 
                    editable={editing} 
                />
                {editing ? (
                    <Button 
                        style={styles.button} 
                        title="Save" 
                        onPress={() => setModalVisible(true)} // Show modal on save
                    />
                ) : null}

                <Text style={styles.sectionTitle}>Help Center</Text>
                <ListItem onPress={onItemPress} style={styles.item} title="FAQ" />
                <ListItem onPress={onItemPress} style={styles.item} title="Contact Us" />
                <ListItem onPress={onItemPress} style={styles.item} title="Privacy & Terms" />
            </View>

            <PasswordModal 
                visible={modalVisible} 
                onClose={() => setModalVisible(false)} 
                onSubmit={handlePasswordSubmit} 
            />
        </SafeAreaView>
    );
};

export default React.memo(Settings);
