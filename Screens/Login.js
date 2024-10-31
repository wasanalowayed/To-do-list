import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import react from 'react';

export default function Login({navigation}) {


  // State variables to store user input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
const handleRegisterL = () => {
  setLoading(true);
  setTimeout(() => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters long.');
      setLoading(false);
      return;
    }

    setLoading(false);
    navigation.navigate('MainApp'); // Navigae to main app
  }, 2000);
};



  return (
    <View style={styles.containerL}>
      <View style={styles.loginContainerL}>
        <Text style={styles.loginTextL}>Login</Text>
      </View>
      <Text style={styles.loginSentenceL}>Login to your account</Text>
      <View style={styles.inputContainerL}>
        <FontAwesome name="user" size={24} color={'#9A9A9A'} style={styles.inputIconL} />
        <TextInput style={styles.textInputL}
          placeholder="Username"
          placeholderTextColor="#34495E"
          value={username}
          onChangeText={setUsername} />
      </View>

      <View style={styles.inputContainerL}>
        <Fontisto name="locked" size={24} color="#9A9A9A" style={styles.inputIconL} />
        <TextInput style={styles.textInputL}
          placeholder="Password"
          placeholderTextColor="#34495E"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Text style={styles.forgotPassL}>Don't have an account? <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate('SignupScreen')}>Create</Text></Text>

      <TouchableOpacity style={styles.signInBtnContainerL} onPress={ () => {
        handleRegisterL();
        navigation.navigate('todo');

      }} >
        <Text style={styles.SignInL}>Sign in</Text>
      </TouchableOpacity>


    </View>


  );
}

//handleRegisterL

const styles = StyleSheet.create({
  containerL: {
    flex: 1,
    backgroundColor: '#EBF1E7',
    alignItems: 'center',
    //justifyContent: 'center',
  },

  loginTextL: {
    textAlign: 'center',
    color: '#34495E',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    top: 150,
  },

  loginSentenceL: {
    textAlign: 'center',
    color: '#34495E',
    top: 155,
    marginRight: 10, // Small spacing
  },

  inputContainerL: {
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
    top: 200,
  },

  textInputL: {
    flex: 1,
    fontSize: 16,
    color: '#34495E',
  },

  inputIconL: {
    marginLeft: 10,
    marginRight: 10,
  },

  forgotPassL: {
    top: 420,
    color: '#34495E',
    textAlign: 'center',
    width: '90%',
    fontSize: 16.5,
    marginBottom: 30,
  },

  signInBtnContainerL: {
    top: 230,
    backgroundColor: "#1AAA95",
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: "center",
    width: 350,
  },

  SignInL: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

});
