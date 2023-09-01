import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import FormTeacherCard from "../components/FormTeacherCard";
import useGetIndividualClassessInformation from "../hooks/useGetIndividualClassInformation";
import { TouchableOpacity } from "react-native";
import Text from "@safsims/components/Text/Text";
import SkeletonLoader from "@safsims/components/SkeletonLoader/SkeletonLoader";
interface IProps {
  armId: string;
  classLevelId: string;
}
export default function FormTeacherListScreen({ classLevelId, armId }: IProps) {
  const { classess, loadingClass } = useGetIndividualClassessInformation({
    classLevelId,
    armId,
  });
  return (
    <ScrollView style={styles.container}>
      {!loadingClass && (
        <FormTeacherCard
          teacher={classess?.length > 0 && classess[0].main_form_teacher}
        />
      )}
      {!loadingClass &&
        classess.length > 0 &&
        classess[0].assistant_form_teacher && (
          <FormTeacherCard
            notFormTeacher
            teacher={classess?.length > 0 && classess[0].assistant_form_teacher}
          />
        )}
      {loadingClass && <SkeletonLoader isLoading />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
  },
});
