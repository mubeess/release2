import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { lightTheme } from "@safsims/utils/Theme";
import {
  ClassListIcon,
  FormTeacherIcon,
  FormTeacherStudenIcon,
  ResultIcon,
  SkillsIcon,
} from "@safsims/components/Images";
import Icon from "@safsims/components/Icon/Icon";
import Text from "@safsims/components/Text/Text";
const FIRST_ROW = [
  { lable: "Result", Icon: <ResultIcon /> },
  { lable: "Skills", Icon: <SkillsIcon /> },

  { lable: "Form Teachers", Icon: <FormTeacherIcon /> },
];

export default function ClassProfileMenu({ handleClick, early_years }) {
  const SECOND_ROW = [
    // { lable: "Time Table", Icon: <Icon name="calendar" size={21} /> },
    { lable: "Subjects", Icon: <Icon name="book" size={21} /> },
    {
      lable: early_years ? "Early Years" : "",
      Icon: early_years ? <ClassListIcon /> : <></>,
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.decoration} />
      <View style={styles.menuList}>
        {FIRST_ROW.map((item) => (
          <TouchableOpacity
            onPress={() => {
              if (item.lable == "") {
                return;
              }
              handleClick(item.lable);
            }}
            key={item.lable}
            style={styles.menu}
          >
            {item.Icon}
            <Text>{item.lable}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.menuList}>
        {SECOND_ROW.map((item) => (
          <TouchableOpacity
            onPress={() => {
              if (item.lable == "") {
                return;
              }
              handleClick(item.lable);
            }}
            key={item.lable}
            style={styles.menu}
          >
            {item.Icon}
            <Text>{item.lable}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: 100,
    width: "100%",
  },
  decoration: {
    width: 50,
    height: 3,
    borderRadius: 5,
    backgroundColor: lightTheme.colors.PrimaryGrey,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    marginBottom: 10,
  },
  menuList: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  menu: {
    minWidth: "33.33%",
    justifyContent: "center",
    alignItems: "center",
  },
});
