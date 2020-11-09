import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground, Image, Alert } from "react-native";
import firebase from "../database/firebase";
import { Button, Input } from "react-native-elements";

function DetailAnimals(props) {
  const inicialState = {
    id: "",
    name: "",
    age: "",
    gender: "",
    weight: "",
  };

  //estados
  const [animal, setAnimal] = useState(inicialState);

  const getAnimalById = async (id) => {
    const dbref = firebase.bd.collection("Animals").doc(id);
    const doc = await dbref.get();
    const animal = doc.data();
    console.log(animal);

    setAnimal({ ...animal, id: doc.id });
  };

  useEffect(() => {
    getAnimalById(props.route.params.animalId);
  }, []);

  //funciones
  const changeAnimal = (name, value) => {
    setAnimal({ ...animal, [name]: value });
  };

  const deleteAnimal = async () => {
    const dbref = firebase.bd
      .collection("Animals")
      .doc(props.route.params.animalId);
    await dbref.delete();

    props.navigation.navigate("Listado Animales");
  };

  const updateAnimal = async () => {
    const dbref = firebase.bd
      .collection("Animals")
      .doc(props.route.params.animalId);
    await dbref.set({
      name: animal.name,
      age: animal.age,
      gender: animal.gender,
      weight: animal.weight,
    });

    setAnimal(inicialState);
    props.navigation.navigate("Listado Animales");
  };

  const confirAlertDelete = () => {
    Alert.alert("¿Eliminar?", "¿Estas seguro de eliminar el Animalito?", [
      { text: "SI", onPress: () => deleteAnimal() },
      { text: "No", onPress: () => console.log("Cancelado") },
    ]);
  };

  return (
    <ImageBackground
      source={require("../assets/animalitos.jpg")}
      style={styles.image}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.tinyLogo}
          source={require("../assets/zorrita.png")}
        />
      </View>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Nombre del animal"
          leftIcon={{
            type: "font-awesome",
            name: "paw",
            color: "#5A3D28",
            style: { marginRight: 15 },
          }}
          value={animal.name}
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
          value={animal.age}
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
          value={animal.gender}
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
          value={animal.weight}
          onChangeText={(value) => changeAnimal("weight", value)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Actualizar Animalito "
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
          onPress={() => updateAnimal()}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Eliminar "
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
          onPress={() => deleteAnimal()}
        />
      </View>
    </ImageBackground>
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
    marginLeft: 25,
    marginRight: 25,
  },
  buttonContainer: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
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

export default DetailAnimals;
