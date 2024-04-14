import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Lista = () => {
  const navigation = useNavigation();
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      const db = getFirestore();
      const clientesCollection = collection(db, 'clientes');
      const clientesSnapshot = await getDocs(clientesCollection);
      const clientesData = clientesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClientes(clientesData);
    };

    fetchClientes();
  }, []);

  const formatFecha = (fecha) => {
    const date = new Date(fecha.seconds * 1000); // Convertir fecha de Firestore a objeto de fecha de JavaScript
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const renderEstado = (cliente) => {
    const estado = cliente.fechaTermino ? (new Date(cliente.fechaTermino.seconds * 1000) < Date.now() ? 'Inactivo' : 'Activo') : 'Activo';
    return <Text style={[styles.itemText, estado === 'Inactivo' ? styles.inactivoText : styles.activadoText]}>{estado}</Text>;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Informacion', { clienteId: item.id })}>
      <Text style={styles.itemText}>{`${item.nombre} ${item.apellidos}`}</Text>
      <Text style={styles.itemText}>{formatFecha(item.fechaInicio)}</Text>
      <Text style={styles.itemText}>{item.fechaTermino ? formatFecha(item.fechaTermino) : '-'}</Text>
      {renderEstado(item)}
      <TouchableOpacity onPress={() => console.log(item.id)} style={styles.iconContainer}>
        <Text style={styles.iconText}>➔</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={clientes}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  flatList: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  activadoText: {
    color: 'green', // Cambia el color del texto para clientes activos
  },
  inactivoText: {
    color: 'red', // Cambia el color del texto para clientes inactivos
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  iconText: {
    fontSize: 20,
  },
});

export default Lista;


