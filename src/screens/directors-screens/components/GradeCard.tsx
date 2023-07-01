import { View, StyleSheet, Modal, Dimensions, ScrollView } from "react-native";
import React, { useState } from "react";
import { lightTheme } from "../../../utils/Theme";
import Text from "../../../components/Text/Text";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import Button from "../../../components/Button/Button";
import Icon from "../../../components/Icon/Icon";
import { PlainArrowRight } from "../../../components/Images";

import { TouchableOpacity } from "react-native";
import ConfigurationList from "./List/ConfigurationList";
import useSkillGroupSettingsTrack from "../hooks/useSkillsGroupSettingsTrack";
import { ClassLevelDto } from "@safsims/generated";
import useDisclosure from "@safsims/utils/useDisclosure/useDisclosure";
import useGradeSettingsTrack from "../hooks/useGradeSettingsTrack";
interface IProps {
  termId: string;
  activeLevels: ClassLevelDto[];
}
export default function GradeCard({ termId, activeLevels }: IProps) {
  const {
    loading,
    levelsUsingGrading,
    levelsConfigured,
    isComplete,
    percentageConfigured,
    levelConfigurations,
  } = useGradeSettingsTrack({
    termId,
    levels: activeLevels,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text h2>Grading Configured</Text>
        <Text style={{ color: lightTheme.colors.PrimaryGrey }}>
          Physical skilled created and assessed by the school
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.head}>
        <Text
          style={{ color: lightTheme.colors.PrimaryGrey, marginBottom: 20 }}
        >
          {levelsConfigured?.length} / {levelsUsingGrading?.length}
        </Text>
        <ProgressBar color="#000" value={percentageConfigured} />

        <View style={styles.config}>
          <View style={styles.configLabel}>
            <View style={styles.configDeco} />
            <Text>Configured</Text>
          </View>

          <View style={styles.configLabel}>
            <View
              style={{
                ...styles.configDeco,
                backgroundColor: lightTheme.colors.PrimaryBorderColor,
              }}
            />
            <Text>Not Configured</Text>
          </View>
        </View>

        <Button
          onPress={() => {
            onOpen();
          }}
          style={styles.button}
          IconRight={<PlainArrowRight />}
          label="View List"
        />
      </View>

      <Modal
        statusBarTranslucent
        visible={isOpen}
        animationType="slide"
        transparent
      >
        <View style={styles.parentModal}>
          <View style={styles.mainDetail}>
            <TouchableOpacity
              onPress={() => {
                onClose();
              }}
              style={styles.icon}
            >
              <Icon name="close-square" size={24} />
            </TouchableOpacity>

            <Text h2>Skill Group Configuration Status</Text>
            <Text
              style={{
                color: lightTheme.colors.PrimaryGrey,
                marginVertical: 20,
              }}
            >
              Below are the list of class levels and their configuration status
            </Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              style={{ flex: 1 }}
            >
              {levelConfigurations.map((level) => (
                <ConfigurationList
                  key={level.id}
                  label={level.short_name || ""}
                  arm={level.name || ""}
                  configured={level.hasSetting}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 320,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    paddingVertical: 20,
    marginBottom: 20,
  },
  head: {
    paddingHorizontal: 20,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: lightTheme.colors.PrimaryBorderColor,
    marginVertical: 10,
  },
  config: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  configLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  configDeco: {
    height: 9,
    width: 9,
    backgroundColor: "#000",
    marginRight: 10,
    borderRadius: 9,
  },
  button: {
    width: 127,
    marginLeft: 0,
    marginTop: 30,
    backgroundColor: "#000",
  },
  parentModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "relative",
  },
  mainDetail: {
    height: Dimensions.get("window").height / 1.5,
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
  },
  icon: {
    marginLeft: "auto",
  },
});
