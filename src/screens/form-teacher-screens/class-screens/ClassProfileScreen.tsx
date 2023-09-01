import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import ClassProfileHeader from "../components/ClassProfileHeader";
import Button from "@safsims/components/Button/Button";
import { lightTheme } from "@safsims/utils/Theme";
import {
  AlternativeMoreIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  MoreIcon,
} from "@safsims/components/Images";
import Text from "@safsims/components/Text/Text";
import Input from "@safsims/components/Input/Input";
import Icon from "@safsims/components/Icon/Icon";
import StudentAttendanceCard from "../components/StudentAttendanceCard";
import ClassAttendance from "./ClassAttendance";
import SkillsScreen from "./SkillsScreen";
import SubjectsScreen from "./SubjectsScreen";
import ResultScreen from "./ResultScreen";
import FormTeacherListScreen from "./FormTeacherListScreen";
import TimeTableScreen from "./TimeTableScreen";
import BottomSlider from "@safsims/components/BottomSlider/BottomSlider";
import TabMoreMenu from "../components/TabMoreMenu";
import ClassProfileMenu from "../components/ClassProfileMenu";
import StudentClassListScreen from "./StudentClassListScreen";
import EarlyYearsListScreen from "./EarlyYearsListScreen";
import useGetAllClassStudentsGet from "../hooks/useGetAllClassStudentsGet";
import { useDispatch } from "react-redux";
import { updateAppUserState } from "@safsims/redux/users/actions";

export default function ClassProfileScreen({ route, navigation }) {
  const { className, short_name, armId, classLevelId, early_years } =
    route.params;
  const { students, loadingStudents } = useGetAllClassStudentsGet({
    armId,
    classLevelId,
  });
  const ButtonOptionsEnum = {
    TIME_TABLE: "Time Table",
    SKILLS: "Skills",
    CLASS_LIST: "Class List",
    FORM_TEACHERS: "Form Teachers",
    SUBJECTS: "Subjects",
    RESULTS: "Result",
    ATTENDANCE: "Attendance",
    EARLY_YEARS: "Early Years",
  };
  const [active, setActive] = useState(0);
  const [modalOpan, setModalOpen] = useState(false);
  const [currentButton, setCurrentButton] = useState(
    ButtonOptionsEnum.SUBJECTS
  );
  const [activeScreen, setActiveScreen] = useState("Attendance");
  const handleActive = (next) => {
    setActive(next);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpan);
  };

  const handleButtonOptions = (option) => {
    setCurrentButton(option);
    setActiveScreen(option);
    toggleModal();
    handleActive(2);
  };

  const renderContent = () => {
    switch (activeScreen) {
      case ButtonOptionsEnum.SUBJECTS:
        return <SubjectsScreen classLevelId={classLevelId} armId={armId} />;
      case ButtonOptionsEnum.CLASS_LIST:
        return (
          <StudentClassListScreen
            students={students}
            loading={loadingStudents}
          />
        );
      case ButtonOptionsEnum.FORM_TEACHERS:
        return (
          <FormTeacherListScreen armId={armId} classLevelId={classLevelId} />
        );
      case ButtonOptionsEnum.RESULTS:
        return (
          <ResultScreen
            students={students}
            loading={loadingStudents}
            early_years={early_years}
          />
        );
      case ButtonOptionsEnum.SKILLS:
        return <SkillsScreen students={students} loading={loadingStudents} />;
      case ButtonOptionsEnum.TIME_TABLE:
        return <TimeTableScreen armId={armId} classLevelId={classLevelId} />;
      case ButtonOptionsEnum.ATTENDANCE:
        return <ClassAttendance armId={armId} classLevelId={classLevelId} />;
      case ButtonOptionsEnum.EARLY_YEARS:
        return (
          <EarlyYearsListScreen students={students} loading={loadingStudents} />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ClassProfileHeader short_name={short_name} name={className} />

      <View style={styles.buttons}>
        <View style={styles.menuButtons}>
          <Button
            onPress={() => {
              handleActive(0);
              setActiveScreen(ButtonOptionsEnum.ATTENDANCE);
            }}
            fontStyle={{
              color: active == 0 ? "#fff" : lightTheme.colors.PrimaryColor,
            }}
            style={{
              ...styles.button,
              backgroundColor:
                active == 0 ? lightTheme.colors.PrimaryColor : "#fff",
            }}
            label="Attendance"
          />
          <Button
            onPress={() => {
              handleActive(1);
              setActiveScreen(ButtonOptionsEnum.CLASS_LIST);
            }}
            fontStyle={{
              color: active == 1 ? "#fff" : lightTheme.colors.PrimaryColor,
            }}
            style={{
              ...styles.button,
              backgroundColor:
                active == 1 ? lightTheme.colors.PrimaryColor : "#fff",
            }}
            label="Class List"
          />
          <Button
            onPress={() => {
              handleActive(2);
              setActiveScreen(currentButton);
            }}
            fontStyle={{
              color: active == 2 ? "#fff" : lightTheme.colors.PrimaryColor,
            }}
            style={{
              ...styles.button,
              backgroundColor:
                active == 2 ? lightTheme.colors.PrimaryColor : "#fff",
              borderRightWidth: 0,
            }}
            label={currentButton}
          />
        </View>
        <Button
          onPress={toggleModal}
          fontStyle={{ color: lightTheme.colors.PrimaryGrey }}
          IconLeft={<AlternativeMoreIcon />}
          style={styles.more}
          label="More"
        />
      </View>
      {renderContent()}

      <BottomSlider
        onClose={toggleModal}
        isOpen={modalOpan}
        children={
          <ClassProfileMenu
            early_years={early_years}
            handleClick={handleButtonOptions}
          />
        }
        height={Dimensions.get("window").height / 3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuButtons: {
    width: "80%",
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryColor,
  },
  button: {
    width: "33.33%",
    borderRadius: 0,
    borderRightWidth: 1,
    borderRightColor: lightTheme.colors.PrimaryColor,
  },
  more: {
    width: 80,
    marginLeft: 5,
    backgroundColor: lightTheme.colors.PrimaryFade,
  },
  date: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  searchBar: {
    marginTop: 20,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
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
  cards: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  cancel: {
    width: "40%",
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
  },
  save: {
    width: "40%",
  },
  buttons2: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
    alignItems: "center",
  },
  button2: {
    width: 40,
  },
});
