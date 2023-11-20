import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import { Auth, graphqlOperation, API } from "aws-amplify";
import { getUser } from "../graphql/queries";
import { updateUser } from "../graphql/mutations";
import React, { useEffect, useState } from "react";

const SettingsPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: userInfo.attributes.sub })
      );
      setUser(userData.data.getUser);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      // Handle sign-out logic (redirect to login, etc.)
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleUpdateUser = async (newUsername, newPicture) => {
    try {
      const updatedUser = await API.graphql(
        graphqlOperation(updateUser, {
          id: user.id,
          username: newUsername,
          picture: newPicture,
        })
      );
      setUser(updatedUser.data.updateUser);
      // Optionally, update local state or UI after successful update
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Username: {user.username}</Text>

      <Image
        source={{ uri: user.picture }}
        style={{ width: 100, height: 100 }}
      />

      <Button title="Sign Out" onPress={handleSignOut} />
      {/* Component/UI for updating username and picture */}
      {/* Example: 
          <TextInput onChangeText={newUsername => handleUpdateUser(newUsername, user.picture)} />
          <Button title="Update" onPress={() => handleUpdateUser(newUsername, user.picture)} />
      */}
    </View>
  );
};

export default SettingsPage;
