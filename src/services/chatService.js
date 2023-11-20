import { API, graphqlOperation, Auth } from "aws-amplify";
import { listChatRooms } from "../graphql/queries";
import { createChatRoom, createUserChatRoom } from "../graphql/mutations";

export const createOrGetChatRoomWithUser = async (userId) => {
  try {
    const authUser = await Auth.currentAuthenticatedUser();

    // Get all chat rooms of the authenticated user
    const response = await API.graphql(
      graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
    );

    // Check if response.data and response.data.listChatRooms are defined
    if (
      response.data &&
      response.data.listChatRooms &&
      Array.isArray(response.data.listChatRooms.items)
    ) {
      const chatRooms = response.data.listChatRooms.items || [];

      // Find a chat room involving both users (authUser and userId)
      const existingChatRoom = chatRooms.find((chatRoomItem) => {
        return (
          chatRoomItem.users.items.length === 2 &&
          chatRoomItem.users.items.some(
            (userItem) => userItem.user.id === userId
          )
        );
      });

      if (existingChatRoom) {
        return existingChatRoom.chatRoom.id;
      }
    } else {
      console.log("No chat rooms found or invalid response structure");
    }

    // If no existing chat room found, create a new one
    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, { input: {} })
    );

    if (!newChatRoomData.data?.createChatRoom) {
      console.log("Failed to create a chat room");
      return null;
    }

    const newChatRoom = newChatRoomData.data?.createChatRoom;

    await Promise.all([
      API.graphql(
        graphqlOperation(createUserChatRoom, {
          input: { chatRoomId: newChatRoom.id, userId },
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

    return newChatRoom.id;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
