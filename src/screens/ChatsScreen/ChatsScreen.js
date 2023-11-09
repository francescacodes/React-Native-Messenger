import { FlatList, StyleSheet } from "react-native";
import ChatListItem from "../../components/ChatListItem";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listChatRooms } from "./queries";
import { useEffect, useState } from "react";

const ChatsScreen = () => {
  const [chatRooms, setChatRooms] = useState([]);
  useEffect(() => {
    const fetchChatRooms = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      const response = await API.graphql(
        graphqlOperation(listChatRooms, { id: Auth.user.attributes.sub })
      );

      setChatRooms(response.data.getUser.ChatRoom.items);
    };
    fetchChatRooms();
  }, []);
  return (
    <FlatList
      data={chatRooms}
      renderItem={({ item }) => <ChatListItem chat={item} />}
      style={{ backgroundColor: "white" }}
    />
  );
};

export default ChatsScreen;
