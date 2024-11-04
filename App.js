import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 

// Import screens
import Login from './Screens/Login'; 
import Setting from './Screens/setting';
import SignupScreen from './Screens/SignupScreen';
import Todo from './Screens/todo';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for main application interface after login
function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Todo') {
          iconName = 'list'; //   Todo List Icon
        } else if (route.name === 'Setting') {
          iconName = 'cog'; //   Setting Icon
        }

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#1AAA95',
      inactiveTintColor: 'gray',
    }}>
      <Tab.Screen name="Todo"   
        component={Todo}     
         options={{ 
          headerShown: true, //  Will show arow to back 
          headerTitle: 'Todo',
          headerBackTitle: 'Back',
          headerTitleAlign: 'center',
        }}  />
      <Tab.Screen name="Setting" 
      component={Setting} 
      options={{ 
        headerShown: true, //  Will show arow to back 
        headerTitle: 'Settings',
        headerBackTitle: 'Back',
        headerTitleAlign: 'center',
      }} />
    </Tab.Navigator>
  );
}

// Stack Navigator for authentication screens (Login, Signup)
function AuthStackNavigator({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: 'Login',  
        headerShown: true, // Arrow will apear to back
        headerTitle: 'Login',
        headerBackTitle: 'Back',
        headerTitleAlign: 'center',}}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ title: 'Sign Up' ,
        headerShown: true, // Arrow will apear to back
        headerTitle: 'Sign Up',
        headerBackTitle: 'Back',
        headerTitleAlign: 'center',}}
      />
      {/* When Login is successful, navigate to TabNavigator */}
      <Stack.Screen
        name="MainApp"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Main App component
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {/* If logged in, show the Tab Navigator; otherwise, show the Auth Stack Navigator */}
      {isLoggedIn ? <TabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

