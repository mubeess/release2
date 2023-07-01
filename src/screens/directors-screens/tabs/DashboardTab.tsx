import { View, StyleSheet } from "react-native";
import React from "react";
import FinancialReport from "../components/FinancialReport";
import StaffReport from "../components/StaffReport";
import ClassesStudentsReport from "../components/ClassesStudentsReport";

export default function DashboardTab() {
  return (
    <View style={styles.container}>
      <FinancialReport />
      <StaffReport />
      <ClassesStudentsReport />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
