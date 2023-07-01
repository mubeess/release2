import { View } from "react-native";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

import { lightTheme } from "../../../utils/Theme";
import Text from "../../../components/Text/Text";
import Icon from "../../../components/Icon/Icon";
import ConfigurationMenu from "../components/ConfigurationMenu";
import ConfigurationDetail from "../components/ConfigurationDetail";
import BankRecordItem from "../components/BankRecordItem";
import useGroupTermsBySessions from "@safsims/general-hooks/useGroupTermsBySessions";
import { useSelector } from "react-redux";
import { TermDto } from "@safsims/generated";
import useClassLevelsWithArmsFetch from "@safsims/general-hooks/useClassLevelsWithArmsFetch";
import GradeCard from "../components/GradeCard";
import FeesCard from "../components/FeesCard";
import AssessmentCard from "../components/AssessmentCard";
import BankCard from "../components/BankCard";
import SkeletonLoader from "@safsims/components/SkeletonLoader/SkeletonLoader";
import useCurrentTermGet from "@safsims/general-hooks/useCurrentTermGet";

export default function ConfigurationsTab() {
  const { currentTerm: current } = useCurrentTermGet();
  const { selectedTerm } = useGroupTermsBySessions({
    urlTermId: current?.term_id,
  });

  const currentTerm = selectedTerm?.value;

  const { classLevelsWithArms, loadingClassLevels } =
    useClassLevelsWithArmsFetch({
      termId: currentTerm?.term_id || "",
    });

  const activeLevels = classLevelsWithArms?.filter(
    (level) => (level.arms || []).length > 0
  );
  const activeArms = classLevelsWithArms?.reduce<string[]>((t, a) => {
    a.arms?.forEach((arm) => {
      if (!t.includes(arm.id!)) t.push(arm.id!);
    });
    return t;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.sessionCard}>
        <Text>Session</Text>
        <Text style={styles.description}>
          The current ongoing session has been set and is active
        </Text>
        <View style={styles.calender}>
          <Icon name="calendar" size={20} />
          <Text
            style={{
              marginLeft: 20,
            }}
          >
            {currentTerm?.school_term_definition?.name} /{" "}
            {currentTerm?.session?.name}{" "}
          </Text>
        </View>
      </View>

      <ConfigurationMenu
        label="Class Level"
        description="Total count of active class levels"
        number={activeLevels?.length}
      />
      <ConfigurationMenu
        label="Class Arms"
        description="Total count of active class levels"
        number={activeArms?.length || 0}
      />
      <View style={styles.divider} />
      {!loadingClassLevels && (
        <FeesCard
          termId={currentTerm?.term_id || ""}
          activeLevels={activeLevels}
        />
      )}
      {loadingClassLevels && <SkeletonLoader isLoading />}
      {!loadingClassLevels && (
        <ConfigurationDetail
          termId={currentTerm?.term_id || ""}
          activeLevels={activeLevels}
        />
      )}
      {!loadingClassLevels && (
        <GradeCard
          termId={currentTerm?.term_id || ""}
          activeLevels={activeLevels}
        />
      )}
      {!loadingClassLevels && (
        <AssessmentCard
          termId={currentTerm?.term_id || ""}
          activeLevels={activeLevels}
        />
      )}
      {!loadingClassLevels && (
        <BankCard
          termId={currentTerm?.term_id || ""}
          activeLevels={activeLevels}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sessionCard: {
    width: "100%",
    height: 150,
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    borderRadius: 10,
    padding: 20,
  },
  description: {
    color: lightTheme.colors.PrimaryGrey,
    fontSize: 13,
    marginTop: 20,
  },
  calender: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: lightTheme.colors.PrimaryBorderColor,
    marginVertical: 20,
  },
  banks: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    borderRadius: 10,
    paddingVertical: 20,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
