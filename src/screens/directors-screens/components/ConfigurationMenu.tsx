import { View, StyleSheet } from "react-native";
import React from "react";
import { lightTheme } from "../../../utils/Theme";
import Text from "../../../components/Text/Text";

interface ConfigMenuProps {
  number: number;
  label: string;
  description: string;
}
export default function ConfigurationMenu({
  number,
  label,
  description,
}: ConfigMenuProps) {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <View style={styles.description}>
        <Text>{description}</Text>
        <Text h2>{number}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    borderRadius: 10,
    marginTop: 20,
    padding: 20,
  },
  description: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "center",
  },
});
