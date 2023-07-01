import { View, StyleSheet } from "react-native";
import React from "react";
import { lightTheme } from "../../../../utils/Theme";
import Text from "../../../../components/Text/Text";

interface ConfigListProps {
  label: string;
  configured?: boolean;
  arm?: string;
}
export default function ConfigurationList({
  configured = false,
  label,
  arm = "",
}: ConfigListProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text h3>{label}</Text>
        <Text
          style={{
            color: lightTheme.colors.PrimaryGrey,
          }}
        >
          {arm}
        </Text>
      </View>

      <View
        style={[
          styles.status,
          {
            backgroundColor: configured
              ? "#CAF5E6"
              : lightTheme.colors.PrimaryBorderColor,
          },
        ]}
      >
        <Text
          style={{
            color: configured
              ? lightTheme.colors.PrimaryGreen
              : lightTheme.colors.PrimaryGrey,
          }}
        >
          {configured ? "Configured" : "Not Configured"}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 70,
    width: "100%",
    padding: 10,
    borderBottomColor: lightTheme.colors.PrimaryBorderColor,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  status: {
    width: "50%",
    height: 30,
    borderRadius: 10,
    backgroundColor: "#CAF5E6",
    justifyContent: "center",
    alignItems: "center",
  },
});
