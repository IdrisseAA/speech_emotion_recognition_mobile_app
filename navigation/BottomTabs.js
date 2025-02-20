import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import HomeScreen from "../src/screens/bottom-tabs/HomeScreen";
import HistoricScreen from "../src/screens/bottom-tabs/HistoricScreen";
import SerScreen from "../src/screens/bottom-tabs/SerScreen";
import ProfileScreen from "../src/screens/bottom-tabs/ProfileScreen";

import CustomBottomTab from "../src/components/bottom-tabs/CustomBottomTab";
import AboutScreen from "../src/screens/bottom-tabs/AboutScreen";

const BottomTab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <BottomTab.Navigator id="BottomNav" tabBar={props => <CustomBottomTab {...props}/>}>
            <BottomTab.Group screenOptions={{headerShown: false, }}>
                <BottomTab.Screen name="Home" component={HomeScreen} options={{tabBarLabel: "Home"}}/>
                <BottomTab.Screen name="Settings" component={HistoricScreen} options={{tabBarLabel: "Settings"}}/>
                <BottomTab.Screen name="SER" component={SerScreen} options={{tabBarLabel: "SER"}}/>
                <BottomTab.Screen name="About" component={AboutScreen} options={{tabBarLabel: "About"}}/>
                <BottomTab.Screen name="Profile" component={ProfileScreen} options={{tabBarLabel: "Profile"}}/>
            </BottomTab.Group>
        </BottomTab.Navigator>

    );
};