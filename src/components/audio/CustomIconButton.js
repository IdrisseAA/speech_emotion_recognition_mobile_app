import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";

const window = Dimensions.get('window');

export default function CustomIconButton({ IconType, iconName, color, onPress }) {
    const IconComponent = IconType; // Ensure it's a valid component

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} accessible={true}>
                <IconComponent name={iconName} size={50} color={color} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "transparent",
        paddingHorizontal: 2,
        marginHorizontal: 2,
    }
});
