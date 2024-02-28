import Icon from "@safsims/components/Icon/Icon";
import Input from "@safsims/components/Input/Input";
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import SkeletonLoader from "@safsims/components/SkeletonLoader/SkeletonLoader";
import { SubjectDto, SubjectTeacherDto } from "@safsims/generated";
import useSubjectGet from "../form-teacher-screens/hooks/useSubjectGet";

import ClassProfileHeader from "../form-teacher-screens/components/ClassProfileHeader";
import MySubjectCard from "./components/MySubjectCard";
import { useAppSelector } from "@safsims/redux/hooks/useAppSelector";
import Text from "@safsims/components/Text/Text";

export default function SubjectsScreen({ route }) {
  const user = useAppSelector((user) => user.user);
  const userRole = user.activeUserType;
  const subjectss = useMemo(() => {
    return JSON.parse(user.subject_teacher);
  }, []);

  const { className, short_name, armId, classLevelId } = route.params;

  const FilteredSubject = subjectss.filter(
    (subj: SubjectTeacherDto) =>
      subj.class_information?.class_level?.id == classLevelId
  );

  return (
    <View style={styles.main}>
      <ClassProfileHeader short_name={short_name} name={className} />

      <ScrollView style={styles.container}>
        <>
          {FilteredSubject.map((subject: SubjectDto, ind) => (
            <MySubjectCard
              classLevelId={classLevelId}
              armId={armId}
              subject={subject}
              key={ind}
              short_name={short_name}
              name={className}
              armName={className}
            />
          ))}
        </>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  main: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
