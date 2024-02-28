import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import AppHeader from "@safsims/components/Header/AppHeader";
import Text from "@safsims/components/Text/Text";
import Icon from "@safsims/components/Icon/Icon";
import StatCards from "./components/StatCards";
import { lightTheme } from "@safsims/utils/Theme";
import LessonPlanCards from "./components/LessonPlanCards";
import SubjectsCard from "./components/SubjectsCard";
import useGetClassessInformationGet from "@safsims/screens/form-teacher-screens/hooks/useGetClassessInformationGet";
import { useAppSelector } from "@safsims/redux/hooks/useAppSelector";
import useGetTeacherLessonPlan from "./hooks/useGetTeacherLessonPlan";
import SkeletonLoader from "@safsims/components/SkeletonLoader/SkeletonLoader";
import { ADMIN_ROLE, FORM_TEACHER_ROLE } from "@safsims/utils/utils";
import FormTeacherHomeScreen from "@safsims/screens/form-teacher-screens/form-teacher-home-screens/FormTeacherHomeScreen";
import EmptyState from "@safsims/components/EmptyState/EmptyState";
import { EmptyPaper } from "@safsims/components/Images";
import moment from "moment";
import Button from "@safsims/components/Button/Button";

export default function SubjectTeacherDasnboard({ navigation }) {
  const user = useAppSelector((user) => user.user);
  const userRole = user.activeUserType;
  const subjects = useMemo(() => {
    return JSON.parse(user.subject_teacher);
  }, []);
  const totalClasses = useMemo(() => {
    return subjects?.map((classes) => classes.class_information);
  }, []);
  const totalStudens = subjects?.map(
    (classes) => classes.class_information?.class_level?.student_count
  );
  const { myLessonPlans, loading } = useGetTeacherLessonPlan(
    user.currentUser.id
  );
  const uniqueClasses = useMemo(() => {
    const myUniqueArray = Object.values(
      totalClasses.reduce((uniqueMap, item) => {
        uniqueMap[item.class_level.id] = item;
        return uniqueMap;
      }, {})
    );

    return myUniqueArray;
  }, [totalClasses]);

  // const STATS = [
  //   {
  //     color: lightTheme.colors.PrimaryColor,
  //     label: "Total Students",
  //     value: totalStudens?.reduce((a, b) => a + b, 0),
  //     icon: "people",
  //   },
  //   {
  //     color: lightTheme.colors.PrimaryOrange,
  //     label: "Total Subjects",
  //     value: subjects?.length,
  //     icon: "book-saved",
  //   },
  //   {
  //     color: lightTheme.colors.PrimaryRed,
  //     label: "Total Classes",
  //     value: uniqueClasses.length,
  //     icon: "house-2",
  //   },
  // ];

  const STATS = useMemo(() => {
    return [
      {
        color: lightTheme.colors.PrimaryColor,
        label: "Total Students",
        value: totalStudens?.reduce((a, b) => a + b, 0),
        icon: "people",
      },
      {
        color: lightTheme.colors.PrimaryOrange,
        label: "Total Subjects",
        value: subjects?.length,
        icon: "book-saved",
      },
      {
        color: lightTheme.colors.PrimaryRed,
        label: "Total Classes",
        value: uniqueClasses.length,
        icon: "house-2",
      },
    ];
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />
      {/* {(userRole == FORM_TEACHER_ROLE || userRole == ADMIN_ROLE) &&
        subjects.length && (
          <View>
            <Button style={} label="Subject Teacher" />
          </View>
        )} */}
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        style={styles.scrollview}
      >
        <Text h3>
          Welcome Back, {user.currentUser.first_name} {user.currentUser.surname}
        </Text>

        <View style={styles.calender}>
          <Icon size={20} name="calendar" />
          <Text style={{ ...styles.textIcon, marginRight: 6 }}>
            {moment().format("YYYY-MM-DD")}
          </Text>
          <Icon size={20} name="clock" />
          <Text style={styles.textIcon}>{moment().format("HH:mm")}</Text>
        </View>
        <>
          {user.subject_teacher && (
            <>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                scrollEnabled
                horizontal
                style={styles.cardsSlider}
              >
                {STATS.map((stat, ind) => (
                  <StatCards key={ind.toString()} {...stat} />
                ))}
              </ScrollView>

              <View style={styles.heading}>
                <Text h3>Lesson Plans</Text>
                <View style={styles.link}>
                  <Text
                    style={{
                      marginRight: 3,
                      color: lightTheme.colors.PrimaryColor,
                      fontSize: 12,
                    }}
                  >
                    +
                  </Text>
                  <Text
                    style={{
                      color: lightTheme.colors.PrimaryColor,
                      textDecorationStyle: "solid",
                      textDecorationColor: lightTheme.colors.PrimaryColor,
                      textDecorationLine: "underline",
                      fontSize: 12,
                    }}
                  >
                    Add Lesson Plan
                  </Text>
                </View>
              </View>
              {loading && <SkeletonLoader isLoading />}
              {!loading && myLessonPlans.length > 0 && (
                <>
                  {myLessonPlans.slice(0, 3).map((plan, index) => (
                    <LessonPlanCards key={index.toString()} plan={plan} />
                  ))}
                </>
              )}

              {!loading && myLessonPlans.length == 0 && (
                <View style={{ marginVertical: 30 }}>
                  <EmptyState
                    Image={<EmptyPaper />}
                    info="No Lesson Plan Added"
                    title="No Lesson Plan"
                  />
                </View>
              )}

              <View style={[styles.heading, { marginTop: 20 }]}>
                <Text h3>My Subjects</Text>
                <TouchableOpacity
                  onPress={() => {
                    console.log(userRole);
                  }}
                  style={styles.link}
                >
                  <Icon size={20} name="more" />
                </TouchableOpacity>
              </View>
              {subjects?.splice(0, 2).map((subject, ind) => (
                <SubjectsCard subject={subject} key={ind.toString()} />
              ))}
            </>
          )}
        </>
        <>
          {(userRole == FORM_TEACHER_ROLE || userRole == ADMIN_ROLE) && (
            <FormTeacherHomeScreen navigation={navigation} />
          )}
        </>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
    backgroundColor: "#fff",
  },
  calender: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 20,
  },
  textIcon: {
    fontSize: 12,
    marginLeft: 5,
  },
  cardsSlider: {
    maxHeight: 120,
    width: "100%",
    marginVertical: 20,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
  },
});
