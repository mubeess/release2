import { View, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "@safsims/components/Icon/Icon";
import { lightTheme } from "@safsims/utils/Theme";
import Text from "@safsims/components/Text/Text";
import TimeTableCard from "../components/TimeTableCard";
import useTimeTableGet from "../hooks/useTimeTableGet";
interface IProps {
  armId: string;
  classLevelId: string;
}
export default function TimeTableScreen({ armId, classLevelId }: IProps) {
  const { timeTable, loadingTimeTable } = useTimeTableGet({
    armId,
    classLevelId,
  });
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity
          onPress={() => {
            console.log(timeTable);
          }}
          style={styles.icon}
        >
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>

        <Text h3>Monday</Text>

        <TouchableOpacity style={styles.icon}>
          <Icon name="arrow-right-1" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <TimeTableCard />
      <TimeTableCard />
      <TimeTableCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 30,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    justifyContent: "center",
    alignItems: "center",
  },
});
