import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Text from "@safsims/components/Text/Text";
import { lightTheme } from "@safsims/utils/Theme";
import Select from "@safsims/components/Select/Select";
import Button from "@safsims/components/Button/Button";
import useGetClassessInformationGet from "../../hooks/useGetClassessInformationGet";

export default function StudentFilter() {
  const { classess, loadingClassess } = useGetClassessInformationGet();
  const [allClasses, setAllClasses] = useState([]);

  useEffect(() => {
    const allClass = [];
    if (classess.length > 0) {
      classess.map((indClass) => {
        allClass.push({
          label: indClass.class_level?.name,
          value: indClass.class_level?.name,
        });
      });
    }
  }, [loadingClassess]);
  return (
    <View style={styles.container}>
      <Text style={{ textTransform: "uppercase", marginLeft: 20 }}>
        Filter: Class
      </Text>
      <View style={styles.divider} />
      <View style={{ paddingHorizontal: 20 }}>
        <Select placeholder="Select Class" options={allClasses} label="Class" />
        <Button style={{ marginTop: 30 }} label="Apply Filter" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: lightTheme.colors.PrimaryBorderColor,
    marginVertical: 10,
  },
});
