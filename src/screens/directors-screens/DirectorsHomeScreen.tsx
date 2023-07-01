import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import AppHeader from "../../components/Header/AppHeader";
import Button from "../../components/Button/Button";
import { lightTheme } from "../../utils/Theme";
import DashboardTab from "./tabs/DashboardTab";
import ConfigurationsTab from "./tabs/ConfigurationsTab";

export default function DirectorsHomeScreen({ navigation }) {
  const [activeTab, setAciveTab] = useState(0);
  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />
      <View style={styles.mainScreens}>
        <View style={styles.buttons}>
          <Button
            onPress={() => setAciveTab(0)}
            fontStyle={{
              color:
                activeTab == 0 ? lightTheme.colors.PrimaryColor : "#3F8CF7",
            }}
            style={{
              ...styles.button,
              backgroundColor:
                activeTab == 0 ? lightTheme.colors.PrimaryFadedBlue : "#fff",
            }}
            label="Dashboard"
          />
          <Button
            onPress={() => setAciveTab(1)}
            fontStyle={{
              color:
                activeTab == 1 ? lightTheme.colors.PrimaryColor : "#3F8CF7",
            }}
            style={{
              ...styles.button,
              backgroundColor:
                activeTab == 1 ? lightTheme.colors.PrimaryFadedBlue : "#fff",
            }}
            label="Configuration"
          />
        </View>

        <ScrollView style={styles.mainTabs}>
          {activeTab == 0 && <DashboardTab />}
          {activeTab == 1 && <ConfigurationsTab />}
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainScreens: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  button: {
    width: 100,
    marginRight: 20,
    marginLeft: 0,
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryFadedBlue,
    elevation: 0,
  },
  mainTabs: {
    flex: 1,
    marginTop: 20,
  },
});
