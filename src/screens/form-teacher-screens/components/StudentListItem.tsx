import { useNavigation } from "@react-navigation/native";
import Text from "@safsims/components/Text/Text";
import { ClassMemberDto } from "@safsims/generated";
import { useAppSelector } from "@safsims/redux/hooks/useAppSelector";
import { lightTheme } from "@safsims/utils/Theme";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
interface IProps {
  route: string;
  student: ClassMemberDto;
  index?: number;
  early_years?: boolean;
  subjectId?: string;
}
export default function StudentListItem({
  route,
  student,
  index,
  early_years,
  subjectId,
}: IProps) {
  const navigate = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        if (route == "") {
          return;
        }

        navigate.navigate(route, {
          studentId: student.student_dto?.id,
          termId: student.class_information_dto?.term?.term_id,
          classLevelId: student.class_information_dto?.class_level?.id,
          armId: student.class_information_dto?.arm?.id,
          index,
          early_years,
          subjectId,
        });
      }}
      style={styles.container}
    >
      <View style={styles.date}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: student.student_dto?.profile_pic,
            }}
          />
        </View>
        <View>
          <Text h3>
            {student.student_dto?.first_name} {student.student_dto?.other_names}
          </Text>
          <Text style={{ color: lightTheme.colors.PrimaryGrey, marginTop: 5 }}>
            {student.student_dto?.student_id}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 65,
    width: "100%",
    borderBottomColor: lightTheme.colors.PrimaryBorderColor,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    marginTop: 20,
  },
  date: {
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
  },
  status: {
    width: 70,
    height: 26,
    backgroundColor: "#FBDEC8",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 32,
    width: 32,
    borderRadius: 35,
  },
  imageContainer: {
    height: 32,
    width: 32,
    borderRadius: 35,
    marginRight: 10,
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
  },
});
