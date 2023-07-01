import { View, StyleSheet } from "react-native";
import React from "react";
import { lightTheme } from "../../../utils/Theme";
import Text from "../../../components/Text/Text";
interface StatCardProps {
  label: string;
  number: number;
  color?: string;
}
export default function StatCard({
  label,
  number,
  color = "#000",
}: StatCardProps) {
  return (
    <View style={styles.statContainer}>
      <Text style={{ color }} h2>
        {number}
      </Text>
      <Text style={{ marginTop: 5 }}>{label}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  statContainer: {
    height: 80,
    flex: 1,
    borderWidth: 1,
    borderColor: lightTheme.colors.TetiaryColor,
    borderRadius: 10,
    padding: 10,
    flexBasis: "45%",
    marginRight: 10,
    marginBottom: 10,
  },
});
