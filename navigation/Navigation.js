import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateAnimal from "../screens/CreateAnimal";
import DetailAnimals from "../screens/DetailAnimals";
import ListAnimals from "../screens/ListAnimals";

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Listado Animales" component={ListAnimals} />
        <Stack.Screen name="Creacion Animales" component={CreateAnimal} />
        <Stack.Screen name="Detalle Animales" component={DetailAnimals} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
