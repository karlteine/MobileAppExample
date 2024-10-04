import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import Splash from './(auth)/Splash'
import Signup from './(auth)/Signup'
import { colors } from '../utils/colors'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from './(auth)/Sign In'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Stack = createNativeStackNavigator()

const App = () => {
    const theme = {
        colors: {
            background: colors.white
        }
    }

    return (
        <SafeAreaProvider>
            <Stack.Navigator screenOptions={{
                contentStyle: { backgroundColor: theme.colors.background },
                headerShown: false 
            }} >
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Signin" component={SignIn} />
            </Stack.Navigator>
        </SafeAreaProvider>
    )
}

export default React.memo(App)