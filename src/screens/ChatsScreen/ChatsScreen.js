import { FlatList } from "react-native";
import ChatListItem from "../../components/ChatListItem";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listChatRooms } from "./queries";
import { useEffect, useState } from "react";

const ChatsScreen = () => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const authUser = await Auth.currentAuthenticatedUser();
        const userId = authUser.attributes.sub;

        const response = await API.graphql(
          graphqlOperation(listChatRooms, {
            filter: { userId: { eq: userId } },
          })
        );

        setChatRooms(response.data.listChatRooms.items);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
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
