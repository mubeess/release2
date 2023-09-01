import Icon from "@safsims/components/Icon/Icon";
import { TickIcon } from "@safsims/components/Images";
import Text from "@safsims/components/Text/Text";
import {
  SkillRatingDefinitionDto,
  StudentSkillAssessmentDto,
} from "@safsims/generated";
import { lightTheme } from "@safsims/utils/Theme";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
interface IProps {
  assessment: StudentSkillAssessmentDto;
  ratings: SkillRatingDefinitionDto[] | [];
}
export default function SkillCard({ assessment, ratings }: IProps) {
  const [current, setCurrent] = useState(
    assessment.skill_rating_definition?.rating
  );
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={{ fontWeight: "500" }} h2>
          {assessment.skill?.skill_name}
        </Text>
      </View>

      <View style={styles.content}>
        {ratings.map((rating: SkillRatingDefinitionDto, ind) => (
          <TouchableOpacity
            onPress={() => {
              setCurrent(rating.rating);
              assessment.skill_rating_definition = rating;
            }}
            style={[
              styles.skillButton,
              {
                backgroundColor:
                  current == rating.rating
                    ? lightTheme.colors.PrimaryColor
                    : lightTheme.colors.PrimaryFade,
                borderWidth: current == rating.rating ? 0 : 1,
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
                    current == rating.rating
                      ? "#fff"
                      : lightTheme.colors.PrimaryFade,
                },
              ]}
            >
              <Text
                style={{
                  color:
                    current == rating.rating
                      ? lightTheme.colors.PrimaryColor
                      : "#000",
                  fontWeight: "500",
                }}
                h2
              >
                {rating.rating}
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
    height: 230,
    width: "100%",
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 20,
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
    padding: 20,
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
});
