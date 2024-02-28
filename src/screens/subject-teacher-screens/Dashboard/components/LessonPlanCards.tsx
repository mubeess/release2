import { useNavigation } from "@react-navigation/native";
import Button from "@safsims/components/Button/Button";
import Icon from "@safsims/components/Icon/Icon";
import Text from "@safsims/components/Text/Text";
import { LessonPlanDto, SubjectDto } from "@safsims/generated";
import { lightTheme } from "@safsims/utils/Theme";
import moment from "moment";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function LessonPlanCards({ plan }: { plan: LessonPlanDto }) {
  const colors = [
    {
      bg: "#CAF5E6",
      font: "#03B2CB",
    },
    {
      bg: "#FBEFCA",
      font: "#F2C02E",
    },
  ];
  const tags = ["language", "core"];
  const randomNumber = Math.round(Math.random());
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.subject}>
        <View>
          <Text style={{ color: lightTheme.colors.PrimaryColor }}>
            {plan.week?.name}
          </Text>
          <Text style={{ fontSize: 12 }}>{plan.class_level?.short_name}</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="note-2" size={20} />
          <Text
            numberOfLines={1}
            style={{ fontSize: 12, marginLeft: 5, width: 70 }}
          >
            {plan.topic}
          </Text>
        </View>
      </View>

      <View style={styles.dates}>
        <View>
          <Text style={styles.dateLabel}>Start Date</Text>
          <Text style={styles.dateValue}>
            {moment(plan.week?.start_date).format("DD/MM/YYYY")}
          </Text>
        </View>

        <View>
          <Text style={styles.dateLabel}>End Date</Text>
          <Text style={styles.dateValue}>
            {moment(plan.week?.end_date).format("DD/MM/YYYY")}
          </Text>
        </View>
      </View>

      <View style={styles.names}>
        <Button
          onPress={
            () => {}
            // navigation.navigate("SubjectAttendance", {
            //   classLevelId,
            //   armId,
            //   short_name: subject.subject_name,
            //   name: short_name,
            //   subjectId: subject.id,
            // })
          }
          fontStyle={{ color: lightTheme.colors.PrimaryColor }}
          style={{
            ...styles.button,
            backgroundColor: "#fff",
            borderWidth: 1,
            borderColor: lightTheme.colors.PrimaryColor,
          }}
          label="Edit Week"
        />
        <Button
          onPress={
            () => {}
            // navigation.navigate("TeacherAssessmentStudents", {
            //   classLevelId,
            //   armId,
            //   short_name,
            //   name,
            //   subjectId: subject.id,
            // })
          }
          style={styles.button}
          label="View Lesson"
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 223,
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    borderRadius: 10,
    marginTop: 20,
  },
  subject: {
    height: 74,
    backgroundColor: lightTheme.colors.PrimaryFade,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tags: {
    flexDirection: "row",
    marginTop: 10,
  },
  tag: {
    minWidth: 40,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,

    borderRadius: 30,
  },
  names: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
    marginBottom: 20,
  },
  button: {
    width: "45%",
    height: 36,
  },
  dates: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    paddingHorizontal: 10,
  },
  dateLabel: {
    textTransform: "uppercase",
    fontSize: 12,
    color: lightTheme.colors.PrimaryGrey,
  },
  dateValue: {
    fontSize: 12,
    color: lightTheme.colors.PrimaryGrey,
  },
});
