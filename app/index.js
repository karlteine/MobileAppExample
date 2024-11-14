import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import Splash from './(auth)/Splash'
import Signup from './(auth)/Signup'

import Profile from './Profile'
import Home from './Home'
import Favorites from './Favorites'
import Settings from './Settings'
import CreateListing from './CreateListing'

import { colors } from '@utils/colors'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from './(auth)/Sign In'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProductDetails from './ProductDetails'

import { getSession } from '@lib/appWrite'

const Stack = createNativeStackNavigator()

const Tab = createBottomTabNavigator()



const ProfileStack = ({ setIsSignedin }) => {


    return (
        <Stack.Navigator>
            <Stack.Screen name="ProfileScreen" options={{headerShown: false}}>
                {props => <Profile {...props} setIsSignedin={setIsSignedin} />}
            </Stack.Screen>
            <Stack.Screen name="Settings" component={Settings} options={{headerShown: false}}/>
            <Stack.Screen name="CreateListing" component={CreateListing} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

const Tabs = ({ setIsSignedin }) => {
    return (
        <Tab.Navigator 
        screenOptions= {({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let icon

                if (route.name === "Home") {
                    icon = focused
                       ? require('@assets/tabs/home_active.png')
                       : require('@assets/tabs/home.png')
                } else if (route.name === "Favorites") {
                    icon = focused
                       ? require('@assets/tabs/bookmark_active.png')
                       : require('@assets/tabs/bookmark.png')
                } else if (route.name === "Profile") {
                    icon = focused
                       ? require('@assets/tabs/profile_active.png')
                       : require('@assets/tabs/profile.png')
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
            <Tab.Screen name='Profile'>
                {(props) => <ProfileStack {...props} setIsSignedin={setIsSignedin} />} 
            </Tab.Screen>
        </Tab.Navigator>
    )
}

const App = () => {
    const [isSignedin, setIsSignedin] = useState(false);

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const session = await getSession(); 
                setIsSignedin(!!session); 
            } catch (error) {
                setIsSignedin(false);
            }
        };

        checkUserSession();
    }, []);
    
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
                         <Stack.Screen name="Tabs">
            {props => <Tabs {...props} setIsSignedin={setIsSignedin} />} 
        </Stack.Screen>
                        <Stack.Screen name="ProductDetails" component={ProductDetails} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Splash" component={Splash} />
                        <Stack.Screen name="Signup">
                            {props => <Signup {...props} setIsSignedin={setIsSignedin} />} 
                        </Stack.Screen>
                        <Stack.Screen name="Signin">
                            {props => <SignIn {...props} setIsSignedin={setIsSignedin} />}
                        </Stack.Screen>
                    </>
                )}
            </Stack.Navigator>
        </SafeAreaProvider>
    )
}

export default React.memo(App)