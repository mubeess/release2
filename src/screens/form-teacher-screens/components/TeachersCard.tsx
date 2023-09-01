import Icon from "@safsims/components/Icon/Icon";
import Text from "@safsims/components/Text/Text";
import { StaffDto } from "@safsims/generated";
import { lightTheme } from "@safsims/utils/Theme";
import React from "react";
import { Image } from "react-native";
import { StyleSheet, View } from "react-native";

export default function TeachersCard({
  isLast,
  teacher,
}: {
  isLast?: boolean;
  teacher: StaffDto;
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
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: teacher.profile_pic,
            }}
          />
        </View>
        <View>
          <Text h3>
            {teacher.first_name} {teacher.other_names}
          </Text>
          <Text style={{ color: lightTheme.colors.PrimaryGrey }}>
            {teacher.staff_id}
          </Text>
        </View>
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
    backgroundColor: "#FBDEC8",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 25,
    width: 25,
    borderRadius: 25,
  },
  imageContainer: {
    height: 25,
    width: 25,
    borderRadius: 25,
    marginRight: 10,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    borderWidth: 1,
  },
});
