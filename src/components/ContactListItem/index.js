import { Text, Image, StyleSheet, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createChatRoom, createChatRoomUser } from "../../graphql/mutations";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ContactListItem = ({ user }) => {
  const navigation = useNavigation();

  const onPress = async () => {
    console.warn("Pressed on user");

    // check if there is a chat room with the user

    //create a new chat room
    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, { input: {} })
    );
    console.log(newChatRoomData);
    if (!newChatRoomData.data?.createChatRoom) {
      console.log("Error creating chat room");
    }
    const newChatRoom = newChatRoomData.data?.createChatRoom;

    //add the clicked user to the chat room

    await API.graphql(
      graphqlOperation(createChatRoomUser, {
        input: { chatRoomID: newChatRoom.id, userID: user.id },
      })
    );
    //add auth to chat room
    const authUser = await Auth.currentAuthenticatedUser();
    await API.graphql(
      graphqlOperation(createChatRoomUser, {
        input: { chatRoomID: newChatRoom.id, userID: authUser.attributes.sub },
      })
    );
    // navigate to chat room
    navigation.navigate("Chat", { id: newChatRoom.id });
  };

  return (
    <Pressable onPress={() => {}} style={styles.container}>
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
  name: {
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgray",
  },
  subTitle: {
    color: "gray",
    width: "100%",
  },
});

export default ContactListItem;
