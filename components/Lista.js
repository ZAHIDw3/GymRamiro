import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, RefreshControl } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import HeaderLista from './HeaderLista';

const Lista = ({ navigation }) => {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true); // Estado de carga
  const [refreshing, setRefreshing] = useState(false); // Estado de refresco

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const db = getFirestore();
      const clientesCollection = collection(db, 'clientes');
      const clientesSnapshot = await getDocs(clientesCollection);
      const clientesData = clientesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClientes(clientesData);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    } finally {
      setLoading(false); // Marcar como cargado una vez que se obtienen los datos
    }
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha.seconds * 1000);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const renderEstado = (cliente) => {
    const estado = cliente.fechaTermino ? (new Date(cliente.fechaTermino.seconds * 1000) < Date.now() ? 'Inactivo' : 'Activo') : 'Activo';
    return <Text style={[styles.itemText, estado === 'Inactivo' ? styles.inactivoText : styles.activadoText]}>{estado}</Text>;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Informacion', { clienteId: item.id })}>
      <View style={styles.itemRow}>
        <Text style={[styles.itemText, styles.nombreColumn]}>{`${item.nombre} ${item.apellidos}`}</Text>
        <Text style={[styles.itemText, styles.fechaColumn]}>{formatFecha(item.fechaInicio)}</Text>
        <Text style={[styles.itemText, styles.fechaColumn]}>{item.fechaTermino ? formatFecha(item.fechaTermino) : '-'}</Text>
        <View style={[styles.itemText, styles.estadoColumn]}>
          {renderEstado(item)}
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchClientes();
    setRefreshing(false);
  };

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.apellidos.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <HeaderLista navigation={navigation} />

      <View style={styles.container2}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por nombre o apellidos"
          value={busqueda}
          onChangeText={text => setBusqueda(text)}
        />

        <View style={styles.headerRow}>
          <Text style={[styles.headerText, styles.nombreColumn]}>Nombre</Text>
          <Text style={[styles.headerText, styles.fechaColumn]}>Fecha de Inicio</Text>
          <Text style={[styles.headerText, styles.fechaColumn]}>Fecha de Término</Text>
          <Text style={[styles.headerText, styles.estadoColumn]}>Estado</Text>
        </View>

        {loading ? ( // Mostrar spinner de carga si está cargando
          <ActivityIndicator size="large" color="#0000ff" style={styles.spinner} />
        ) : (
          <FlatList
            data={clientesFiltrados}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            style={styles.flatList}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 20,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  flatList: {
    flex: 1,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
  },
  activadoText: {
    color: 'green',
  },
  inactivoText: {
    color: 'red',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  nombreColumn: {
    flex: 1.5,
  },
  fechaColumn: {
    flex: 1,
  },
  estadoColumn: {
    flex: 1.2,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default Lista;
