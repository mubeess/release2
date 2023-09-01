import Icon from "@safsims/components/Icon/Icon";
import Input from "@safsims/components/Input/Input";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import StudentListItem from "../components/StudentListItem";
import { ClassMemberDto } from "@safsims/generated";
import SkeletonLoader from "@safsims/components/SkeletonLoader/SkeletonLoader";
interface IProps {
  students: ClassMemberDto[];
  loading: boolean;
  early_years: boolean;
}
export default function ResultScreen({
  students,
  loading,
  early_years,
}: IProps) {
  return (
    <View style={styles.container}>
      <Input
        style={{ width: "100%" }}
        IconLeft={<Icon name="search-normal" size={20} />}
        placeholder="Search student by name or id"
      />
      <ScrollView style={{ flex: 1 }}>
        {!loading && (
          <>
            {students.map((student, ind) => (
              <StudentListItem
                early_years={early_years}
                index={ind}
                student={student}
                key={ind}
                route={"ResultDetails"}
              />
            ))}
          </>
        )}
        {loading && <SkeletonLoader isLoading />}
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
