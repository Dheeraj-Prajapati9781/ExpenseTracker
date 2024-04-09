import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import index from './app/index'
import index from './app/login/index'
import LoginScreen from './app/login/index';


export default function App() {
  return (
    <View>
      <StatusBar style='light' />
      <index/>
      {/* <LoginScreen /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
