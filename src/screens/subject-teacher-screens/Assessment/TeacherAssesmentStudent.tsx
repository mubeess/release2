import Icon from "@safsims/components/Icon/Icon";
import Input from "@safsims/components/Input/Input";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ClassMemberDto } from "@safsims/generated";
import StudentListItem from "@safsims/screens/form-teacher-screens/components/StudentListItem";
import useGetAllClassStudentsGet from "@safsims/screens/form-teacher-screens/hooks/useGetAllClassStudentsGet";
import ClassProfileHeader from "@safsims/screens/form-teacher-screens/components/ClassProfileHeader";
import SkeletonLoader from "@safsims/components/SkeletonLoader/SkeletonLoader";
interface IProps {
  students: ClassMemberDto[];
  loading: boolean;
}
export default function TeacherAssesmentStudent({ route }) {
  const { armId, classLevelId, short_name, name, subjectId } = route.params;
  const { students, loadingStudents: loading } = useGetAllClassStudentsGet({
    armId,
    classLevelId,
  });
  return (
    <View style={styles.container}>
      <ClassProfileHeader short_name={short_name} name={name} />
      <Input
        style={{ width: "100%" }}
        IconLeft={<Icon name="search-normal" size={20} />}
        placeholder="Search student by name or id"
      />
      <ScrollView style={{ flex: 1 }}>
        {loading && <SkeletonLoader isLoading />}
        {students.map((student, ind) => (
          <StudentListItem
            student={student}
            key={ind}
            index={ind}
            route={"TeacherAssessment"}
            subjectId={subjectId}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
});
