import Icon from "@safsims/components/Icon/Icon";
import Input from "@safsims/components/Input/Input";
import Text from "@safsims/components/Text/Text";
import { lightTheme } from "@safsims/utils/Theme";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Button from "@safsims/components/Button/Button";

import BottomSlider from "@safsims/components/BottomSlider/BottomSlider";

import { StudentSubjectAttendanceRequest } from "@safsims/generated";
import SkeletonLoader from "@safsims/components/SkeletonLoader/SkeletonLoader";
import moment from "moment";

import useCurrentTermGet from "@safsims/general-hooks/useCurrentTermGet";

import AtendanceCalender from "@safsims/screens/form-teacher-screens/class-screens/components/AtendanceCalender";

import useGetSubjectAttendance from "../hooks/useGetSubjectAttendance";
import useClassMembersFetch from "@safsims/general-hooks/useClassMembersFetch";
import StudentSubjectAttendance from "./StudentSubjectAttendance";
import useUpdateSubjectAttendance from "../hooks/useUpdateSubjectAttendance";
import { withRepeat, withTiming } from "react-native-reanimated";
interface IProps {
  armId: string;
  classLevelId: string;
  subjectId: string;
}
export default function SubjectAttendance({
  armId,
  classLevelId,
  subjectId,
}: IProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const today = moment();
  const [selectedDay, setSlectedDay] = useState(
    moment(today).format("YYYY/MM/DD")
  );
  const { currentTerm } = useCurrentTermGet();
  const { updateAttendance, updatingAttendance } = useUpdateSubjectAttendance();
  const { classMembers } = useClassMembersFetch({
    armId,
    classLevelId,
    termId: currentTerm?.term_id || "",
    autoFetch: true,
  });

  const { attendance: subjectAttendance, loadingAttendance } =
    useGetSubjectAttendance({
      armId,
      classLevelId,
      subjectId,
      dateRecorded: selectedDay.replace(/\//g, "-"),
    });
  const toggleCalendar = () => {
    setCalendarOpen(!calendarOpen);
  };

  const setCurrentDate = (date) => {
    setSlectedDay(date);
  };

  return (
    <>
      <View style={styles.date}>
        <Text
          h2
          style={{
            fontWeight: "500",
          }}
        >
          {selectedDay}
        </Text>
      </View>

      <View style={styles.searchBar}>
        <Input
          style={{ width: "85%" }}
          IconLeft={<Icon name="search-normal" size={20} />}
          placeholder="Search student by name or id"
        />
        <TouchableOpacity onPress={toggleCalendar} style={styles.calendar}>
          <Icon name="calendar-search" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.cards}>
        {!loadingAttendance && (
          <>
            {classMembers.map((student, ind) => {
              const attendanceRequest: StudentSubjectAttendanceRequest =
                subjectAttendance.length == 0
                  ? {
                      attendance_status: "PRESENT",
                      comment: "",
                      student_id: student.student_dto?.id,
                    }
                  : {
                      attendance_status: subjectAttendance.find(
                        (studentAttendance) =>
                          studentAttendance.class_member?.student_dto?.id ==
                          student.student_dto?.id
                      )?.attendance_status,
                      comment: "",
                      student_id: student.student_dto?.id,
                    };
              student.attendanceRequest = attendanceRequest;
              return (
                <StudentSubjectAttendance
                  attendanceRequest={student.attendanceRequest}
                  key={ind}
                  profile_pic={student.student_dto?.profile_pic || ""}
                  name={student.student_dto?.first_name || ""}
                  email={student.student_dto?.student_id || ""}
                />
              );
            })}
          </>
        )}
        {loadingAttendance && <SkeletonLoader isLoading />}

        <View style={styles.actionButtons}>
          <Button
            onPress={() => {}}
            fontStyle={{ color: "#000" }}
            style={styles.cancel}
            label="Cancel"
          />
          <Button
            onPress={() => {
              const studentAttendanceRequest = classMembers.map(
                (individualAttendane) => {
                  return individualAttendane.attendanceRequest;
                }
              );

              updateAttendance({
                request: {
                  arm_id: armId,
                  class_level_id: classLevelId,
                  lesson_date: selectedDay.replace(/\//g, "-"),
                  term_id: currentTerm?.term_id || "",
                  subject_id: subjectId,
                  student_subject_attendance_requests: studentAttendanceRequest,
                },
              });
            }}
            isLoading={updatingAttendance}
            style={styles.save}
            label="Save"
          />
        </View>
      </ScrollView>
      <BottomSlider
        onClose={toggleCalendar}
        isOpen={calendarOpen}
        children={
          <AtendanceCalender setDate={setCurrentDate} close={toggleCalendar} />
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuButtons: {
    width: "80%",
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryColor,
  },
  button: {
    width: "33.33%",
    borderRadius: 0,
    borderRightWidth: 1,
    borderRightColor: lightTheme.colors.PrimaryColor,
  },
  more: {
    width: 80,
    marginLeft: 5,
    backgroundColor: lightTheme.colors.PrimaryFade,
  },
  date: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBar: {
    marginTop: 20,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  calendar: {
    height: 42,
    width: 42,
    borderRadius: 42,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  cards: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  cancel: {
    width: "40%",
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
  },
  save: {
    width: "40%",
  },
  buttons2: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
    alignItems: "center",
  },
  button2: {
    width: 40,
  },
});
