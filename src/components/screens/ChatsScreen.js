import { FlatList } from "react-native";
import chats from "../../../assets/data/chats";
import ChatListItem from "../ChatListItem";

const ChatsScreen = () => {
  return (
    <FlatList
      data={chats}
      renderItem={({ item }) => <ChatListItem chat={item} />}
    />
  );
};

export default ChatsScreen;
