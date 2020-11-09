import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, ImageBackground } from "react-native";
import firebase from "../database/firebase";
import { Button, ListItem, Avatar } from "react-native-elements";

function ListAnimals(props) {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    firebase.bd.collection("Animals").onSnapshot((querySnapshot) => {
      const animals = [];

      querySnapshot.docs.forEach((doc) => {
        const { name, age, gender, weight } = doc.data();
        animals.push({
          id: doc.id,
          name,
          age,
          gender,
          weight,
        });
      });

      console.log(animals);
      setAnimals(animals);
    });
  }, []);

  return (
    <ImageBackground
      source={require("../assets/animalitos.jpg")}
      style={styles.image}
    >
      <ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            title="Registrar un nuevo animalito "
            type="outline"
            titleStyle={{ color: "#5A3D28" }}
            buttonStyle={{
              textAlign: "center",
              borderWidth: 3,
              borderColor: "#5A3D28",
              width: 300,
              borderRadius: 20,
              margin: 15,
            }}
            onPress={() => props.navigation.navigate("Creacion Animales")}
          />
        </View>
        {animals.map((animal) => {
          return (
            <ListItem
              key={animal.id}
              bottomDivider
              onPress={() =>
                props.navigation.navigate("Detalle Animales", {
                  animalId: animal.id,
                })
              }
            >
              <ListItem.Chevron />
              <Avatar
                source={{
                  uri:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKMA6QRdBuT1r7O4o23UHiMHsKsdDsg_nG9Q&usqp=CAU",
                }}
              />
              <ListItem.Content>
                <ListItem.Title>{animal.name}</ListItem.Title>
                <ListItem.Subtitle>{animal.gender}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  button: {
    textAlign: "center",
    borderWidth: 3,
    borderColor: "#5A3D28",
    width: 300,
    borderRadius: 20,
    margin: 15,
  },
  buttonContainer: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
  },
});

export default ListAnimals;
