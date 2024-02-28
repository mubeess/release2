import Button from "@safsims/components/Button/Button";
import Text from "@safsims/components/Text/Text";
import {
  AttendanceDto,
  ClassMemberDto,
  StudentSubjectAttendanceRequest,
  SubjectAttendanceRequest,
} from "@safsims/generated";
import { lightTheme } from "@safsims/utils/Theme";
import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
interface IProps {
  name: string;
  profile_pic: string;
  email: string;
  attendanceRequest: StudentSubjectAttendanceRequest;
}
export default function StudentSubjectAttendance({
  name,
  profile_pic,
  email,
  attendanceRequest,
}: IProps) {
  const [active, setActive] = useState(
    attendanceRequest.attendance_status == "LATE"
      ? 1
      : attendanceRequest.attendance_status == "PRESENT"
      ? 0
      : 2
  );

  return (
    <View style={styles.container}>
      <View style={styles.teacher}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: profile_pic,
            }}
          />
        </View>
        <View>
          <Text h3>{name}</Text>
          <Text style={{ color: lightTheme.colors.PrimaryGrey }}>{email}</Text>
        </View>
      </View>

      <View style={styles.divider} />
      <View style={styles.actions}>
        <Button
          onPress={() => {
            attendanceRequest.attendance_status = "PRESENT";
            setActive(0);
          }}
          fontStyle={{
            color: active == 0 ? "#fff" : lightTheme.colors.PrimaryGrey,
          }}
          style={{
            ...styles.button,
            backgroundColor:
              active == 0
                ? lightTheme.colors.PrimaryGreen
                : lightTheme.colors.PrimaryFade,
          }}
          label="Present"
        />
        <Button
          onPress={() => {
            attendanceRequest.attendance_status = "LATE";
            setActive(1);
            console.log(attendanceRequest);
          }}
          fontStyle={{
            color: active == 1 ? "#fff" : lightTheme.colors.PrimaryGrey,
          }}
          style={{
            ...styles.button,
            backgroundColor:
              active == 1
                ? lightTheme.colors.PrimaryOrange
                : lightTheme.colors.PrimaryFade,
          }}
          label="Late"
        />
        <Button
          onPress={() => {
            attendanceRequest.attendance_status = "ABSENT";
            setActive(2);
          }}
          fontStyle={{
            color: active == 2 ? "#fff" : lightTheme.colors.PrimaryGrey,
          }}
          style={{
            ...styles.button,
            backgroundColor:
              active == 2
                ? lightTheme.colors.PrimaryRed
                : lightTheme.colors.PrimaryFade,
          }}
          label="Absent"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 140,
    width: "100%",
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
  },
  teacher: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    backgroundColor: "#fff",

    alignItems: "center",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  imageContainer: {
    height: 40,
    width: 40,
    borderRadius: 40,
    marginRight: 10,
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: lightTheme.colors.PrimaryBorderColor,
    marginVertical: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: "30%",
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: lightTheme.colors.PrimaryBorderColor,
  },
});
