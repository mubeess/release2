import Icon from "@safsims/components/Icon/Icon";
import Input from "@safsims/components/Input/Input";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import SubjectCard from "../components/SubjectCard";
import useSubjectGet from "../hooks/useSubjectGet";
import SkeletonLoader from "@safsims/components/SkeletonLoader/SkeletonLoader";
import { SubjectDto } from "@safsims/generated";
interface IProps {
  classLevelId: string;
  armId: string;
}
export default function SubjectsScreen({ classLevelId, armId }: IProps) {
  const { subjects, loadingSubjects } = useSubjectGet({ classLevelId, armId });

  return (
    <ScrollView style={styles.container}>
      <Input
        style={{ width: "100%" }}
        IconLeft={<Icon name="search-normal" size={20} />}
        placeholder="Search subject name or code"
      />
      {loadingSubjects && <SkeletonLoader isLoading />}
      {!loadingSubjects && subjects.length > 0 && (
        <>
          {subjects.map((subject: SubjectDto, ind) => (
            <SubjectCard subject={subject} key={ind} />
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
