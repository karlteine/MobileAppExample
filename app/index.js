import React, { useEffect } from 'react'
import { SafeAreaView, Image } from 'react-native'
import Splash from './(auth)/Splash'
import Signup from './(auth)/Signup'

import Profile from './Profile'
import Home from './Home'
import Favorites from './Favorites'

import { colors } from '../utils/colors'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from './(auth)/Sign In'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProductDetails from './ProductDetails'

const Stack = createNativeStackNavigator()

const Tab = createBottomTabNavigator()

const isSignedin = true

const Tabs = () => {
    return (
        <Tab.Navigator 
        screenOptions= {({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let icon

                if (route.name === "Home") {
                    icon = focused
                       ? require('../assets/tabs/home_active.png')
                       : require('../assets/tabs/home.png')
                } else if (route.name === "Favorites") {
                    icon = focused
                       ? require('../assets/tabs/bookmark_active.png')
                       : require('../assets/tabs/bookmark.png')
                } else if (route.name === "Profile") {
                    icon = focused
                       ? require('../assets/tabs/profile_active.png')
                       : require('../assets/tabs/profile.png')
                }
                return <Image style={{width: 24, height: 24}} source={icon} />
            },
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {borderTopColor: colors.lightGray}
            })}
            >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Favorites" component={Favorites} />
            <Tab.Screen name='Profile' component={Profile} />
        </Tab.Navigator>
    )
}

const App = () => {
    const theme = {
        colors: {
            background: colors.white
        }
    }

    return (
        <SafeAreaProvider>
            <Stack.Navigator 
                screenOptions={{
                    contentStyle: { backgroundColor: theme.colors.background },
                    headerShown: false 
                }}
            >
                {isSignedin ? (
                    <>
                        <Stack.Screen name="Tabs" component={Tabs} />
                        <Stack.Screen name="ProductDetails" component={ProductDetails} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Splash" component={Splash} />
                        <Stack.Screen name="Signup" component={Signup} />
                        <Stack.Screen name="Signin" component={SignIn} />
                    </>
                )}
            </Stack.Navigator>
        </SafeAreaProvider>
    )
}

export default React.memo(App)