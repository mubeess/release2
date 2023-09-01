import Button from "@safsims/components/Button/Button";
import AppHeader from "@safsims/components/Header/AppHeader";
import { ClassEmptyState, MoreIcon } from "@safsims/components/Images";
import Text from "@safsims/components/Text/Text";
import { lightTheme } from "@safsims/utils/Theme";
import React, { Component, useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ClassCard from "../components/ClassCard";
import AttendanceCard from "../components/AttendanceCard";
import TeachersCard from "../components/TeachersCard";
import BottomSlider from "@safsims/components/BottomSlider/BottomSlider";
import AttendanceMenuItem from "../components/AttendanceMenuItem";
import { useDispatch } from "react-redux";
import { updateAppUserState } from "@safsims/redux/users/actions";
import useGetClassessInformationGet from "../hooks/useGetClassessInformationGet";

import SkeletonLoader from "@safsims/components/SkeletonLoader/SkeletonLoader";
import { useAppSelector } from "@safsims/redux/hooks/useAppSelector";
import EmptyState from "@safsims/components/EmptyState/EmptyState";
import useStaffRoleAssignmentGet from "@safsims/general-hooks/useStaffRoleAssignmentGet";
import useAcademicStaffsGet from "@safsims/general-hooks/useAcademicStaffsGet";
import Icon from "@safsims/components/Icon/Icon";
import { FORM_TEACHER_ROLE } from "@safsims/utils/utils";
import useGetAttendanceStatistic from "../hooks/useGetAttendanceStatistic";

function FormTeacherHomeScreen({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [teacherModalOpen, setTeacherModalOpen] = useState(false);
  const user = useAppSelector((data) => data.user);
  const { classess, loadingClassess } = useGetClassessInformationGet();
  const { loading, staffs } = useAcademicStaffsGet();

  const dispatch = useDispatch();
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleTeacherModal = () => {
    setTeacherModalOpen(!teacherModalOpen);
  };
  const assignedClasses =
    user.activeUserType == FORM_TEACHER_ROLE
      ? classess.filter(
          (individualClass) =>
            individualClass.main_form_teacher?.id == user.currentUser.id ||
            individualClass.assistant_form_teacher?.id == user.currentUser.id
        )
      : classess;

  const { attendanceStat, loadingAttendanceStat } = useGetAttendanceStatistic({
    armId:
      !loadingClassess && assignedClasses.length > 0
        ? assignedClasses[0].arm?.id
        : "",
    classLevelId:
      !loadingClassess && assignedClasses.length > 0
        ? assignedClasses[0].class_level?.id
        : "",
  });
  useEffect(() => {
    dispatch(
      updateAppUserState({
        tabBarStyle: {
          display: "flex",
        },
      })
    );
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <ScrollView style={styles.content}>
        <View style={styles.head}>
          <Text h3>Assigned Classes</Text>
          <Button
            onPress={() => {
              navigation.navigate("FormTeacherClass");
            }}
            fontStyle={{ color: lightTheme.colors.PrimaryGrey }}
            IconLeft={<MoreIcon />}
            style={styles.more}
            label="See more"
          />
        </View>
        {loadingClassess && <SkeletonLoader isLoading />}
        {!loadingClassess && (
          <>
            {assignedClasses.slice(0, 2).map((classInfo, ind) => (
              <ClassCard data={classInfo} key={ind} />
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

        <View style={styles.head}>
          <Text h3>Attendance Status</Text>
          <Button
            onPress={() => toggleModal()}
            fontStyle={{ color: lightTheme.colors.PrimaryGrey }}
            IconLeft={<MoreIcon />}
            style={styles.more}
            label="See more"
          />
        </View>

        {!loadingAttendanceStat && (
          <View style={styles.attendanceContainer}>
            {attendanceStat.stats &&
              attendanceStat.stats.length > 0 &&
              attendanceStat.stats
                ?.slice(0, 3)
                .map((attendance, ind) => (
                  <AttendanceCard
                    isLast={ind == 2}
                    attendance={attendance}
                    key={ind}
                  />
                ))}
          </View>
        )}
        {loadingAttendanceStat && <SkeletonLoader isLoading />}
        {!loadingAttendanceStat &&
          attendanceStat.stats &&
          attendanceStat.stats.length == 0 && (
            <EmptyState
              Image={<ClassEmptyState />}
              title="Kudos!"
              info="Keeping it Clean"
            />
          )}
        <View style={styles.head}>
          <Text h3>Teachers List</Text>
          <Button
            onPress={toggleTeacherModal}
            fontStyle={{ color: lightTheme.colors.PrimaryGrey }}
            IconLeft={<MoreIcon />}
            style={styles.more}
            label="See more"
          />
        </View>
        {loading && <SkeletonLoader isLoading />}
        {!loading && (
          <View style={styles.attendanceContainer}>
            {staffs.slice(0, 3).map((teacher, ind) => (
              <TeachersCard key={ind} isLast={ind == 2} teacher={teacher} />
            ))}
          </View>
        )}
      </ScrollView>

      <Modal visible={teacherModalOpen} animationType="slide">
        <View style={styles.moreAttendance}>
          <View style={styles.moreAttendanceHead}>
            <Text style={{ marginVertical: 10 }} h2>
              All Teachers
            </Text>

            <TouchableOpacity onPress={toggleTeacherModal}>
              <Icon name="close-square" size={24} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              ...styles.divider,
              marginVertical: 0,
            }}
          />
          <ScrollView style={styles.moreAttendanceList}>
            {loading && <SkeletonLoader isLoading />}
            {!loading && (
              <>
                {staffs.map((teacher, ind) => (
                  <TeachersCard key={ind} teacher={teacher} />
                ))}
              </>
            )}
          </ScrollView>
        </View>
      </Modal>

      <Modal visible={modalOpen} animationType="slide">
        <View style={styles.moreAttendance}>
          <View style={styles.moreAttendanceHead}>
            <Text style={{ marginVertical: 10 }} h2>
              Attendance Status
            </Text>

            <TouchableOpacity onPress={toggleModal}>
              <Icon name="close-square" size={24} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              ...styles.divider,
              marginVertical: 0,
            }}
          />
          <ScrollView style={styles.moreAttendanceList}>
            {!loadingAttendanceStat && (
              <>
                {attendanceStat.stats &&
                  attendanceStat.stats.length > 0 &&
                  attendanceStat.stats?.map((attendance, ind) => (
                    <AttendanceCard attendance={attendance} key={ind} />
                  ))}
              </>
            )}
            {loadingAttendanceStat && <SkeletonLoader isLoading />}
            {!loadingAttendanceStat &&
              attendanceStat.stats &&
              attendanceStat.stats.length == 0 && (
                <EmptyState
                  Image={<ClassEmptyState />}
                  title="Kudos!"
                  info="Keeping it Clean"
                />
              )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  more: {
    width: 120,
    height: 36,
    backgroundColor: lightTheme.colors.PrimaryFade,
    marginLeft: "auto",
    marginRight: 0,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  attendanceContainer: {
    maxHeight: 200,
    width: "100%",
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    marginBottom: 25,
    borderRadius: 5,
  },
  moreAttendance: {
    flex: 1,
  },
  moreAttendanceHead: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: lightTheme.colors.PrimaryBorderColor,
    marginVertical: 20,
  },
  moreAttendanceList: {
    paddingHorizontal: 20,
  },
});
export default FormTeacherHomeScreen;
