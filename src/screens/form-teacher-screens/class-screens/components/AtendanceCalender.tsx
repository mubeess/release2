import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import DatePicker from "@safsims/components/DatePicker/DatePicker";
import Button from "@safsims/components/Button/Button";
import moment from "moment";
interface IProps {
  close: () => void;
  setDate: (date: string) => void;
}
export default function AtendanceCalender({ close, setDate }: IProps) {
  const [selectedDate, setSelectedDate] = useState("");
  return (
    <View style={styles.container}>
      <DatePicker
        onChange={(date) => {
          setSelectedDate(date);
        }}
        calenderOnly={true}
      />
      <Button
        onPress={() => {
          const converetedDate = moment(selectedDate).format("YYYY/MM/DD");
          setDate(converetedDate);
          close();
        }}
        style={styles.button}
        label="Apply"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 10,
  },
});
