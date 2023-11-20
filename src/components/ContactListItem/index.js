import { Text, Image, StyleSheet, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createChatRoom, createUserChatRoom } from "../../graphql/mutations";
import { createOrGetChatRoomWithUser } from "../../services/chatService";
import { getChatRoom } from "../../graphql/queries";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ContactListItem = ({ user }) => {
  const navigation = useNavigation();

  const onPress = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser();

      // Check if there is an existing chat room with the clicked user
      const existingChatRoom = await createOrGetChatRoomWithUser(user.id);

      if (existingChatRoom) {
        navigation.navigate("ChatScreen", { id: existingChatRoom.chatRoom.id });
        return;
      }

      // If no existing chat room, create a new one
      const newChatRoomData = await API.graphql(
        graphqlOperation(createChatRoom, { input: {} })
      );

      if (!newChatRoomData.data?.createChatRoom) {
        console.log("Failed to create a chat room");
        return;
      }

      const newChatRoom = newChatRoomData.data?.createChatRoom;

      // Add the clicked user and the current user to the new chat room
      await Promise.all([
        API.graphql(
          graphqlOperation(createUserChatRoom, {
            input: { chatRoomId: newChatRoom.id, userId: user.id },
          })
        ),
        API.graphql(
          graphqlOperation(createUserChatRoom, {
            input: {
              chatRoomId: newChatRoom.id,
              userId: authUser.attributes.sub,
            },
          })
        ),
      ]);

      // Navigate to the newly created ChatRoom
      navigation.navigate("ChatScreen", { id: newChatRoom.id });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={{ uri: user.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {user.name}
        </Text>

        <Text numberOfLines={2} style={styles.subTitle}>
          {user.status}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
  },
  subTitle: {
    color: "gray",
  },
});

export default ContactListItem;
