import { useState, useEffect } from "react";
import { FlatList, Pressable, Text } from "react-native";
import ContactListItem from "../components/ContactListItem";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listUsers } from "../../src/graphql/queries";
import {
  createChatRoom,
  createUserChatRoom,
} from "../../src/graphql/mutations";
import { createOrGetChatRoomWithUser } from "../services/chatService";

const ContactsScreen = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const authUser = await Auth.currentAuthenticatedUser();
        const result = await API.graphql(graphqlOperation(listUsers));
        const allUsers = result.data?.listUsers?.items || [];

        // Filter out the current authenticated user
        const otherUsers = allUsers.filter(
          (user) => user.id !== authUser.attributes.sub
        );

        setUsers(otherUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const createAChatRoomWithTheUser = async (user) => {
    // Check if we already have a ChatRoom with user
    const existingChatRoom = await createOrGetChatRoomWithUser(user.id);
    if (existingChatRoom) {
      navigation.navigate("Chat", { id: existingChatRoom.chatRoom.id });
      return;
    }

    // Create a new Chatroom
    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, { input: {} })
    );
    if (!newChatRoomData.data?.createChatRoom) {
      console.log("Error creating the chat error");
    }
    const newChatRoom = newChatRoomData.data?.createChatRoom;

    // Add the clicked user to the ChatRoom

    //Promise rejection here --- fixed it
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: { chatRoomId: newChatRoom.id, userId: user.id },
      })
    );

    // Add the auth user to the ChatRoom
    const authUser = await Auth.currentAuthenticatedUser();
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: { chatRoomId: newChatRoom.id, userId: authUser.attributes.sub },
      })
    );

    // navigate to the newly created ChatRoom
    navigation.navigate("Chat", { id: newChatRoom.id });
  };

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <ContactListItem
          user={item}
          onPress={() => createAChatRoomWithTheUser(item)}
        />
      )}
      style={{ backgroundColor: "white" }}
      ListHeaderComponent={() => (
        <Pressable
          onPress={() => {
            navigation.navigate("New Group");
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            paddingHorizontal: 20,
          }}
        >
          <MaterialIcons
            name="group"
            size={24}
            color="royalblue"
            style={{
              marginRight: 20,
              backgroundColor: "gainsboro",
              padding: 7,
              borderRadius: 20,
              overflow: "hidden",
            }}
          />
          <Text style={{ color: "royalblue", fontSize: 16 }}>New Group</Text>
        </Pressable>
      )}
    />
  );
};

export default ContactsScreen;
