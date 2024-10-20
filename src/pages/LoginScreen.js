import React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { getAnalytics } from "firebase/analytics";

import FormRow from "../components/FormRow";
import firebase from "firebase/compat/app";

import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  initializeAuth,
  getReactNativePersistence,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoading: false,
      message: "",
    };
  }

  componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyBd_2YGm2bkwM60LtSO3cIaQ6OuGBTnnd0",
      authDomain: "series-38763.firebaseapp.com",
      projectId: "series-38763",
      storageBucket: "series-38763.appspot.com",
      messagingSenderId: "451500018246",
      appId: "1:451500018246:web:a05325e150e90f69729847",
      measurementId: "G-WMNYFVD71E",
    };

    if (getApps().length === 0) {
      const app = initializeApp(firebaseConfig);

      initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
      });
    } else {
      getAuth();
    }
  }
  onChangeHandler(field, value) {
    this.setState({ [field]: value });
  }

  tryLogin() {
    this.setState({ isLoading: true, message: "" });
    const { email, password } = this.state;
    const loginUserSuccess = (user) => {
      this.setState({ message: "Sucesso!" });
    };

    const loginUserFailed = (error) => {
      this.setState({ message: this.getMessageByErrorCode(errorCode) });
    };
    signInWithEmailAndPassword(getAuth(), email, password)
      .then(loginUserSuccess)
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          Alert.alert(
            "Usuário não encontrado",
            "Deseja criar um cadastro com as informações inseridas?",
            [
              {
                text: "Não",
              },
              {
                text: "Sim",
                onPress: () => {
                  createUserWithEmailAndPassword(getAuth(), email, password)
                    .then(loginUserSuccess)
                    .catch(loginUserFailed);
                },
              },
            ],
            { cancelable: false }
          );
          return;
        }
        loginUserFailed;
      })
      .then(() => this.setState({ isLoading: false }));
  }

  getMessageByErrorCode(errorCode) {
    switch (errorCode) {
      case "auth/wrong-password":
        return "Senha incorreta";
      case "auth/user-not-found":
        return "Usário não encontrado";
      default:
        return "Erro desconhecido";
    }
  }

  renderMessage() {
    const { message } = this.state;
    if (!message) return null;

    return (
      <View>
        <Text>{message}</Text>
      </View>
    );
  }
  renderButton() {
    if (this.state.isLoading) return <ActivityIndicator color={"#006494"} />;
    return (
      <View style={styles.buttonContainer}>
        <Button
          title="Entrar"
          color="#006494" // Texto branco no botão
          onPress={() => this.tryLogin()}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FormRow first={true}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={this.state.email}
            onChangeText={(value) => this.onChangeHandler("email", value)}
          />
        </FormRow>
        <FormRow last={true}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(value) => this.onChangeHandler("password", value)}
          />
        </FormRow>

        {this.renderButton()}
        {this.renderMessage()}

        {/* Contêiner com estilo */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  input: {
    paddingLeft: 5,
    paddingBottom: 5,
    paddingRight: 5,
    borderRadius: 10,
  },
  buttonContainer: {
    backgroundColor: "#008CBA", // cor personalizada do botão
    borderRadius: 20, // bordas arredondadas
    overflow: "hidden", // faz com que o conteúdo respeite o borderRadius
    marginTop: 15,
  },
});
