import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Image, Dimensions} from 'react-native';
import CustomIconButton from "./CustomIconButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {Colors} from "../../constants/Colors";

const window = Dimensions.get('window');

export default function AudioRecordingSending ({imageMicrophone, isRecorded, view, onRecording, onSending, onCancelling}) {

    const cancellingColor = isRecorded ? "gray" : "red";
    const sendingColor = isRecorded ? "gray" : "green";

    return(
        <View style={styles.viewContainer}>
            { /* Recording part */ }
            <View style={styles.microphoneContainer}>
                <TouchableOpacity
                    onPress={onRecording}
                    accessible={true}
                >
                    <Image
                        source={imageMicrophone}
                        style={styles.imageMicrophone}
                        onError={() => console.warn("Failed to load record button image")}
                    />
                </TouchableOpacity>
            </View>

            { /* AudioHolder part*/ }
            <View style={styles.cancellingSendingContainer}>
                { /* cancelling  part */ }
                <CustomIconButton IconType={MaterialIcons} iconName={"cancel"} color={cancellingColor} onPress={onCancelling}/>

                { /* cancelling  part */ }
                <View style={styles.waveAudioContainer}>
                    {view}
                </View>

                { /* Sending part */ }
                <CustomIconButton IconType={MaterialCommunityIcons} iconName={"send-circle"} color={sendingColor} onPress={onSending}/>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    viewContainer:{
        position: 'absolute',
        bottom: 'auto',
        marginBottom: "20%",
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        //backgroundColor: 'yellow',
        borderColor: Colors.borderColor_AEB5BB,
        borderWidth: .25,
        borderRadius: 15,
        width: window.width * 0.9,

    },
    microphoneContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        width: window.width * 0.22,
        height: window.width * 0.22,
        //backgroundColor: 'pink',
    },
    cancellingSendingContainer: {
        //backgroundColor: 'orange',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 5,
        width: window.width * 0.9,
        height: window.width * 0.20,
    },
    waveAudioContainer:{
        alignSelf: "center",
        backgroundColor: 'brown',
        width: window.width * 0.6,
        height: window.width * 0.13,
        borderRadius:10,
        borderWidth: 0.5,
        borderColor: Colors.borderColor_AEB5BB,

    },
    imageMicrophone:{
        width: window.width * 0.2,
        height: window.width * 0.2,
        resizeMode: 'contain',
    },

});