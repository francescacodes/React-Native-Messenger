import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ChatsScreen from "./src/components/screens/ChatsScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <ChatsScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DFCCD6",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  text: {
    color: "#CF5F33",
    fontSize: 40,
  },
});
