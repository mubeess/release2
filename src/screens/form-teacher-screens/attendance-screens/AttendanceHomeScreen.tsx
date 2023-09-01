import { View, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AppHeader from "@safsims/components/Header/AppHeader";
import Input from "@safsims/components/Input/Input";
import Icon from "@safsims/components/Icon/Icon";
import StudentListItem from "../components/StudentListItem";
import InfiniteScrollView from "@safsims/components/InfiniteScrollView/InfiniteScrollView";
import useAllStudentsGet from "@safsims/general-hooks/useAllStudentsGet";
import StudentItem from "./component/StudentItem";
import SkeletonLoader from "@safsims/components/SkeletonLoader/SkeletonLoader";
import BottomSlider from "@safsims/components/BottomSlider/BottomSlider";
import StudentFilter from "./component/StudentFilter";
import { TouchableOpacity } from "react-native";
import ClassAttendance from "../class-screens/ClassAttendance";
import useGetClassessInformationGet from "../hooks/useGetClassessInformationGet";
import { useAppSelector } from "@safsims/redux/hooks/useAppSelector";
import { FORM_TEACHER_ROLE } from "@safsims/utils/utils";
import Button from "@safsims/components/Button/Button";
import { lightTheme } from "@safsims/utils/Theme";
import { ScrollView } from "react-native";

export default function AttendanceHomeScreen({ navigation }) {
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

  const handleActive = (next) => {
    setActive(next);
  };
  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />
      {!loadingClassess && (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{
            maxHeight: 50,
            marginVertical: 20,
            overflow: "scroll",
            flexDirection: "row",
          }}
          horizontal
          contentContainerStyle={styles.menuButtons}
        >
          {!loadingClassess && assignedClasses.length > 0 && (
            <>
              {assignedClasses.map((values, ind) => {
                return (
                  <Button
                    key={ind}
                    onPress={() => {
                      handleActive(ind);
                    }}
                    fontStyle={{
                      color:
                        active == ind ? "#fff" : lightTheme.colors.PrimaryColor,
                    }}
                    style={{
                      ...styles.button,
                      backgroundColor:
                        active == ind ? lightTheme.colors.PrimaryColor : "#fff",
                      borderWidth: 1,
                      borderColor: lightTheme.colors.PrimaryColor,
                    }}
                    label={values.class_level?.name || ""}
                  />
                );
              })}
            </>
          )}
        </ScrollView>
      )}
      {loadingClassess && <SkeletonLoader isLoading />}
      {!loadingClassess && assignedClasses.length > 0 && (
        <ClassAttendance
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
