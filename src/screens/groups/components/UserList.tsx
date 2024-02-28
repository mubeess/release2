import { View, Image } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { lightTheme } from "@safsims/utils/Theme";
import Checkbox from "expo-checkbox";
import Text from "@safsims/components/Text/Text";
import { ParentDto } from "@safsims/generated";

export default function UserList({
  user,
  selectUser,
  selected,
  removeUser,
}: {
  user: ParentDto;
  selectUser: (id: string) => void;
  removeUser: (id: string) => void;
  selected: [];
}) {
  //   const [active, setActive] = useState(false);
  const active = () => {
    const filtered = selected.filter((id) => id == user.parent_ums_id);
    if (filtered.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <View style={styles.container}>
      <Checkbox
        onValueChange={(e) => {
          if (e == true) {
            selectUser(user.parent_ums_id);
          } else {
            removeUser(user.parent_ums_id);
          }
        }}
        value={active()}
        color={
          active()
            ? lightTheme.colors.PrimaryColor
            : lightTheme.colors.PrimaryBorderColor
        }
      />
      <Image
        source={{
          uri: user.profile_pic,
        }}
        style={styles.image}
      />
      <Text>
        {user.first_name} {user.surname}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    borderBottomColor: lightTheme.colors.PrimaryBorderColor,
    borderBottomWidth: 1,
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    marginHorizontal: 20,
  },
});
