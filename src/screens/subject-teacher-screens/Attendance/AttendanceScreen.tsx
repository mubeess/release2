import { View } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

import SkeletonLoader from "@safsims/components/SkeletonLoader/SkeletonLoader";

import { useAppSelector } from "@safsims/redux/hooks/useAppSelector";
import { FORM_TEACHER_ROLE } from "@safsims/utils/utils";

import { lightTheme } from "@safsims/utils/Theme";

import useGetClassessInformationGet from "@safsims/screens/form-teacher-screens/hooks/useGetClassessInformationGet";

import ClassProfileHeader from "@safsims/screens/form-teacher-screens/components/ClassProfileHeader";
import SubjectAttendance from "./components/SubjectAttendance";

export default function AttendanceScreen({ route }) {
  const {
    name,
    short_name,

    subjectId,
  } = route.params;

  const { classess, loadingClassess } = useGetClassessInformationGet();
  const user = useAppSelector((data) => data.user);

  const assignedClasses =
    user.activeUserType == FORM_TEACHER_ROLE
      ? classess.filter(
          (individualClass) =>
            individualClass.main_form_teacher?.id == user.currentUser.id ||
            individualClass.assistant_form_teacher?.id == user.currentUser.id
        )
      : classess;
  const [active, setActive] = useState(0);

  return (
    <View style={styles.container}>
      <ClassProfileHeader name={name} short_name={short_name} />
      {loadingClassess && <SkeletonLoader isLoading />}
      {!loadingClassess && assignedClasses.length > 0 && (
        <SubjectAttendance
          subjectId={subjectId}
          armId={assignedClasses[active].arm?.id || ""}
          classLevelId={assignedClasses[active].class_level?.id || ""}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  students: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  calendar: {
    height: 42,
    width: 42,
    borderRadius: 42,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuButtons: {
    // width: "100%",
  },
  button: {
    width: 120,
    borderRadius: 0,
    borderRightWidth: 1,
    borderRightColor: lightTheme.colors.PrimaryColor,
  },
});
