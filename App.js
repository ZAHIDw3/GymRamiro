import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Agregar from './components/Agregar';
import Editar from './components/Editar';
import Informacion from './components/Informacion';
import Lista from './components/Lista';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Lista">
          <Stack.Screen name="Agregar" component={Agregar} />
          <Stack.Screen name="Editar" component={Editar} />
          <Stack.Screen name="Informacion" component={Informacion} />
          <Stack.Screen name="Lista" component={Lista} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
