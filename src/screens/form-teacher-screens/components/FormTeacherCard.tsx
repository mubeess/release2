import { View, StyleSheet, ImageBackground, Image } from "react-native";
import React from "react";
import { lightTheme } from "@safsims/utils/Theme";
import Text from "@safsims/components/Text/Text";
import { FormTeacherDto } from "@safsims/generated";

export default function FormTeacherCard({
  teacher,
  notFormTeacher,
}: {
  teacher: FormTeacherDto;
  notFormTeacher?: boolean;
}) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/form_teacher.png")}
        style={styles.head}
      >
        <View
          style={[
            styles.tag,
            { backgroundColor: !notFormTeacher ? "#CAF5E6" : "#FBEFCA" },
          ]}
        >
          <Text
            style={{
              color: !notFormTeacher
                ? "#2CDA9D"
                : lightTheme.colors.PrimaryOrange,
            }}
          >
            {!notFormTeacher ? "Form Teacher" : "Assistant Form-Teacher"}
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.profile}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: teacher.profile_url,
            }}
          />
        </View>
        <View>
          <Text h2>{teacher.full_name}</Text>
          <Text style={{ color: lightTheme.colors.PrimaryGrey }}>
            {teacher.staff_id}
          </Text>
        </View>
      </View>

      <Text style={{ marginLeft: 20 }} h3>
        Subjects
      </Text>

      <View style={styles.subjects}>
        <View style={styles.list}>
          <Text>English Language</Text>
        </View>

        <View style={styles.list}>
          <Text>English</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    minHeight: 190,
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    borderRadius: 5,
    marginBottom: 20,
  },
  head: {
    width: "100%",
    backgroundColor: lightTheme.colors.PrimaryColor,
    height: 70,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
    overflow: "hidden",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  tag: {
    minWidth: 30,
    height: 27,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  profile: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  image: {
    height: 53,
    width: 53,
    borderRadius: 53,
  },
  subjects: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    paddingVertical: 5,
  },
  list: {
    flexBasis: "40%",
    width: 64,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 5,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    backgroundColor: lightTheme.colors.PrimaryBorderColor,
  },
  imageContainer: {
    height: 53,
    width: 53,
    borderRadius: 53,
    marginRight: 10,
    transform: [{ translateY: -30 }],
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#fff",
  },
});
