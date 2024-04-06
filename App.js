import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native'; 
import Agregar from './components/Agregar';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar  barStyle="light-content" />
      <Agregar/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
