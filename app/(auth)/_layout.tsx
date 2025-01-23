import { Stack } from 'expo-router'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useDB } from '@/hooks/useDB';
import { useEffect } from 'react';
import { router } from 'expo-router';

const AuthLayout = () => {
  const { user } = useDB();
  useEffect(() => {
    if (user) {
      router.replace("/(tabs)/projects");
    }
  }, [user]);
  return (
      <>
          <Stack>
              <Stack.Screen
          name="sign-in"
                options={{
                    headerShown: false,
                    title: "Sign In",
                }}
              />
              <Stack.Screen
                name="sign-up"
                options={{
                  headerShown: false,
                  title: "Sign Up",
                }}
            />
          </Stack>
          <StatusBar backgroundColor='#ff0000' style='light' />

        </>
  )
}

export default AuthLayout;