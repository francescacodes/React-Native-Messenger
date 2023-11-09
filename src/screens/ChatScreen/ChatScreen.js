import { useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  View,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Message from "../../components/Message";
import InputBox from "../../components/InputBox";

import bubbles from "../../../assets/images/bubbles.jpg";
import messages from "../../../assets/data/messages.json";

const ChatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [route.params.name]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
      style={styles.bg}
    >
      <ImageBackground source={bubbles} style={styles.bubbles}>
        <FlatList
          data={messages}
          renderItem={({ item }) => <Message message={item} />}
          style={styles.list}
          inverted
        />
        <InputBox />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  bubbles: {
    width: "100%",
    height: "100%",
  },
  list: {
    padding: 10,
  },
});

export default ChatScreen;
