import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  const [contacts, setContacts] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} />}
        </Stack.Screen>

        <Stack.Screen name="CadastroUsuario">
          {(props) => <RegisterScreen {...props} />}
        </Stack.Screen>

        <Stack.Screen name="ListaContatos">
          {(props) => (
            <ContactListScreen
              {...props}
              contacts={contacts}
              setContacts={setContacts}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="NovoContato">
          {(props) => (
            <CreateContactScreen
              {...props}
              contacts={contacts}
              setContacts={setContacts}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="EditarContato">
          {(props) => (
            <EditContactScreen
              {...props}
              contacts={contacts}
              setContacts={setContacts}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* ---------------- LOGIN ---------------- */

function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>L O G I N</Text>

      <TextInput placeholder="login" style={styles.input} />
      <TextInput placeholder="senha" secureTextEntry style={styles.input} />

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate("ListaContatos")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("CadastroUsuario")}>
        <Text style={styles.link}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------------- CADASTRO USUÁRIO ---------------- */

function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>C A D A S T R O  D E  U S U Á R I O S</Text>

      <TextInput placeholder="nome" style={styles.input} />
      <TextInput placeholder="cpf" style={styles.input} />
      <TextInput placeholder="email" style={styles.input} />
      <TextInput placeholder="senha" secureTextEntry style={styles.input} />

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------------- LISTA ---------------- */

function ContactListScreen({ navigation, contacts }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>L I S T A  D E  C O N T A T O S</Text>

      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => navigation.navigate("NovoContato")}
      >
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() =>
              navigation.navigate("EditarContato", { id: item.id })
            }
          >
            <Text style={styles.contactName}>{item.nome}</Text>
            <Text>{item.telefone}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

/* ---------------- NOVO CONTATO ---------------- */

function CreateContactScreen({ navigation, contacts, setContacts }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  function salvar() {
    const novo = {
      id: Date.now().toString(),
      nome,
      email,
      telefone
    };
    setContacts([...contacts, novo]);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>C A D A S T R O  D E  C O N T A T O</Text>

      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Telefone" value={telefone} onChangeText={setTelefone} style={styles.input} />

      <TouchableOpacity style={styles.primaryButton} onPress={salvar}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------------- EDITAR CONTATO ---------------- */

function EditContactScreen({ route, navigation, contacts, setContacts }) {
  const { id } = route.params;
  const contato = contacts.find((c) => c.id === id);

  const [nome, setNome] = useState(contato?.nome || "");
  const [email, setEmail] = useState(contato?.email || "");
  const [telefone, setTelefone] = useState(contato?.telefone || "");

  function alterar() {
    const atualizados = contacts.map((c) =>
      c.id === id ? { ...c, nome, email, telefone } : c
    );
    setContacts(atualizados);
    navigation.goBack();
  }

  function excluir() {
    const filtrados = contacts.filter((c) => c.id !== id);
    setContacts(filtrados);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        A L T E R A Ç Ã O / E X C L U S Ã O  D E  C O N T A T O S
      </Text>

      <TextInput value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput value={telefone} onChangeText={setTelefone} style={styles.input} />

      <TouchableOpacity style={styles.primaryButton} onPress={alterar}>
        <Text style={styles.buttonText}>Alterar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={excluir}>
        <Text style={styles.buttonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------------- ESTILOS ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#f1ce5b"
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 30,
    fontWeight: "bold"
  },
  input: {
    borderWidth: 1,
    borderColor: "#000000",
    padding: 15,
    marginBottom: 15,
  },
  primaryButton: {
    backgroundColor: "#000",
    padding: 12,
    alignItems: "center",
    marginBottom: 15
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 12,
    alignItems: "center",
    marginTop: 10
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold"
  },
  link: {
    textAlign: "center",
    marginTop: 10
  },
  plusButton: {
    alignSelf: "center",
    marginBottom: 20
  },
  plusText: {
    fontSize: 30
  },
  contactItem: {
    marginBottom: 15,
    borderBottomWidth: 1,
    paddingBottom: 5
  },
  contactName: {
    fontWeight: "bold"
  }
});
