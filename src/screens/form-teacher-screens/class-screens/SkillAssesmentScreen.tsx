import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import StudentHeader from "../components/StudentHeader";
import Button from "@safsims/components/Button/Button";
import SkillCard from "../components/SkillCard";
import { useAppSelector } from "@safsims/redux/hooks/useAppSelector";
import useGetAllClassStudentsGet from "../hooks/useGetAllClassStudentsGet";
import useChildSkillsGet from "../hooks/useChildSkillsGet";
import Text from "@safsims/components/Text/Text";
import { StudentSkillAssessmentDto } from "@safsims/generated";
import SkeletonLoader from "@safsims/components/SkeletonLoader/SkeletonLoader";
import useSkillRatingGet from "../hooks/useSkillRatingGet";
import useUpdateSkills from "../hooks/useUpdateSkills";

export default function SkillAssesmentScreen({ route }) {
  const { termId, classLevelId, armId, index, early_years } = route.params;
  const [currentIndex, setCurrentIndex] = useState(index);
  const data = useAppSelector((state) => state);
  const { getSkills, loadingSkills, skills } = useChildSkillsGet();
  const { updateSkills, updatingSkills } = useUpdateSkills();
  const { skillRatings } = useSkillRatingGet();

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

  useEffect(() => {
    if (!loadingStudents && students.length > 0) {
      getSkills({
        studentId: students[currentIndex].student_dto?.id,
        termId,
      });
    }
  }, [currentIndex, loadingStudents]);
  return (
    <View style={styles.container}>
      <StudentHeader
        onNext={() => handleNext()}
        onPrev={() => handlePrev()}
        name={name}
        id={id}
        student_class={student_class}
        screen="Skills"
        profile_pic={profile_pic || ""}
      />

      <ScrollView style={styles.cards}>
        {!loadingSkills &&
          skills.map((assessment: StudentSkillAssessmentDto, ind) => (
            <SkillCard
              ratings={
                skillRatings !== undefined && skillRatings.length > 0
                  ? skillRatings[0].skill_rating_definitions
                  : []
              }
              assessment={assessment}
              key={ind}
            />
          ))}
        {loadingSkills && <SkeletonLoader isLoading />}
        {loadingStudents && <SkeletonLoader isLoading />}
      </ScrollView>
      <View style={styles.button}>
        <Button
          onPress={() => {
            const updatedSkills = skills.map(
              (mySkils: StudentSkillAssessmentDto) => {
                return {
                  skill_id: mySkils.skill?.id || "",
                  skill_rating_definition_id:
                    mySkils.skill_rating_definition?.id || "",
                };
              }
            );

            updateSkills({
              request: {
                student_id: students[currentIndex].student_dto?.id || "",
                term_id: termId,
                skill_assessments: updatedSkills,
              },
            });
          }}
          isLoading={updatingSkills}
          label="Save Entry"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cards: {
    flex: 1,
    paddingHorizontal: 20,
  },
  button: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
});
