import React, {useState} from "react";
import {Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {SCREEN_WIDTH} from "../../constants/ScreenDimensions";
import CustomTextInput from "../../components/CustomTextInput";
import {useForm} from "react-hook-form";
import CustomButton from "../../components/CustomButton";
import {Images} from "../../constants/Images";

export default function ProfileScreen() {
    const {control, handleSubmit, watch} = useForm();
    const [inputEditable, setInputEditable] = useState(false);

    const [secureEntry, setSecureEntry] = useState(true);

    const togglePasswordVisibility = () => {
        setSecureEntry((prev) => !prev);
    };
    const makeTextInputEditable = () => {
        setInputEditable((prev) => !prev);
        console.log("input should be editable now");
    };
    function onSaveChangesPressed() {
        console.log("onSaveChangesPressed");
        setInputEditable(false);
    };


    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.profilePhotoContainer}>
                    <Image
                        source={Images.userImage}
                        style={styles.image}
                        onError={() => console.warn("Failed to load logo")}
                        accessible={true}
                        accessibilityLabel="Speech Emotion Recognition App"
                    />

                </View>
                <View style={styles.profileDataContainer}>

                    <CustomTextInput
                        name="username"
                        placeholder="Enter your username"
                        iconName={"person-outline"}
                        isIonIcon={true}
                        control={control}
                        rules={{required: "Username is required"}}
                        editable={inputEditable}
                    />

                    <CustomTextInput
                        name="email"
                        placeholder="Enter your email"
                        iconName={"mail-outline"}
                        isIonIcon={true}
                        control={control}
                        rules={{required: "Email is required"}}
                        editable={inputEditable}
                    />
                    <CustomTextInput
                        name="password"
                        placeholder="Enter your password"
                        iconName={"lock"}
                        isSimpleLineIcons={true}
                        onPress={togglePasswordVisibility}
                        control={control}
                        rules={
                            {
                                required: "Password is required",
                                minLength: {value: 4, message: 'Password should be minimum 5 characters long'}
                            }}
                        secureTextEntry={secureEntry}
                        showEyeTogglePart={true}
                        editable={inputEditable}
                    />

                    <CustomButton
                        text={inputEditable? "Save changes": "Edit profile data"}
                        onPress={inputEditable? onSaveChangesPressed : makeTextInputEditable}
                    />

                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor:"white",
        flex: 1,
    },
    profilePhotoContainer: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "pink",
        marginTop: 20,
        width: SCREEN_WIDTH * 0.3,
        height: SCREEN_WIDTH * 0.3,

    },
    profileDataContainer: {
        alignSelf: "center",
        borderRadius: 5,
        width: SCREEN_WIDTH * 0.9,
        margin: 20,
    },
    image:{
        flex: 1,
        resizeMode: 'contain'
    }
})