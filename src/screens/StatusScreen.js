import { View, Button, StyleSheet } from "react-native";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createChatRoom, createChatRoomUser } from "../../graphql/mutations";
import { listChatRooms } from "../../graphql/queries";
import { useRoute, useNavigation } from "@react-navigation/native";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
