import Text from "@safsims/components/Text/Text";
import { ClassInformationDto, SubjectDto } from "@safsims/generated";
import { lightTheme } from "@safsims/utils/Theme";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function SubjectCard({ subject }: { subject: SubjectDto }) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.head}>
        <Text>{subject.subject_name}</Text>
      </View>

      <View style={styles.teachersContainer}>
        <Text
          style={{
            marginTop: "auto",
          }}
        >
          Classess
        </Text>
        <View style={styles.classes}>
          {subject.class_levels?.map((level) => (
            <View key={level.class_level_id} style={styles.class}>
              <Text>{level.name}</Text>
              <View style={styles.deco} />
            </View>
          ))}

          {/* <View style={styles.class}>
            <Text>Primary Two</Text>
            <View style={styles.deco} />
          </View>

          <View style={styles.class}>
            <Text>Pri One</Text>
            <View style={styles.deco} />
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 140,
    width: "100%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    borderRadius: 5,
    marginTop: 10,
  },
  head: {
    height: 50,
    width: "100%",
    backgroundColor: lightTheme.colors.PrimaryFade,
    padding: 10,
    paddingHorizontal: 20,
    borderTopEndRadius: 5,
    borderTopLeftRadius: 5,
    justifyContent: "center",
  },
  textHeader: {
    color: lightTheme.colors.PrimaryColor,
    fontWeight: "500",
  },
  textTitle: {
    color: lightTheme.colors.PrimaryGrey,
  },
  teachersContainer: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  teacher: {
    flexDirection: "row",
    width: "45%",
    height: "100%",
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  image: {
    height: 25,
    width: 25,
    borderRadius: 25,
  },
  imageContainer: {
    height: 25,
    width: 25,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
  },
  classes: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 20,
  },
  class: {
    height: 30,
    backgroundColor: lightTheme.colors.PrimaryBackground,
    paddingHorizontal: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
  },
  deco: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: lightTheme.colors.PrimaryGreen,
    marginLeft: 5,
  },
});
