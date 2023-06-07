import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const saveData = async () => {
    // Validate name
    if (!name || name.length > 15) {
      setNameError(true);
      return;
    } else {
      setNameError(false);
    }

    // Validate age
    if (!age || isNaN(Number(age))) {
      setAgeError(true);
      return;
    } else {
      setAgeError(false);
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    console.warn("next ");

    let url = "http://10.0.2.2:3000/users";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age, email })
    });
    const result = await response.json();
    if (result) {
      console.warn('data entered');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={{ fontSize: 20, color: 'skyblue', fontWeight: "bold" ,marginTop:20}}>POST API with Input Field</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter Your Name"
      />
      {nameError ?<Text style={styles.errorText}>Please Enter a Valid Name (max 15 characters)</Text>:null}
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={(text) => setAge(text)}
        placeholder="Enter Your Age"
        keyboardType="numeric"
      />
      {ageError ? <Text style={styles.errorText}>Please Enter a Valid Age</Text>:null}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Enter Your Email"
      />
      {emailError ? <Text style={styles.errorText}>Please Enter a Valid Email</Text>:null}
      <Button title="Save data" onPress={saveData} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "70%",
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'lightgray',
    margin: 15,
    textAlign: 'center'
  },
  errorText: {
    color: 'red'
  }
});


export default App;
