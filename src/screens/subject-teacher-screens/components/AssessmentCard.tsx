import { TextInput, View } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { lightTheme } from "@safsims/utils/Theme";
import Text from "@safsims/components/Text/Text";

export default function AssessmentCard() {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text>Assignment</Text>
      </View>
      <View style={styles.mainInput}>
        <TextInput value="0" />
        <Text>/12</Text>
      </View>
      <Text style={{ marginLeft: 20 }}>Score</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 115,
    width: "100%",
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    borderRadius: 5,
    marginBottom: 10,
  },
  head: {
    height: 41,
    backgroundColor: lightTheme.colors.PrimaryBackground,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 10,
  },
  mainInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
