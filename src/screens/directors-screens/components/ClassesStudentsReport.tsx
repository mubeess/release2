import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import Text from "../../../components/Text/Text";
import { lightTheme } from "../../../utils/Theme";
import Icon from "../../../components/Icon/Icon";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EmptyFilter,
} from "../../../components/Images";

import Button from "../../../components/Button/Button";
import StatCard from "./StatCard";

import LevelList from "./List/LevelList";
import useGroupTermsBySessions from "@safsims/general-hooks/useGroupTermsBySessions";
import useGetClassReportGet from "../hooks/useGetClassReportGet";
import useGetArmGet from "../hooks/useGetArmsGet";
import useGetStudentStatsGet from "../hooks/useGetStudentStatsGet";
import useGetAllClassLevelGet from "../hooks/useGetAllClassLevelGet";
import { ClassLevelDto } from "@safsims/generated";
import { useEffect } from "react";
import EmptyState from "@safsims/components/EmptyState/EmptyState";
const data = [
  -70, -50, 60, 70, 50, 10, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50,
  -20, -80, 30,
];

const { height } = Dimensions.get("window");
export default function ClassesStudentsReport() {
  const { selectedTerm } = useGroupTermsBySessions({});

  const { classLevelSummary, loadingClassLevelSummary } = useGetClassReportGet({
    termId: selectedTerm?.value?.term_id,
  });
  const { arms, loadingArms } = useGetArmGet();
  const { loadingStudents, studenStat } = useGetStudentStatsGet();
  const { classLevels, loadingClassLevels, page, lastPage, setPage } =
    useGetAllClassLevelGet();
  const heightValue = useSharedValue(0);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: heightValue.value,
    };
  });

  const reanimatedIconStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      heightValue.value,
      [0, height + height+height],
      [0, 180]
    );
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  return (
    <Animated.View style={[styles.accordionContainer]}>
      <View style={[styles.head]}>
        <View style={{ width: "80%" }}>
          <Text h2>Classes and Students Report</Text>
        </View>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            heightValue.value == 0
              ? (heightValue.value = withTiming(height + height+height, {
                  duration: 500,
                }))
              : (heightValue.value = withTiming(0, { duration: 500 }));
          }}
        >
          <Animated.View style={[styles.icon, reanimatedIconStyle]}>
            <Icon
              name="arrow-down-1"
              size={20}
              color={lightTheme.colors.PrimaryFontColor}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>
        Total class levels (active and inactive students) total student (male
        and female, active and inactive students)
      </Text>
      <Animated.View style={[reanimatedStyle]}>
        <View style={styles.children}>
          <View style={styles.divider} />
          <Text h1>{classLevelSummary?.length}</Text>
          <Text>No. of Classes</Text>
          <View style={styles.statContainer}>
            <StatCard
              number={30}
              color={lightTheme.colors.PrimaryGreen}
              label="No. of class levels"
            />

            <StatCard
              number={arms?.length || 0}
              color={lightTheme.colors.PrimaryOrange}
              label="No. of Arms"
            />
          </View>
          <Text h1>{studenStat?.total}</Text>
          <Text>No Of Students</Text>
          <View style={styles.statContainer}>
            <StatCard
              number={studenStat?.total_males || 0}
              label="No. of Male Students"
            />
            <StatCard
              number={studenStat?.total_inactive || 0}
              color={lightTheme.colors.PrimaryColor}
              label="No of Inactive Students"
            />

            <StatCard
              number={studenStat?.total_females || 0}
              color={lightTheme.colors.PrimaryOrange}
              label="No. of Female Students"
            />
          </View>

          <View style={styles.divider} />
          {classLevels.map((classLevel: ClassLevelDto, index) => (
            <LevelList
              data={classLevel}
              key={classLevel.id}
              index={1}
              level={classLevel.name || ""}
              isEven={(index + 1) % 2 == 0}
            />
          ))}
          {classLevels.length === 0 && (
            <View
              style={{
                width: "100%",
                height: 200,
              }}
            >
              <EmptyState
                Image={<EmptyFilter />}
                title="Nothing to see here"
                info="No available class levels"
              />
            </View>
          )}
          <View style={styles.buttons}>
            <Button
              onPress={() => {
                if (page == 1) {
                  return;
                }
                setPage(page - 1);
              }}
              style={{
                ...styles.button,
                backgroundColor: "transparent",
                elevation: 0,
                borderWidth: 1,
                borderColor: lightTheme.colors.PrimaryBorderColor,
              }}
              label=""
              IconLeft={<ArrowLeftIcon />}
            />
            <Button style={styles.button} label={`${page ? page : 0}`} />
            <Button
              onPress={() => {
                if (lastPage) {
                  return;
                }
                setPage(page + 1);
              }}
              IconLeft={<ArrowRightIcon />}
              style={{
                ...styles.button,
                backgroundColor: "transparent",
                elevation: 0,
                borderWidth: 1,
                borderColor: lightTheme.colors.PrimaryBorderColor,
              }}
              label=""
            />
          </View>
          <Button
            onPress={() => {
              heightValue.value = withTiming(0, { duration: 10 });
            }}
            fontStyle={{
              color: "#000",
            }}
            style={styles.collapse}
            label="Collapse"
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  accordionContainer: {
    backgroundColor: lightTheme.colors.PrimaryWhite,
    width: "100%",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    height: "auto",
    paddingBottom: 20,
  },
  head: {
    height: 60,
    borderBottomColor: lightTheme.colors.PrimaryBorderColor,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  children: {
    backgroundColor: "#ffffff",
    marginTop: 20,
    minHeight: 200,
  },

  description: {
    textAlign: "justify",
    color: lightTheme.colors.PrimaryGrey,
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    borderColor: lightTheme.colors.PrimaryBorderColor,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  chart: {
    height: 200,
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  collapse: {
    backgroundColor: "transparent",
    elevation: 0,
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    width: "40%",
    marginLeft: 0,
    marginTop: 20,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: lightTheme.colors.PrimaryBorderColor,
    marginVertical: 20,
  },
  statContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  search: {
    borderRadius: 10,
  },
  buttons: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
  },
  button: {
    width: 40,
  },
});
