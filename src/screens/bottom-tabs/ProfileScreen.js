import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { SCREEN_WIDTH } from "../../constants/ScreenDimensions";
import CustomTextInput from "../../components/CustomTextInput";
import { useForm } from "react-hook-form";
import WelcomeTitle from "../../components/WelcomeTitle";
import { Colors } from "../../constants/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import ApiService from "../../services/ApiService";

export default function ProfileScreen() {
    const { control, setValue } = useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [secureEntry, setSecureEntry] = useState(true);
    const [userData, setUserData] = useState(null); // State to hold user data

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await ApiService.getUserInfo(); // Await the asynchronous call
                setUserData(data); // Store user data in state
                // Pre-fill the input fields with user data
                if (data) {
                    setValue("username", data.username);
                    setValue("email", data.email);
                    setValue("password", data.password);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData(); // Call the async function
    }, [setValue]);

    const togglePasswordVisibility = () => {
        setSecureEntry((prev) => !prev);
    };

    const onEditPressed = () => {
        setIsEditing((prev) => !prev);
        console.log("input should be editable now");
    };

    const onSavePressed = () => {
        console.log("onSaveChangesPressed");
        setIsEditing(false);
        setSecureEntry(true);
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.welcomeContainer}>
                    <WelcomeTitle textLine1={"View & Edit"} textLine2={"Your personal Info"} />
                </View>


                <View style={styles.shadowContainer}>
                    <View style={styles.profileDataContainer}>
                        <CustomTextInput
                            name="username"
                            placeholder="Enter your username"
                            iconName={"person-outline"}
                            isIonIcon={true}
                            control={control}
                            rules={{ required: "Username is required" }}
                            editable={isEditing}
                        />

                        <CustomTextInput
                            name="email"
                            placeholder="Enter your email"
                            iconName={"mail-outline"}
                            isIonIcon={true}
                            control={control}
                            rules={{ required: "Email is required" }}
                            editable={isEditing}
                        />

                        <CustomTextInput
                            name="password"
                            placeholder="Enter your password"
                            iconName={"lock"}
                            isSimpleLineIcons={true}
                            onPress={togglePasswordVisibility}
                            control={control}
                            rules={{
                                required: "Password is required",
                                minLength: { value: 4, message: 'Password should be minimum 5 characters long' }
                            }}
                            secureTextEntry={secureEntry}
                            showEyeTogglePart={true}
                            editable={isEditing}
                        />
                    </View>

                    <View style={styles.iconButtonsContainer}>
                        <TouchableOpacity onPress={onEditPressed} disabled={isEditing}>
                            <MaterialCommunityIcons
                                name="account-edit-outline"
                                size={50}
                                color={!isEditing ? Colors.primaryColor_EA458E : Colors.borderColor_AEB5BB}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onSavePressed} style={{ marginLeft: 20 }} disabled={!isEditing}>
                            <Ionicons
                                name="save-outline"
                                size={50}
                                color={isEditing ? Colors.primaryColor_EA458E : Colors.borderColor_AEB5BB}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    safeArea: {
        padding: 10,
    },
    welcomeContainer: {
        alignSelf: "center",
        justifyContent: "center",
    },
    profileDataContainer: {
        alignSelf: "center",
        justifyContent: "center",
        width: SCREEN_WIDTH * 0.9,
        margin: 10,
        padding: 10,
        borderRadius: 12,
        backgroundColor: Colors.white,
    },
    shadowContainer: {
        backgroundColor: Colors.white,
        shadowColor: Colors.primaryColor_EA458E,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 10,
        borderRadius: 12,
        padding: 10,
        margin: 10,
    },
    iconButtonsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: Colors.white,
        borderRadius: 12,
    },
});
