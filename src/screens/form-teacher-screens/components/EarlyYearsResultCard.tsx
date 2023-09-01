import { View, StyleSheet } from "react-native";
import React from "react";
import { lightTheme } from "@safsims/utils/Theme";
import Text from "@safsims/components/Text/Text";
import { StudentTraitAssessmentDto } from "@safsims/generated";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function EarlyYearsResultCard({
  trait,
}: {
  trait: StudentTraitAssessmentDto;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text h2>{trait.trait_definition?.trait?.trait_name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log(trait);
        }}
      ></TouchableOpacity>
      <View style={styles.body}>
        <View style={styles.traitContainer}>
          <View style={styles.trait}>
            <Text style={{ textTransform: "uppercase", marginRight: 10 }}>
              {trait.trait_definition?.definition}
            </Text>
            <Text h3>{trait.trait_definition?.td_order}</Text>
          </View>
        </View>

        <Text style={{ marginTop: 20 }}>Comments</Text>
        <Text h3>{trait.group_comments}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    minHeight: 280,
    width: "100%",
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    borderRadius: 5,
    marginTop: 20,
  },
  head: {
    width: "100%",
    height: 50,
    backgroundColor: lightTheme.colors.PrimaryBackground,
    justifyContent: "center",
    paddingHorizontal: 20,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  body: {
    padding: 20,
    flex: 1,
  },
  traitContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-between",
  },
  trait: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: 70,
    backgroundColor: lightTheme.colors.PrimaryFade,
    minHeight: 30,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
});
