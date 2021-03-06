import React, { useContext, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Picker } from '@react-native-picker/picker';
import styles from '../../../styles/create';
import { UserContext } from '../../../context/UserContext'

export default function CreateScreen({ navigation }) {
    const { updateUserInfo } = useContext(UserContext);

    const [info, setInfo] = useState({})
    const [person, setPerson] = useState('')
    const [beacon, setBeacon] = useState('')
    const [gender, setGender] = useState('')
    const [locationOne, setLocationOne] = useState('')
    const [gatewayOne, setGatewayOne] = useState('')
    const [locationTwo, setLocationTwo] = useState('')
    const [gatewayTwo, setGatewayTwo] = useState('')
    
    const onAddButtonPress = () => {
        if(gender == '' || gender == '-1'){
            Alert.alert("Gender not selected!", "Select gender to proceed.");
        } else if (!person || !beacon || !gender || !locationOne || !gatewayOne || !locationTwo || !gatewayTwo){
            Alert.alert("Form is not completed!", "Fill up the remaining fields to proceed.");
        } else {
            info.person = person;
            info.gender = gender;
            
            const locations = [];
            locations.push({tag:locationOne, gateway:gatewayOne});
            locations.push({tag:locationTwo, gateway:gatewayTwo});
            info.location = locations;
            setInfo({...info});
            
            updateUserInfo({ info, beacon })
            navigation.navigate('Home')
        }
    } 

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../../assets/old-age-home.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Person Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setPerson(text)}
                    value={person}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Picker
                    style={styles.picker}
                    selectedValue={gender}
                    onValueChange={(itemValue) =>
                        setGender(itemValue)
                    }>
                    <Picker.Item label="Click to select gender ..." value="-1"/>
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                </Picker>
                <TextInput
                    style={styles.input}
                    placeholder='Beacon Mac Address'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setBeacon(text)}
                    value={beacon}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Location Name #1'
                    onChangeText={(text) => setLocationOne(text)}
                    value={locationOne}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Gateway Mac Address #1'
                    onChangeText={(text) => setGatewayOne(text)}
                    value={gatewayOne}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Location Name #2'
                    onChangeText={(text) => setLocationTwo(text)}
                    value={locationTwo}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Gateway Mac Address #2 '
                    onChangeText={(text) => setGatewayTwo(text)}
                    value={gatewayTwo}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onAddButtonPress()}>
                    <Text style={styles.buttonTitle}>Save</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}