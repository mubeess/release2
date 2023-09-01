import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import StudentHeader from "../components/StudentHeader";
import { lightTheme } from "@safsims/utils/Theme";
import Text from "@safsims/components/Text/Text";
import ResultCard from "../components/ResultCard";
import Input from "@safsims/components/Input/Input";
import Button from "@safsims/components/Button/Button";
import EarlyYearsResultCard from "../components/EarlyYearsResultCard";
import useChildResultGet from "../hooks/useChildResultGet";
import useCurrentTermGet from "@safsims/general-hooks/useCurrentTermGet";
import SkeletonLoader from "@safsims/components/SkeletonLoader/SkeletonLoader";
import useGetAllClassStudentsGet from "../hooks/useGetAllClassStudentsGet";
import useUpdateTermAssessmentComment from "../hooks/useUpdateTermAssessmentComment";
import { useAppSelector } from "@safsims/redux/hooks/useAppSelector";
import useStudentTraitAssessmentGet from "../hooks/useStudentTraitAssessmentGet";
interface IProps {
  termId: string;
  studentId: string;
}
export default function ResultDetailScreen({ route }) {
  const { termId, classLevelId, armId, index, early_years } = route.params;
  const [currentIndex, setCurrentIndex] = useState(index);
  const data = useAppSelector((state) => state);

  const { students, loadingStudents } = useGetAllClassStudentsGet({
    armId,
    classLevelId,
  });
  const { getChildResult, childResult, loading } = useChildResultGet();
  const { getTraitAssessment, loadingTraits, traitAssessments } =
    useStudentTraitAssessmentGet();
  const [comment, setComment] = useState("");
  const { updateChildComment, updatingComment } =
    useUpdateTermAssessmentComment();

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

  const handleCommentUpdate = () => {
    updateChildComment({
      request: {
        comments: comment,
        student_id: students[currentIndex].student_dto?.id || "",
        staff_comment_type: "FORM_TEACHER_COMMENT",
        term_comment_type: "END_OF_TERM",
        term_id: termId,
        staff_id: data.user.currentUser.id,
      },
    });
  };

  useEffect(() => {
    if (!loadingStudents && students.length > 0) {
      if (!early_years) {
        getChildResult({
          studentId: students[currentIndex].student_dto?.id,
          termId,
        });
        setComment(childResult?.term_result?.result?.comments || "");
      } else {
        getTraitAssessment({
          studentId: students[currentIndex].student_dto?.id,
          termId,
        });
      }
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
        screen="Results"
        profile_pic={profile_pic || ""}
      />
      <ScrollView style={{ flex: 1 }}>
        {!loading && !loadingStudents && !early_years && (
          <>
            <View style={styles.resultRow}>
              <View style={styles.resultData}>
                <Text style={{ fontSize: 10, marginBottom: 10 }}>
                  No. Of Students
                </Text>
                <Text h2>{childResult?.term_result?.result?.out_of}</Text>
              </View>

              <View style={styles.resultData}>
                <Text style={{ fontSize: 10, marginBottom: 10 }}>
                  Class Average
                </Text>
                <Text h2>
                  {childResult?.term_result?.result?.average_score}
                </Text>
              </View>

              <View
                style={{
                  ...styles.resultData,
                  borderRightWidth: 0,
                }}
              >
                <Text style={{ fontSize: 10, marginBottom: 10 }}>
                  Highest Average
                </Text>
                <Text h2>
                  {childResult?.term_result?.result?.highest_score}
                </Text>
              </View>
            </View>

            <View
              style={{
                ...styles.resultRow,
                borderTopWidth: 0,
              }}
            >
              <View style={styles.resultData}>
                <Text style={{ fontSize: 10, marginBottom: 10 }}>
                  Lowest Average
                </Text>
                <Text h2>{childResult?.term_result?.result?.lowest_score}</Text>
              </View>

              <View style={styles.resultData}>
                <Text style={{ fontSize: 10, marginBottom: 10 }}>
                  Final Average
                </Text>
                <Text h2>
                  {childResult?.term_result?.result?.final_average}
                </Text>
              </View>

              <View
                style={{
                  ...styles.resultData,
                  borderRightWidth: 0,
                }}
              >
                <Text style={{ fontSize: 10, marginBottom: 10 }}>Grade</Text>
                <Text
                  style={{
                    color:
                      childResult?.term_result?.result?.grade == "F"
                        ? lightTheme.colors.PrimaryRed
                        : lightTheme.colors.PrimaryGreen,
                  }}
                  h2
                >
                  {childResult?.term_result?.result?.grade}
                </Text>
              </View>
            </View>

            <ScrollView style={styles.cards}>
              {childResult?.term_result?.subject_results?.map((result, ind) => (
                <ResultCard result={result} key={ind} />
              ))}

              <Text
                style={{
                  textTransform: "uppercase",
                  fontSize: 12,
                  marginTop: 20,
                }}
                h3
              >
                Head teacher’s comment
              </Text>
              <TextInput
                onChangeText={(text) => setComment(text)}
                value={comment}
                multiline
                style={styles.input}
              />
              <Button
                isLoading={updatingComment}
                onPress={handleCommentUpdate}
                style={{ marginBottom: 20 }}
                label="Update Report"
              />
            </ScrollView>
          </>
        )}

        {early_years && (
          <ScrollView style={styles.cards}>
            {traitAssessments.map((trait, ind) => (
              <EarlyYearsResultCard trait={trait} key={ind} />
            ))}
            <Text
              style={{
                textTransform: "uppercase",
                fontSize: 12,
                marginTop: 20,
              }}
              h3
            >
              Head teacher’s comment
            </Text>
            <TextInput
              onChangeText={(text) => setComment(text)}
              value={comment}
              multiline
              style={styles.input}
            />
            <Button
              isLoading={updatingComment}
              onPress={handleCommentUpdate}
              style={{ marginBottom: 20 }}
              label="Update Report"
            />
          </ScrollView>
        )}
        {loadingTraits && <SkeletonLoader isLoading />}
        {loading && <SkeletonLoader isLoading />}
        {loadingStudents && <SkeletonLoader isLoading />}
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
});
