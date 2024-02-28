import Icon from "@safsims/components/Icon/Icon";
import Input from "@safsims/components/Input/Input";
import Text from "@safsims/components/Text/Text";
import { lightTheme } from "@safsims/utils/Theme";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import StudentAttendanceCard from "../components/StudentAttendanceCard";
import Button from "@safsims/components/Button/Button";
import { ArrowLeftIcon, ArrowRightIcon } from "@safsims/components/Images";
import Modal from "@safsims/components/Modal/Modal";
import BottomSlider from "@safsims/components/BottomSlider/BottomSlider";
import AtendanceCalender from "./components/AtendanceCalender";
import { AttendanceRequest, ClassMemberDto } from "@safsims/generated";
import SkeletonLoader from "@safsims/components/SkeletonLoader/SkeletonLoader";
import moment from "moment";
import useGetClassAttendance from "../hooks/useGetClassAttendance";
import useUpdateClassAttendace from "../hooks/useUpdateClassAttendance";
import useCurrentTermGet from "@safsims/general-hooks/useCurrentTermGet";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
interface IProps {
  armId: string;
  classLevelId: string;
}
export default function ClassAttendance({ armId, classLevelId }: IProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const scaleValue = useSharedValue(1);
  const AnimatedStatus = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
    };
  });
  const today = moment();
  const [selectedDay, setSlectedDay] = useState(
    moment(today).format("YYYY/MM/DD")
  );
  const { currentTerm } = useCurrentTermGet();
  const { updateAttendance, updatingAttendance } = useUpdateClassAttendace();
  const { attendance, loadingAttendance } = useGetClassAttendance({
    armId,
    classLevelId,
    dateRecorded: selectedDay.replace(/\//g, "-"),
  });

  const toggleCalendar = () => {
    setCalendarOpen(!calendarOpen);
  };

  const setCurrentDate = (date) => {
    setSlectedDay(date);
  };
  const recorded = attendance.filter(
    (attendance) => attendance.date_recorded !== null
  );
  useEffect(() => {
    scaleValue.value = withRepeat(
      withTiming(scaleValue.value == 1 ? 0.3 : 1, { duration: 1000 }),
      -1,
      true
    );
  }, []);
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

        {!loadingAttendance && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Animated.View
              style={[
                styles.status,
                {
                  backgroundColor:
                    recorded.length > 0
                      ? lightTheme.colors.PrimaryGreen
                      : lightTheme.colors.PrimaryRed,
                },
                AnimatedStatus,
              ]}
            />
            <Text>
              Attendance {recorded.length > 0 ? "Taken" : "Not Taken"}
            </Text>
          </View>
        )}
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
            {attendance.map((mainAttendance, ind) => (
              <StudentAttendanceCard key={ind} student={mainAttendance} />
            ))}
          </>
        )}
        {loadingAttendance && <SkeletonLoader isLoading />}

        <View style={styles.actionButtons}>
          <Button
            fontStyle={{ color: "#000" }}
            style={styles.cancel}
            label="Cancel"
          />
          <Button
            onPress={() => {
              const studentAttendanceRequest = attendance.map(
                (individualAttendane) => {
                  return {
                    absence_reason: individualAttendane.absence_reason,
                    afternoon_status: individualAttendane.afternoon_status,
                    late: individualAttendane.late,
                    morning_status: individualAttendane.morning_status,
                    student_id:
                      individualAttendane.class_member?.student_dto?.id,
                  };
                }
              );
              updateAttendance({
                request: {
                  arm_id: armId,
                  class_level_id: classLevelId,
                  date_recorded: selectedDay.replace(/\//g, "-"),
                  term_id: currentTerm?.term_id || "",
                  student_attendance_requests: studentAttendanceRequest,
                },
              });
            }}
            isLoading={updatingAttendance}
            style={styles.save}
            label="Save"
          />
        </View>

        {/* <View style={styles.buttons2}>
          <Button
            style={{
              ...styles.button2,
              backgroundColor: "transparent",
              elevation: 0,
              borderWidth: 1,
              borderColor: lightTheme.colors.PrimaryBorderColor,
            }}
            label=""
            IconLeft={<ArrowLeftIcon />}
          />
          <Text style={{ color: lightTheme.colors.PrimaryColor }}>1 of 3</Text>
          <Button
            IconLeft={<ArrowRightIcon />}
            style={{
              ...styles.button2,
              backgroundColor: "transparent",
              elevation: 0,
              borderWidth: 1,
              borderColor: lightTheme.colors.PrimaryBorderColor,
            }}
            label=""
          />
        </View> */}
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
  status: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginRight: 10,
  },
});
