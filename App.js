import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  } from 'react-native';
import { Button, TextInput } from 'react-native-web';
import { SafeAreaView } from 'react-native-web';
export default function App() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imagem}
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        }}

      />

      <Text>Email</Text>
      <TextInput
        placeholder='Email'
        style={styles.input}
        keyboardType='email-address'
      />
      <Text>Senha</Text>
      <TextInput
        placeholder='Digite sua senha'
        style={styles.input}
        secureTextEntry
      />
      <SafeAreaView>
        <Button title='Logar'
          color='#67cf36'
        ></Button>

        <Button title='Cadastrar-se'
          color='#67cf36'
        ></Button>
      </SafeAreaView>
      <Text>Esqueceu a senha</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  imagem: {
    height: 100,
    width: 100,
  }
});
