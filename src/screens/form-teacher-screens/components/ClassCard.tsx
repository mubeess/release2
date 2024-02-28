import Text from "@safsims/components/Text/Text";
import { ClassInformationDto } from "@safsims/generated";
import { lightTheme } from "@safsims/utils/Theme";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
interface ClassProps {
  onPress?: () => void;
  data: ClassInformationDto;
}
export default function ClassCard({ onPress, data }: ClassProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.head}>
        <Text h2 style={styles.textHeader}>
          {data.class_level?.name} {data.arm?.name}
        </Text>
        <Text style={styles.textTitle}>{data.class_level?.short_name}</Text>
      </View>

      <View style={styles.teachersContainer}>
        <View style={styles.teacher}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: data.main_form_teacher?.profile_url,
              }}
            />
          </View>
          <View>
            <Text
              h3
              style={{
                fontSize: 10,
              }}
            >
              {data.main_form_teacher?.full_name}
            </Text>
            <Text
              style={{
                fontSize: 9,
                color: lightTheme.colors.PrimaryGrey,
              }}
            >
              Form Teacher
            </Text>
          </View>
        </View>

        {data.assistant_form_teacher && (
          <View style={styles.teacher}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: data.assistant_form_teacher?.profile_url,
                }}
              />
            </View>
            <View>
              <Text
                h3
                style={{
                  fontSize: 10,
                  marginRight: 10,
                }}
              >
                {data.assistant_form_teacher?.full_name}
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  color: lightTheme.colors.PrimaryGrey,
                }}
              >
                Assistant Form Teacher
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: "100%",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    borderRadius: 5,
  },
  head: {
    height: 74,
    width: "100%",
    backgroundColor: lightTheme.colors.PrimaryFade,
    padding: 10,
    paddingHorizontal: 20,
    borderTopEndRadius: 5,
    borderTopLeftRadius: 5,
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
    flexDirection: "row",
    justifyContent: "space-between",
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
});
