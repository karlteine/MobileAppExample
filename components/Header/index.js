import React, { useState } from "react"
import { Pressable, Image, Text, View } from "react-native"
import { styles } from "./styles"
import Input from "../Input"

const Header = ({title, onBackPress, onLogout, showBack, showSearch, showLogout, onSearchKeyword, keyword, onSubmitEditing  }) => {
    const [showSearchInput, setShowSearchInput] = useState(false)
    
    const onSearch = () => {
        setShowSearchInput(search => !search)
    }

    return (
        <View>
        <View style={styles.container}>
            { showBack ? (
                <Pressable hitSlop={20} onPress={onBackPress}>
                    <Image style={styles.icon} source={require('../../assets/back2.png')}/>
                </Pressable>
            ) : showSearch ? (
                <Pressable hitSlop={20} onPress={onSearch}>
                    <Image style={styles.icon} source={require('../../assets/search.png')}/>
                </Pressable>
            ) : <View style={styles.space}/>
            }
        <Text style={styles.title}>{title}</Text>
            {
                showLogout ? (
                    <Pressable hitSlop={20} onPress={onLogout}>
                        <Image style={styles.icon} source={require('../../assets/logout.png')}/>
                    </Pressable>
                ) : <View style={styles.space}/>
            }
        </View>
        {
            showSearchInput ? (
                <Input onChangeText={onSearchKeyword} value={keyword} placeholder="Type your keyword"  returnKeyType="search"
                onSubmitEditing={onSubmitEditing}/>
            ) : null
        }
        </View>
    )
}

export default React.memo(Header)