import Icon from "@safsims/components/Icon/Icon";
import { TickIcon } from "@safsims/components/Images";
import Input from "@safsims/components/Input/Input";
import Text from "@safsims/components/Text/Text";
import { lightTheme } from "@safsims/utils/Theme";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
const GRADES = ["A", "B", "C"];
export default function EarlyYearsScoreCard() {
  const [current, setCurrent] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={{ fontWeight: "500" }} h2>
          Can count 1-10
        </Text>
      </View>

      <View style={styles.content}>
        {GRADES.map((value, index) => (
          <TouchableOpacity
            onPress={() => setCurrent(index)}
            style={[
              styles.skillButton,
              {
                backgroundColor:
                  current == index
                    ? lightTheme.colors.PrimaryColor
                    : lightTheme.colors.PrimaryFade,
                borderWidth: current == index ? 0 : 1,
              },
            ]}
            key={value}
          >
            <TickIcon
              color={current == index ? "#fff" : lightTheme.colors.PrimaryGrey}
            />
            <View
              style={[
                styles.text,
                {
                  backgroundColor:
                    current == index ? "#fff" : lightTheme.colors.PrimaryFade,
                },
              ]}
            >
              <Text
                style={{
                  color:
                    current == index ? lightTheme.colors.PrimaryColor : "#000",
                  fontWeight: "500",
                }}
                h2
              >
                {value}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.divider} />
      <View style={styles.comment}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="message-add" size={20} />
          <Text style={{ marginLeft: 10 }} h3>
            Add Comment
          </Text>
        </View>
        <Input placeholder="Enter comment here...." />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    minHeight: 250,
    width: "100%",
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 20,
  },
  head: {
    height: 48,
    width: "100%",
    backgroundColor: lightTheme.colors.PrimaryFade,
    justifyContent: "center",
    paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  skillButton: {
    flexBasis: "25%",
    width: 64,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    paddingHorizontal: 5,
    borderColor: lightTheme.colors.PrimaryBorderColor,
  },
  text: {
    width: "50%",
    height: "90%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: lightTheme.colors.PrimaryBorderColor,
    marginVertical: 10,
  },
  comment: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
