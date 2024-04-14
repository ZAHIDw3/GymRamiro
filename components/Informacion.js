import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const Informacion = () => {
    return (
        <View style={styles.container}>
            <Text>AQUI SE VAN A VER LOS CLIENTES</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    },
});

export default Informacion;