import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import AppHeader from "@safsims/components/Header/AppHeader";
import AddUsersToGroupTopTabNavigation from "@safsims/navigation/feed-top-navigation/AddUsersToGroupTopNavigation";
import Text from "@safsims/components/Text/Text";
import { lightTheme } from "@safsims/utils/Theme";
import { CloseIcon } from "@safsims/components/Images";

export default function AddUsersToGroup({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity
          onPress={() => navigation.navigate("FeedHome")}
          style={styles.close}
        >
          <CloseIcon />
        </TouchableOpacity>
        <Text style={{ marginRight: "auto" }} h3>
          Add Members
        </Text>
      </View>
      <AddUsersToGroupTopTabNavigation />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  head: {
    height: 70,
    width: "100%",
    borderBottomColor: lightTheme.colors.PrimaryBorderColor,
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  close: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: lightTheme.colors.PrimaryFade,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "auto",
  },
});
