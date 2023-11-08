import { View, Button, StyleSheet } from "react-native";
import { Auth } from "aws-amplify";

const Settings = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button onPress={() => Auth.signOut()} title="Sign Out" />
    </View>
  );
};

export default Settings;
