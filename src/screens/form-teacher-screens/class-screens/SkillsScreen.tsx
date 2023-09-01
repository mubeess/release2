import Icon from "@safsims/components/Icon/Icon";
import Input from "@safsims/components/Input/Input";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import StudentListItem from "../components/StudentListItem";
import { ClassMemberDto, StudentDto } from "@safsims/generated";
interface IProps {
  students: ClassMemberDto[];
  loading: boolean;
}
export default function SkillsScreen({ students, loading }: IProps) {
  return (
    <View style={styles.container}>
      <Input
        style={{ width: "100%" }}
        IconLeft={<Icon name="search-normal" size={20} />}
        placeholder="Search student by name or id"
      />
      <ScrollView style={{ flex: 1 }}>
        {students.map((student, ind) => (
          <StudentListItem
            index={ind}
            key={ind}
            student={student}
            route={"SkillsAssessment"}
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
  },
});
