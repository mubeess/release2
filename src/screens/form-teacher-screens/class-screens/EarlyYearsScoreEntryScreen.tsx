import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import StudentHeader from "../components/StudentHeader";
import Select from "@safsims/components/Select/Select";
import EarlyYearsScoreCard from "../components/EarlyYearsScoreCard";
import Text from "@safsims/components/Text/Text";
import { TextInput } from "react-native";
import { lightTheme } from "@safsims/utils/Theme";
import Button from "@safsims/components/Button/Button";
import useGetAllClassStudentsGet from "../hooks/useGetAllClassStudentsGet";

export default function EarlyYearsScoreEntryScreen({ route }) {
  const { termId, classLevelId, armId, index, early_years } = route.params;
  const [currentIndex, setCurrentIndex] = useState(index);
  const { students, loadingStudents } = useGetAllClassStudentsGet({
    armId,
    classLevelId,
  });

  const name =
    !loadingStudents && students.length > 0
      ? `${students[currentIndex].student_dto?.first_name} ${students[currentIndex].student_dto?.other_names}`
      : "";
  const id =
    !loadingStudents && students.length > 0
      ? students[currentIndex].student_dto?.student_id
      : "";
  const student_class =
    !loadingStudents && students.length > 0
      ? students[currentIndex].class_information_dto?.class_level?.name
      : "";
  const profile_pic =
    !loadingStudents && students.length > 0
      ? students[currentIndex].student_dto?.profile_pic
      : "";
  const handleNext = () => {
    if (students.length == currentIndex + 1) {
      return;
    }
    setCurrentIndex((cur) => cur + 1);
  };

  const handlePrev = () => {
    if (currentIndex == 0) {
      return;
    }
    setCurrentIndex((cur) => cur - 1);
  };
  return (
    <View style={styles.container}>
      <StudentHeader
        onNext={() => handleNext()}
        onPrev={() => handlePrev()}
        name={name}
        id={id}
        student_class={student_class}
        screen="Results"
        profile_pic={profile_pic || ""}
      />

      <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
        <Select
          options={[{ label: "Numeracy", value: "" }]}
          label="Select Subject"
        />
      </View>
      <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
        <EarlyYearsScoreCard />
        <EarlyYearsScoreCard />
        <EarlyYearsScoreCard />
        <Text h3>General Subject Comment on Numeracy</Text>
        <TextInput
          placeholder="Teacher’s comment"
          multiline
          style={styles.input}
        />
        <Button style={styles.button} label="Update Report" />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  body: {
    flex: 1,
  },
  input: {
    marginBottom: 20,
    height: 120,
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    borderRadius: 5,
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    marginBottom: 20,
  },
});
