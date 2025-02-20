import React, {useRef, useState} from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import AudioRecordingSending from "../../components/audio/AudioRecordingSending";
import {Audio} from 'expo-av';
import {Images} from "../../constants/Images";
import ResultHolder from "../../components/audio/ResultHolder";
import {Fonts} from "../../constants/Fonts";
import {Colors} from "../../constants/Colors";
import ApiService from "../../services/ApiService";

export default function SerScreen() {
    const [recording, setRecording] = useState(null);
    const [recordings, setRecordings] = useState([]);
    const [recordingPath, setRecordingPath] = useState('');
    const [recordingTitle, setRecordingTitle] = useState('');
    const [recorded, setRecorded] = useState(false);

    const ref = useRef(null);

    async function startRecording() {
        try {
            const permissionResponse = await Audio.requestPermissionsAsync();
            if (permissionResponse.status === "granted") {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true
                });

                const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
                setRecording(recording);
            }
        } catch (err) {
            console.warn(err);
        }
    }

    async function stopRecording() {
        if (!recording) return;

        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecording(null);

        if (uri) {
            setRecorded(true);
            setRecordingPath(uri);

            // Ensure the title is set AFTER recordingPath updates
            const newTitle = getRecordingTitle();
            setRecordingTitle(newTitle);
            console.log(`Recording saved: ${newTitle} at ${uri}`);
        }

        const { sound, status } = await recording.createNewLoadedSoundAsync();
        setRecordings(prevRecordings => [
            ...prevRecordings,
            { sound, duration: getDurationFormatted(status.durationMillis), file: uri }
        ]);
    }

    function getDurationFormatted(milliseconds) {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.round((milliseconds % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    function getRecordingsLines() {
        return recordings.map((recording, index) => (
            <View key={index} style={styles.row}>
                <Text style={styles.fill}>
                    {recordingTitle || `Recording #${index + 1}`} | {recording.duration}
                </Text>
                <Button onPress={() => recording.sound.replayAsync()} title="Play" />
            </View>
        ));
    }

    function clearRecordings() {
        setRecordings([]);
        setRecordingPath('');
        setRecordingTitle('');
        setRecorded(false);
        console.log({ recording_path: recordingPath, recording_title: recordingTitle });
    }


    async function onSendingPressed() {
        try {
            setRecordings([]);
            setRecordingPath('');
            setRecordingTitle('');
            setRecorded(false);
            const dataToSend = {"url": recordingPath, "generatedTitle":recordingTitle};

            console.log("Send audio recording with data: ", dataToSend)

            const statusCode = await ApiService.addAudioRecording(dataToSend);
            console.log("Audio recording statusCode response:", statusCode);

        } catch (error) {
            console.log(error);
        }
    }

    function getRecordingTitle() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `Recording_${year}${month}${day}_${hours}${minutes}${seconds}`;
    }

    return (
        <View style={styles.container}>
            <ResultHolder
                title="Results"
                description="The result of the emotion type will appear in this area."
            />

            <AudioRecordingSending
                title={recording ? "Stop recording" : "Start recording"}
                imageMicrophone={recording ? Images.microphoneRed : Images.microphoneBlue}
                imageSend={recordings.length > 0 ? Images.sendIconBlue : Images.sendIconGray}
                isRecorded={!recorded}
                onRecording={recording ? stopRecording : startRecording}
                view={getRecordingsLines()}
                onSending={onSendingPressed}
                onCancelling={clearRecordings}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    fill: {
        flex: 1,
        margin: 15,
        fontFamily: Fonts.Light,
    },
});
