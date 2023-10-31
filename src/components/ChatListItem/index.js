import { Text, View, Image, StyleSheet } from "react-native";

const ChatListItem = ({ chat }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: chat.user.image,
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {chat.user.name}
          </Text>
          <Text style={styles.time}>{chat.lastMessage.createdAt}</Text>
        </View>
        <Text numberOfLines={2} style={styles.lastMessage}>
          {chat.lastMessage.text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
  },
  content: {
    justifyContent: "space-around",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  lastMessage: {
    fontSize: 16,
    color: "grey",
  },
  time: {
    fontSize: 14,
    color: "grey",
  },
});

export default ChatListItem;
