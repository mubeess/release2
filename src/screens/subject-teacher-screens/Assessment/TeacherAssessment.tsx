import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { lightTheme } from "@safsims/utils/Theme";
import Text from "@safsims/components/Text/Text";

import useCurrentTermGet from "@safsims/general-hooks/useCurrentTermGet";
import SkeletonLoader from "@safsims/components/SkeletonLoader/SkeletonLoader";

import { useAppSelector } from "@safsims/redux/hooks/useAppSelector";
import useStudentTraitAssessmentGet from "@safsims/screens/form-teacher-screens/hooks/useStudentTraitAssessmentGet";
import StudentHeader from "@safsims/screens/form-teacher-screens/components/StudentHeader";
import useGetAllClassStudentsGet from "@safsims/screens/form-teacher-screens/hooks/useGetAllClassStudentsGet";
import Button from "@safsims/components/Button/Button";
import SubjectTraitsCard from "../components/SubjectTraitsCard";
import AssessmentCard from "../components/AssessmentCard";
import useGetSubjectTraits from "../hooks/useGetSubjectTraits";
import usePostSubjectTraits from "../hooks/usePostSubjectTraits";
import {
  SubjectTraitAssessmentRequest,
  SubjectTraitAssessmentScoreRequest,
} from "@safsims/generated";
import useGetAssignedSubjectTraitGroup from "../hooks/useGetAssignedSubjectTraitGroup";

interface IProps {
  termId;
  requests: string;
  studentId: string;
}
export default function TeacherAssessment({ route }) {
  const {
    termId,
    requests,
    classLevelId,
    armId,
    index,
    early_years,
    subjectId,
  } = route.params;
  const [currentIndex, setCurrentIndex] = useState(index);
  const data = useAppSelector((state) => state);
  const [activeTab, setActive] = useState(0);
  const [comment, setComment] = useState("");
  const [allScores, setScores] = useState([]);
  const { students, loadingStudents } = useGetAllClassStudentsGet({
    armId,
    classLevelId,
  });
  const { getSubjectTratits, loading, subjectTraits } = useGetSubjectTraits();
  const { getAssignedSubjectTratits, traitId } =
    useGetAssignedSubjectTraitGroup();
  const { postSubjectTratits, loading: posting } = usePostSubjectTraits();

  const name =
    !loadingStudents && students.length > 0
      ? `${students[currentIndex].student_dto?.first_name} ${students[currentIndex].student_dto?.other_names}`
      : "";
  const id =
    !loadingStudents && students.length > 0
      ? students[currentIndex].student_dto?.student_id
      : "";
  const student_id =
    !loadingStudents && students.length > 0
      ? students[currentIndex].student_dto?.id
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
    getSubjectTratits({ classLevelId, subjectId, termId });
    getAssignedSubjectTratits({ termId });
  }, []);

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
      <View style={styles.buttons}>
        <Button
          onPress={() => setActive(0)}
          fontStyle={{
            ...styles.tabFont,
            color:
              activeTab == 0
                ? lightTheme.colors.PrimaryColor
                : lightTheme.colors.PrimaryGrey,
          }}
          style={{
            ...styles.button,
            borderBottomColor:
              activeTab == 0
                ? lightTheme.colors.PrimaryColor
                : lightTheme.colors.PrimaryGrey,
          }}
          label="Assessment"
        />
        <Button
          onPress={() => setActive(1)}
          fontStyle={{
            ...styles.tabFont,
            color:
              activeTab == 1
                ? lightTheme.colors.PrimaryColor
                : lightTheme.colors.PrimaryGrey,
          }}
          style={{
            ...styles.button,
            borderBottomColor:
              activeTab == 1
                ? lightTheme.colors.PrimaryColor
                : lightTheme.colors.PrimaryGrey,
          }}
          label="Subject Traits"
        />
      </View>
      <ScrollView style={styles.traits}>
        {activeTab == 0 ? (
          <>
            <AssessmentCard />
            <AssessmentCard />
            <AssessmentCard />
            <AssessmentCard />
          </>
        ) : (
          <>
            {loading && <SkeletonLoader isLoading />}
            {subjectTraits?.subject_traits?.map((trait) => (
              <SubjectTraitsCard
                onChange={(grade) => {
                  const scores: SubjectTraitAssessmentScoreRequest = {
                    skill_rating_definition_id: grade.id,
                    subject_trait_id: trait.subject_trait_group_id,
                  };
                  setScores((prev) => [...prev, scores]);
                }}
                definition={subjectTraits.skill_rating_definitions || []}
                trait={trait}
                key={trait.id}
              />
            ))}
          </>
        )}
        <TextInput
          onChangeText={(text) => setComment(text)}
          value={comment}
          multiline
          style={styles.input}
        />
        <Button
          isLoading={posting}
          onPress={async () => {
            const request: SubjectTraitAssessmentRequest = {
              comments: comment,
              student_id: student_id || "",
              scores: allScores,
            };

            await postSubjectTratits({ termId, request: request });
          }}
          style={{ marginBottom: 30 }}
          label="Save"
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  resultRow: {
    height: 70,
    borderBottomColor: lightTheme.colors.PrimaryBorderColor,
    borderBottomWidth: 1,
    borderTopColor: lightTheme.colors.PrimaryBorderColor,
    borderTopWidth: 1,
    flexDirection: "row",
    overflow: "hidden",
  },
  resultData: {
    width: "33.33%",
    borderRightColor: lightTheme.colors.PrimaryBorderColor,
    borderRightWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cards: {
    paddingHorizontal: 20,
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
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    height: 36,
    width: "50%",
    elevation: 0,
    backgroundColor: "transparent",
    borderBottomColor: lightTheme.colors.PrimaryBorderColor,
    borderBottomWidth: 1,
  },
  traits: {
    flex: 1,
    padding: 20,
  },
  tabFont: {
    color: lightTheme.colors.PrimaryGrey,
  },
});
