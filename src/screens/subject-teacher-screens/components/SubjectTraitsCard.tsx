import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { lightTheme } from "@safsims/utils/Theme";
import Text from "@safsims/components/Text/Text";
import {
  SkillRatingDefinitionDto,
  StudentTraitAssessmentDto,
  SubjectTraitLiteDto,
} from "@safsims/generated";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TickIcon } from "@safsims/components/Images";

export default function SubjectTraitsCard({
  trait,
  definition,
  onChange,
}: {
  trait: SubjectTraitLiteDto;
  definition: SkillRatingDefinitionDto[];
  onChange: (data) => void;
}) {
  const [current, setCurrent] = useState(trait.subject_trait_group_id);
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={{ fontWeight: "500", fontSize: 12 }} h2>
          {trait.title}
        </Text>
      </View>

      <View style={styles.content}>
        {definition.map((rating, ind) => (
          <TouchableOpacity
            onPress={() => {
              onChange(rating);
              console.log(rating);
              setCurrent(rating.rating);
            }}
            style={[
              styles.skillButton,
              {
                backgroundColor:
                  current == rating.rating
                    ? lightTheme.colors.PrimaryColor
                    : lightTheme.colors.PrimaryFade,
                borderWidth: current == rating ? 0 : 1,
              },
            ]}
            key={rating.rating}
          >
            <TickIcon
              color={
                current == rating.rating
                  ? "#fff"
                  : lightTheme.colors.PrimaryGrey
              }
            />
            <View
              style={[
                styles.text,
                {
                  backgroundColor:
                    current == "#fff"
                      ? rating.color
                      : lightTheme.colors.PrimaryFade,
                },
              ]}
            >
              <Text
                style={{
                  color:
                    current == rating ? lightTheme.colors.PrimaryColor : "#000",
                  fontWeight: "500",
                  fontSize: 10,
                }}
                h2
              >
                {rating.remark}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    minHeight: 230,
    width: "100%",
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 20,
  },
  head: {
    minHeight: 48,
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
    padding: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  skillButton: {
    width: 104,
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
    width: "70%",
    height: "90%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
