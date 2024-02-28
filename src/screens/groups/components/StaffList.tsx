import { View, Image } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { lightTheme } from "@safsims/utils/Theme";
import Checkbox from "expo-checkbox";
import Text from "@safsims/components/Text/Text";
import { ParentDto, StaffDto } from "@safsims/generated";

export default function StaffList({
  staff,
  selectUser,
  selected,
  removeUser,
}: {
  staff: StaffDto;
  selectUser: (id: string) => void;
  removeUser: (id: string) => void;
  selected: [];
}) {
  //   const [active, setActive] = useState(false);
  const active = () => {
    const filtered = selected.filter((id) => id == staff.staff_ums_id);
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
            selectUser(staff.staff_ums_id || "");
          } else {
            removeUser(staff.staff_ums_id || "");
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
          uri: staff?.profile_pic,
        }}
        style={styles.image}
      />
      <Text>
        {staff.first_name} {staff.surname}
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
