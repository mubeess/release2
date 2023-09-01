import { View, StyleSheet } from "react-native";
import React from "react";
import { lightTheme } from "@safsims/utils/Theme";
import Text from "@safsims/components/Text/Text";

export default function TimeTableCard() {
  return (
    <View style={styles.container}>
      <View style={styles.time}>
        <Text>8:00</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.decoration} />
        <View style={styles.decoration} />
        <View style={styles.mainTable}>
          <Text style={styles.text} h2>
            English
          </Text>
          <Text style={styles.text}>JSS 1 Silver</Text>
          <Text style={styles.text} h3>
            8:10AM - 8:50AM
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 110,
    borderBottomColor: lightTheme.colors.PrimaryBorderColor,
    borderBottomWidth: 1,
    borderStyle: "dashed",
    width: "100%",
    flexDirection: "row",
  },
  time: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: lightTheme.colors.PrimaryBorderColor,
    borderStyle: "dashed",
  },
  body: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
    position: "relative",
  },
  decoration: {
    height: "40%",
    width: "100%",
    backgroundColor: "#FAFAFA",
  },
  mainTable: {
    position: "absolute",
    width: "90%",
    height: 80,
    backgroundColor: "#043880",
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 20,
    padding: 10,
  },
  text: {
    color: "#fff",
  },
});
