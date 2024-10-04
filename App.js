//Adicionar import { StatusBar } from 'expo-status-bar'; <StatusBar style="auto" />

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/pages/LoginScreen'

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        title: "Series",
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: "#6ca2f7",
          borderBottomWidth: 1,
          borderBottomColor: '#c5c5c5',
        },
        headerTitleStyle: {
          color: "white",
          fontSize: 30,
        },
        headerTitleAlign: "center",
      }}>
        <Stack.Screen name="main" component={LoginScreen} options={{
          title:'Bem vindo!',
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;