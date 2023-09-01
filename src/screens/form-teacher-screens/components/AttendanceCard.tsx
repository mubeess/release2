import Icon from "@safsims/components/Icon/Icon";
import Text from "@safsims/components/Text/Text";
import { AttendanceStats } from "@safsims/generated";
import { lightTheme } from "@safsims/utils/Theme";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function AttendanceCard({
  isLast,
  attendance,
}: {
  isLast?: boolean;
  attendance: AttendanceStats;
}) {
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomWidth: isLast ? 0 : 1,
        },
      ]}
    >
      <View style={styles.date}>
        <Icon name="calendar" size={20} />
        <Text style={{ marginLeft: 10 }}>{attendance.date}</Text>
      </View>
      <View
        style={{
          ...styles.status,
          backgroundColor:
            attendance.absent == 0 &&
            attendance.late == 0 &&
            attendance.present == 0
              ? "#FBDEC8"
              : lightTheme.colors.PrimaryGreen,
        }}
      >
        <Text>
          {attendance.absent == 0 &&
          attendance.late == 0 &&
          attendance.present == 0
            ? "Pending"
            : "Taken"}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 65,
    width: "100%",

    borderBottomColor: lightTheme.colors.PrimaryBorderColor,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  date: {
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
  },
  status: {
    width: 70,
    height: 26,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
