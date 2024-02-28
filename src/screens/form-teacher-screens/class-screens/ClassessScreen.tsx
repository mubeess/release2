import React, { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ClassCard from "../components/ClassCard";
import AppHeader from "@safsims/components/Header/AppHeader";
import useGetClassessInformationGet from "../hooks/useGetClassessInformationGet";
import SkeletonLoader from "@safsims/components/SkeletonLoader/SkeletonLoader";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@safsims/redux/hooks/useAppSelector";
import EmptyState from "@safsims/components/EmptyState/EmptyState";
import { ClassEmptyState } from "@safsims/components/Images";
import { ADMIN_ROLE, FORM_TEACHER_ROLE } from "@safsims/utils/utils";
import { ClassInformationDto } from "@safsims/generated";
import Text from "@safsims/components/Text/Text";
import { lightTheme } from "@safsims/utils/Theme";

export default function ClassessScreen({ navigation }) {
  const { classess, loadingClassess } = useGetClassessInformationGet();
  const user = useAppSelector((data) => data.user);
  const userRole = user.activeUserType;
  const subjects = useMemo(() => {
    return JSON.parse(user.subject_teacher);
  }, []);
  const totalClasses = useMemo(() => {
    return subjects?.map((classes) => classes.class_information);
  }, []);

  const uniqueClasses = useMemo(() => {
    const myUniqueArray = Object.values(
      totalClasses.reduce((uniqueMap, item) => {
        uniqueMap[item.class_level.id] = item;
        return uniqueMap;
      }, {})
    );

    return myUniqueArray;
  }, [totalClasses]);

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
        {(userRole == FORM_TEACHER_ROLE || userRole == ADMIN_ROLE) &&
          uniqueClasses.length > 0 && (
            <View
              style={{
                padding: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: lightTheme.colors.PrimaryBorderColor,
                width: "50%",
                marginVertical: 10,
              }}
            >
              <Text style={{ fontSize: 12 }}>Subject Classess</Text>
            </View>
          )}
        {uniqueClasses.length > 0 &&
          uniqueClasses.map((classInfo: ClassInformationDto, index) => (
            <ClassCard
              onPress={() => {
                navigation.navigate("MySubject", {
                  className: classInfo.class_level?.name,
                  short_name: classInfo.class_level?.short_name,
                  armId: classInfo.arm?.id,
                  classLevelId: classInfo.class_level?.id,
                  early_years: classInfo.class_level?.early_years,
                  armName: classInfo.arm?.name,
                });
              }}
              data={classInfo}
              key={index.toString()}
            />
          ))}

        {(userRole == FORM_TEACHER_ROLE || userRole == ADMIN_ROLE) &&
          uniqueClasses.length > 0 && (
            <View
              style={{
                padding: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: lightTheme.colors.PrimaryBorderColor,
                width: "50%",
                marginVertical: 10,
              }}
            >
              <Text style={{ fontSize: 12 }}>Form Teacher Classess</Text>
            </View>
          )}
        {loadingClassess && <SkeletonLoader isLoading />}
        {!loadingClassess && (
          <>
            {assignedClasses.map((classInfo, ind) => (
              <ClassCard
                onPress={() => {
                  navigation.navigate("ClassProfile", {
                    className: classInfo.class_level?.name,
                    short_name: classInfo.class_level?.short_name,
                    armId: classInfo.arm?.id,
                    classLevelId: classInfo.class_level?.id,
                    early_years: classInfo.class_level?.early_years,
                    armName: classInfo.arm?.name,
                  });
                }}
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
// ClassProfile
