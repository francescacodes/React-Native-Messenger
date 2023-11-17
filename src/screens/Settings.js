import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Auth, graphqlOperation, API } from "aws-amplify";

const Settings = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: user.profilePic }} style={styles.profileImage} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userStatus}>{user.status}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  userInfo: {
    justifyContent: "center",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  userStatus: {
    fontSize: 18,
    color: "gray",
  },
  signOutButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  signOutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Settings;
