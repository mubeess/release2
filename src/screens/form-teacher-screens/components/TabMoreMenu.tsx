import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { lightTheme } from "@safsims/utils/Theme";
import { FormTeacherStudenIcon } from "@safsims/components/Images";

export default function TabMoreMenu() {
  return (
    <View style={styles.container}>
      <View style={styles.decoration} />
      <View style={styles.menuList}>
        <View style={styles.menu}>
          <FormTeacherStudenIcon color="#000" />
          <Text>CBT</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: 100,
    width: "100%",
  },
  decoration: {
    width: 50,
    height: 3,
    borderRadius: 5,
    backgroundColor: lightTheme.colors.PrimaryGrey,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    marginBottom: 10,
  },
  menuList: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menu: {
    minWidth: "33.33%",
    justifyContent: "center",
    alignItems: "center",
  },
});
