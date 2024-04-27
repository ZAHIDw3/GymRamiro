import React, { useContext} from "react";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const HeaderLista = () => {
    const navigation = useNavigation();

  const showLogoutConfirmation = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sí",
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.leftButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back-outline" size={30} color="#FFFF" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.rightButton} >
        <Ionicons name="person-add-outline" size={30} color="#FFFF"  onPress={() => navigation.navigate('Agregar')}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B396A",
    flexDirection: "row", // Alinea los elementos horizontalmente
    justifyContent: "space-between", // Distribuye los elementos a los lados
    alignItems: "center", // Centra los elementos verticalmente
    paddingHorizontal: 16, // Añade espacio horizontal
  },
  leftButton: {
    marginRight: 16, // Espacio a la derecha del botón izquierdo
    marginBottom: 16, // Margen inferior del botón izquierdo
    marginTop: 16, // Alinea los elementos del botón izquierdo en columna
    alignItems: "center", // Centra los elementos del botón izquierdo verticalmente
  },
  rightButton: {
    marginLeft: 16, // Espacio a la izquierda del botón derecho
    marginBottom: 16, // Margen inferior del botón derecho
    marginTop: 16,
    alignItems: "center", // Centra los elementos del botón derecho verticalmente
  },
  buttonText: {
    color: "#FFFF",
    fontSize: 13,
  },
});

export default HeaderLista;