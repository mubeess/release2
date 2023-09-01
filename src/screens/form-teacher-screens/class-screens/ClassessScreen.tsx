import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ClassCard from "../components/ClassCard";
import AppHeader from "@safsims/components/Header/AppHeader";
import useGetClassessInformationGet from "../hooks/useGetClassessInformationGet";
import SkeletonLoader from "@safsims/components/SkeletonLoader/SkeletonLoader";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@safsims/redux/hooks/useAppSelector";
import EmptyState from "@safsims/components/EmptyState/EmptyState";
import { ClassEmptyState } from "@safsims/components/Images";
import { FORM_TEACHER_ROLE } from "@safsims/utils/utils";

export default function ClassessScreen({ navigation }) {
  const { classess, loadingClassess } = useGetClassessInformationGet();
  const user = useAppSelector((data) => data.user);

  const assignedClasses =
    user.activeUserType == FORM_TEACHER_ROLE
      ? classess.filter(
          (individualClass) =>
            individualClass.main_form_teacher?.id == user.currentUser.id ||
            individualClass.assistant_form_teacher?.id == user.currentUser.id
        )
      : classess;

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />
      <ScrollView style={styles.classes}>
        {loadingClassess && <SkeletonLoader isLoading />}
        {!loadingClassess && (
          <>
            {assignedClasses.map((classInfo, ind) => (
              <ClassCard
                onPress={() =>
                  navigation.navigate("ClassProfile", {
                    className: classInfo.class_level?.name,
                    short_name: classInfo.class_level?.short_name,
                    armId: classInfo.arm?.id,
                    classLevelId: classInfo.class_level?.id,
                    early_years: classInfo.class_level?.early_years,
                  })
                }
                data={classInfo}
                key={ind}
              />
            ))}
          </>
        )}
        {!loadingClassess && assignedClasses.length == 0 && (
          <EmptyState
            Image={<ClassEmptyState />}
            title="Opps!"
            info="You don't have assigned classess"
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  classes: {
    flex: 1,
    padding: 20,
  },
});
