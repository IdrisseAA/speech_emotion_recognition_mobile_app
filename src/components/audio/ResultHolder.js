import React from "react";
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Fonts} from "../../constants/Fonts";
import {Colors} from "../../constants/Colors";

const window = Dimensions.get('window');

export default function ResultHolder ({title, description, style}) {
    return(
        <View style={[styles.viewResultContainer, style]}>
            <Text style={styles.heading}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    viewResultContainer: {
        position: 'absolute',
        top: '10%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    heading:{
        fontFamily: Fonts.SemiBold,
        fontSize: 32,
        color: Colors.primaryColor_EA458E,
    },
    description: {
        fontFamily: Fonts.Regular,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: Colors.borderColor_AEB5BB,
        borderRadius: 15,
        padding: 16,
        shadowColor: Colors.primaryColor_EA458E,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14,
        justifyContent: 'center',
        alignItems: 'center',
        width: window.width * 0.90,
        height: window.height * 0.40,
    },
});
