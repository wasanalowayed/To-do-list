import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Platform, ActivityIndicator } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
const SignupScreen = ({navigation}) => {
  // State variables to store user input
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false); // Loading state variable

  // Validation and Registration logic
  const handleRegister = () => {
    setLoading(true); // Start loading when "Sign Up" is pressed

    // Simulating data processing (You can replace this with real registration logic)
    setTimeout(() => {
      // Check if fields are not empty
      if (!username || !email || !password || !mobile) {
        Alert.alert('Error', 'Please fill in all fields.');
        setLoading(false); // Stop loading in case of error
        return;
      }

      // Check for valid email
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        Alert.alert('Error', 'Please enter a valid email.');
        setLoading(false); // Stop loading in case of error
        return;
      }

      // Check password length
      if (password.length < 6) {
        Alert.alert('Error', 'Password should be at least 6 characters long.');
        setLoading(false); // Stop loading in case of error
        return;
      }

      // If all validations pass
      setLoading(false); // Stop loading
      Alert.alert('Success', 'Your account has been created successfully.');
      navigation.navigate('MainApp'); // Navigate to MainApp

      
    }, 2000); // Simulated registration time (Send data to backend for validation and account creation)
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.createAccountText}>Create account</Text>

        {/* Input fields */}
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={24} color={'#9A9A9A'} style={styles.inputIcon} />
          <TextInput 
            style={styles.textInput} 
            placeholder="Username" 
            placeholderTextColor="#34495E"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <AntDesign name="mail" size={24} color={'#9A9A9A'} style={styles.inputIcon} />
          <TextInput 
            style={styles.textInput} 
            placeholder="E-mail" 
            placeholderTextColor="#34495E"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Fontisto name="locked" size={24} color="#9A9A9A" style={styles.inputIcon} />
          <TextInput 
            style={styles.textInput} 
            placeholder="Password" 
            secureTextEntry 
            placeholderTextColor="#34495E"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <AntDesign name="mobile1" size={24} color={'#9A9A9A'} style={styles.inputIcon} />
          <TextInput 
            style={styles.textInput} 
            placeholder="Mobile" 
            placeholderTextColor="#34495E"
            value={mobile}
            onChangeText={setMobile}
          />
        </View>

        {/* "Sign Up" button with loading indicator */}
        {loading ? (
          <ActivityIndicator size="large" color="#1AAA95"  />
        ) : (
          <TouchableOpacity style={styles.buttonContainer} onPress={() => {
            handleRegister(); // Call your registration handler
          }}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Platform.OS === 'ios' ? '#EBF0E7' : '#EBF1E7',
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  createAccountText: {
    textAlign: 'center',
    fontSize: 30,
    color: '#34495E', 
    marginBottom: 30,
    fontWeight: 'bold',
  },
  inputContainer: {
    backgroundColor: "#D0E0D0", 
    flexDirection: "row",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    elevation: 5,
    marginVertical: 10,
    alignItems: "center",
    height: 50,
    width: 350,
  },
  inputIcon: {
    marginLeft: 10,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#34495E',
  },
  buttonContainer: {
    backgroundColor: "#1AAA95", 
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: "center",
    width: 350,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});