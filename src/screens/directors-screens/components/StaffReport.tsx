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
import * as shape from "d3-shape";
import Text from "../../../components/Text/Text";
import { lightTheme } from "../../../utils/Theme";
import Icon from "../../../components/Icon/Icon";
import MenuItem from "./MenuItem";
import {
  LineChart,
  Grid,
  AreaChart,
  XAxis,
  YAxis,
} from "react-native-svg-charts";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExpectedRevenueIcon,
  GeneratedRevenueIcon,
  OutstandingRevenueIcon,
} from "../../../components/Images";
import { Circle, Path } from "react-native-svg";
import InteractiveAreaChart from "./Charts/DirectorsLineChart";
import DirectorsLineChart from "./Charts/DirectorsLineChart";
import DirectorsStackedBarChart from "./Charts/DirectorsStackedBarChart";
import Button from "../../../components/Button/Button";
import StatCard from "./StatCard";
import Input from "../../../components/Input/Input";
import StaffList from "./List/StaffList";
import useGetStaffReportGet from "../hooks/useGetStaffReportGet";
import { useEffect } from "react";
import InfiniteScrollView from "@safsims/components/InfiniteScrollView/InfiniteScrollView";
import useGetAllStaffGet from "../hooks/useGetAllStaffGet";
import { StaffDto } from "@safsims/generated";
import Loader from "@safsims/components/Loader/Loader";
const data = [
  -70, -50, 60, 70, 50, 10, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50,
  -20, -80, 30,
];

const { height } = Dimensions.get("window");
export default function StaffReport() {
  const { loadingStaffSummary, summary } = useGetStaffReportGet();
  const {
    loadingPageStaff,
    pageStaff,

    page,
    setPage,
    lastPage,
    setOffset,
    offset,
    setSearchText,
    searchText,
  } = useGetAllStaffGet();
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
        <View style={{ width: "70%" }}>
          <Text h2>Staff Report</Text>
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
        Total staff levels (active and inactive students) total staff(male and
        female, academic and non academic)
      </Text>
      <Animated.View style={[reanimatedStyle]}>
        <View style={styles.children}>
          <View style={styles.divider} />
          <Text h1>{summary?.total}</Text>
          <Text>No. Of Staff</Text>
          <View style={styles.statContainer}>
            <StatCard
              number={summary?.total_active || 0}
              color={lightTheme.colors.PrimaryGreen}
              label="No. of active staff"
            />

            <StatCard
              number={summary?.total_inactive || 0}
              color={lightTheme.colors.PrimaryOrange}
              label="No. of inactive staff"
            />
            <StatCard
              number={summary?.total_females || 0}
              label="No. of female staff"
            />

            <StatCard
              number={summary?.total_males || 0}
              label="No. of male staff"
            />
            <StatCard
              number={summary?.total_academic || 0}
              color={lightTheme.colors.PrimaryColor}
              label="Academic staff"
            />

            <StatCard
              number={summary?.total_non_academic || 0}
              color={lightTheme.colors.PrimaryOrange}
              label="Non academic staff"
            />
          </View>

          <View style={styles.divider} />
          <Input
            value={searchText}
            onChange={(text) => setSearchText(text)}
            placeholder="Search using staff name or status"
            style={styles.search}
          />

          {loadingPageStaff && (
            <View style={styles.loading}>
              <Loader />
            </View>
          )}
          {!loadingPageStaff && (
            <>
              {pageStaff.map((staff, index) => (
                <StaffList
                  data={staff}
                  key={staff.staff_id}
                  isEven={(index + 1) % 2 == 0}
                />
              ))}
            </>
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
            <Button style={styles.button} label={`${page}`} />
            <Button
              onPress={() => {
                if (lastPage) {
                  return;
                }
                setOffset((prev) => prev + 1);
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
  loading: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
