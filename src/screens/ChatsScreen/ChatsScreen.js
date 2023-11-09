import { FlatList, StyleSheet } from "react-native";
import chats from "../../../assets/data/chats.json";
import ChatListItem from "../../components/ChatListItem";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createChatRoom, createChatRoomUser } from "../../graphql/mutations";
import { listChatRooms } from "../../graphql/queries";

const ChatsScreen = () => {
  return (
    <FlatList
      data={chats}
      renderItem={({ item }) => <ChatListItem chat={item} />}
      style={{ backgroundColor: "white" }}
    />
  );
};

export default ChatsScreen;