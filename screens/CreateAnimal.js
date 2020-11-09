import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { Button, Input } from "react-native-elements";
import firebase from "../database/firebase";

function CreateAnimal(props) {
  //estados
  const [state, setState] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
  });

  //funciones
  const changeAnimal = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const createNewAnimal = async () => {
    if (
      state.name === "" ||
      state.age === "" ||
      state.gender === "" ||
      state.weight === ""
    ) {
      alert("Por favor valide los campos");
    } else {
      await firebase.bd.collection("Animals").add({
        name: state.name,
        age: state.age,
        gender: state.gender,
        weight: state.weight,
      });
      props.navigation.navigate("Listado Animales");
    }
  };

  //vista
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/animalitos.jpg")}
        style={styles.image}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.tinyLogo}
            source={require("../assets/buho.png")}
          />
        </View>

        <View>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Nombre del animal"
              leftIcon={{
                type: "font-awesome",
                name: "paw",
                color: "#5A3D28",
                style: { marginRight: 15 },
              }}
              onChangeText={(value) => changeAnimal("name", value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Input
              placeholder="Edad"
              leftIcon={{
                type: "font-awesome",
                name: "calendar-minus-o",
                color: "#5A3D28",
                style: { marginRight: 15 },
              }}
              maxLength={3}
              keyboardType="numeric"
              onChangeText={(value) => changeAnimal("age", value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Input
              placeholder="Genero"
              leftIcon={{
                type: "font-awesome",
                name: "intersex",
                color: "#5A3D28",
                style: { marginRight: 15 },
              }}
              onChangeText={(value) => changeAnimal("gender", value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Input
              placeholder="Peso"
              leftIcon={{
                type: "font-awesome",
                name: "snapchat-ghost",
                color: "#5A3D28",
                style: { marginRight: 15 },
              }}
              maxLength={44}
              keyboardType="numeric"
              onChangeText={(value) => changeAnimal("weight", value)}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Agregar Animalito "
              type="outline"
              titleStyle={{ color: "#5A3D28" }}
              buttonStyle={{
                textAlign: "center",
                borderWidth: 3,
                borderColor: "#5A3D28",
                backgroundColor: "#DDDDDD",
                width: 200,
                borderRadius: 20,
              }}
              onPress={() => createNewAnimal()}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
  },
  inputContainer: {
    alignContent: "center",
    marginTop: 5,
    marginLeft: 25,
    marginRight: 25,
  },
  button: {
    textAlign: "center",
    borderWidth: 3,
    borderColor: "#5A3D28",
    width: 200,
    borderRadius: 20,
  },
  buttonContainer: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  tinyLogo: {
    width: 130,
    height: 130,
  },
});

export default CreateAnimal;
