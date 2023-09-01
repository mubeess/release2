import { View } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { lightTheme } from "@safsims/utils/Theme";
import Icon from "@safsims/components/Icon/Icon";
import Text from "@safsims/components/Text/Text";

export default function AttendanceMenuItem() {
  return (
    <View style={styles.container}>
      <View style={styles.calendar}>
        <Icon name="calendar" size={20} />
        <View style={{ marginLeft: 10 }}>
          <Text>Tuesday</Text>
          <Text>20th, march 2023</Text>
        </View>
      </View>

      <View style={styles.status}>
        <Text style={{ color: lightTheme.colors.PrimaryRed }}>Pending</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: lightTheme.colors.PrimaryBorderColor,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  calendar: {
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    width: 72,
    height: 27,
    backgroundColor: "#F5C6D6",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
