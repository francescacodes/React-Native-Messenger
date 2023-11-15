import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Navigator from "./src/navigation";
import { Amplify, graphqlOperation, Auth, API } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import awsconfig from "./src/aws-exports";
import { useEffect } from "react";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
  useEffect(() => {
    const syncUser = async () => {
      //get authenticated user from Auth
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      console.log(authUser);
      //get the user from backend with the user id from Auth
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: authUser.attributes.sub })
      );
      console.log(userData);
      //gets the authenticated user from the db
      if (userData.data.getUser) {
        console.log("User already exists");
        return;
      }
      //creates a new user
      const newUser = {
        id: authUser.attributes.sub,
        name: authUser.attributes.phone_number,
        image: "",
        status: "Hey there!",
      };
      console.log(newUser);

      const newUserResponse = await API.graphql(
        graphqlOperation(createUser, { input: newUser })
      );
    };

    syncUser();
  }, []);

  return (
    <View style={styles.container}>
      <Navigator />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    justifyContent: "center",
  },
});

export default withAuthenticator(App);
