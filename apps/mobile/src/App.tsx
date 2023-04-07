import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { trpc, trpcProxy } from './utils/trpc';
import { httpBatchLink } from '@trpc/client';
import { useFonts } from 'expo-font';
import { LoginContext } from './context/LoginContext';
import { AuthContext } from './context/AuthContext';
import { getCredentials } from './shared/getCredentials';
import { StatusBar } from 'expo-status-bar';
import { RootStackParamList } from './types/nav';
import PubNub from 'pubnub';
import { config } from '../config'

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import TeamScreen from './screens/TeamScreen';
import { PubNubProvider } from 'pubnub-react';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentSid, setCurrentSid] = useState('');
  const [fontsLoaded] = useFonts({
    'Inter': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Light': require('../assets/fonts/Inter-Light.ttf'),
  })

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => 
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://192.168.0.242:5678/trpc',
        }),
      ]
    })
  )

  const refetchData = async () => {
    const sid = await getCredentials();

    if (sid) {
      console.log(sid)
      try {
        const user = await trpcProxy.user.self.query({ sid });

        console.log(user)
        if (user) {
          console.log(user)
          setCurrentSid(sid);
          setLoggedIn(true);
        }
      } catch (e) {
        console.error(e);
        setLoggedIn(false);
      }
    }
  }

  const pubnub = new PubNub({
    publishKey: config.pubnubPublishKey,
    subscribeKey: config.pubnubSubscribeKey,
    userId: 'abcdefg'
  });

  useEffect(() => {
    refetchData();
  }, [])


  if (!fontsLoaded) {
    return null;
  }

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ sid: currentSid, setSid: setCurrentSid }}>
          <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
            <PubNubProvider client={pubnub}>
              <NavigationContainer>
                <Stack.Navigator screenOptions={{
                  headerShown: false
                }}>
                  {loggedIn ?
                  (
                    <>
                      <Stack.Screen name="Home" component={HomeScreen} />
                      <Stack.Screen name="Team" component={TeamScreen} />
                    </>
                  ) : (
                      <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                      />
                  )
                  }
                </Stack.Navigator>
              </NavigationContainer>
            </PubNubProvider>
          </LoginContext.Provider>
        </AuthContext.Provider>
      </QueryClientProvider>
      <StatusBar style="light" />
    </trpc.Provider>
  );
}
