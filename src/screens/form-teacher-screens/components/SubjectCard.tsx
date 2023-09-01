import Text from "@safsims/components/Text/Text";
import { SubjectDto } from "@safsims/generated";
import { lightTheme } from "@safsims/utils/Theme";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function SubjectCard({ subject }: { subject: SubjectDto }) {
  const colors = [
    {
      bg: "#CAF5E6",
      font: "#03B2CB",
    },
    {
      bg: "#FBEFCA",
      font: "#F2C02E",
    },
  ];
  const tags = ["language", "core"];
  const randomNumber = Math.round(Math.random());
  return (
    <View style={styles.container}>
      <View style={styles.subject}>
        <Text
          h2
          style={{ color: lightTheme.colors.PrimaryColor, fontWeight: "500" }}
        >
          {subject.subject_name}
        </Text>
        <Text style={{ color: lightTheme.colors.PrimaryGrey }}>
          {subject.abbreviation}
        </Text>
        <View style={styles.tags}>
          <View
            style={[
              styles.tag,
              {
                backgroundColor: colors[randomNumber].bg,
              },
            ]}
          >
            <Text
              h3
              style={{
                fontWeight: "500",
                textTransform: "uppercase",
                fontSize: 10,
                color: colors[randomNumber].font,
              }}
            >
              {subject.short_name}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.names}>
        <Text style={{ fontSize: 12 }} h3>
          {subject.subject_teachers?.map((teacher) => `${teacher.full_name}, `)}
        </Text>
        <Text>Subject teachers</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 170,
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    borderRadius: 10,
    marginTop: 20,
  },
  subject: {
    height: 110,
    backgroundColor: lightTheme.colors.PrimaryFade,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  tags: {
    flexDirection: "row",
    marginTop: 10,
  },
  tag: {
    minWidth: 40,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,

    borderRadius: 30,
  },
  names: {
    padding: 10,
  },
});
