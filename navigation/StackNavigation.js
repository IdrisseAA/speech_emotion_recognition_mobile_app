import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import OnBoardingScreen from "../src/screens/OnBoardingScreen";
import LoginScreen from "../src/screens/LoginScreen";
import SignupScreen from "../src/screens/SignupScreen";
import ForgotPasswordScreen from "../src/screens/ForgotPasswordScreen";
import ReNewPasswordScreen from "../src/screens/ReNewPasswordScreen";
import BottomTabs from "./BottomTabs";


const Stack = createNativeStackNavigator();

export default function StackNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}} id="StackNav">
                <Stack.Screen name="OnBoarding" component={OnBoardingScreen}/>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="SignupScreen" component={SignupScreen} />
                <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
                <Stack.Screen name="ReNewPasswordScreen" component={ReNewPasswordScreen} />

                <Stack.Screen name="MainApp" component={BottomTabs} />

            </Stack.Navigator>
        </NavigationContainer>

    );
};