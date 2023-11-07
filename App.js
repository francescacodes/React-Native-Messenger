import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ChatScreen from "./src/components/screens/ChatScreen";
import Navigator from "./src/navigation";

export default function App() {
  return (
    <View style={styles.container}>
      <Navigator />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DFCCD6",
    paddingVertical: 50,
  },
  text: {
    color: "#CF5F33",
    fontSize: 40,
  },
});
