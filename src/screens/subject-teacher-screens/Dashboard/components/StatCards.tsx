import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { lightTheme } from "@safsims/utils/Theme";
import Icon from "@safsims/components/Icon/Icon";
interface StatCardProps {
  color: string;
  icon: string;
  label: string;
  value: string;
}
export default function StatCards({
  color,
  icon,
  label,
  value,
}: StatCardProps) {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.icons}>
        <Icon name={icon} size={24} color={color} />
      </View>

      <View style={styles.textContainer}>
        <Text style={{ ...styles.text, fontWeight: "500", fontSize: 12 }}>
          {label}
        </Text>
        <Text style={styles.text}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 185,
    height: 118,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginRight: 10,
  },
  icons: {
    backgroundColor: "#fff",
    width: 33,
    height: 33,
    borderRadius: 33,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginTop: "auto",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});
