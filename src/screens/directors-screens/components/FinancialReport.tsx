import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Text from "../../../components/Text/Text";
import { lightTheme } from "../../../utils/Theme";
import Icon from "../../../components/Icon/Icon";
import MenuItem from "./MenuItem";

import {
  ExpectedRevenueIcon,
  GeneratedRevenueIcon,
  OutstandingRevenueIcon,
} from "../../../components/Images";

import DirectorsLineChart from "./Charts/DirectorsLineChart";
import DirectorsStackedBarChart from "./Charts/DirectorsStackedBarChart";
import Button from "../../../components/Button/Button";

import useGetFinancialSummaryDetailsGet from "../hooks/useGetFinancialSummaryDetailsGet";

import useGroupTermsBySessions from "@safsims/general-hooks/useGroupTermsBySessions";
import Loader from "@safsims/components/Loader/Loader";
import useCurrentTermGet from "@safsims/general-hooks/useCurrentTermGet";

const { height } = Dimensions.get("window");
export default function FinancialReport() {
  const { currentTerm } = useCurrentTermGet();
  const { selectedTerm } = useGroupTermsBySessions({
    urlTermId: currentTerm?.term_id,
  });

  const heightValue = useSharedValue(0);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: heightValue.value,
    };
  });

  const { loadingSummary, summary, refetchSummary } =
    useGetFinancialSummaryDetailsGet({
      termId: selectedTerm?.value?.term_id,
    });
  const reanimatedIconStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      heightValue.value,
      [0, height + height],
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
          <Text h2>Financial Reports</Text>
        </View>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            heightValue.value == 0
              ? (heightValue.value = withTiming(height + height, {
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
        Total revenue(expected, generated and outstanding) and payment breakdown
        by month and class levels
      </Text>
      <Animated.View style={[reanimatedStyle]}>
        {loadingSummary && (
          <View style={styles.loading}>
            <Loader />
          </View>
        )}

        {!loadingSummary && (
          <View style={styles.children}>
            <MenuItem
              Icon={<ExpectedRevenueIcon />}
              amount={`${summary?.total_expected_revenue}`}
              label="Expected Revenue"
              color={lightTheme.colors.PrimaryColor}
            />
            <MenuItem
              Icon={<GeneratedRevenueIcon />}
              amount={`${summary?.total_generated_revenue}`}
              label="Generated  Revenue"
              color={lightTheme.colors.PrimaryRed}
              percentage={`${summary?.generated_revenue_percentage}`}
            />
            <MenuItem
              Icon={<OutstandingRevenueIcon />}
              amount={`${summary?.total_outstanding}`}
              label="Outstanding  Revenue"
              color={lightTheme.colors.PrimaryGreen}
              percentage={`${summary?.outstanding_percentage}`}
            />
            <View style={styles.label}>
              <Text>Breakdown by </Text>
              <Text h3>Month</Text>
              <TouchableOpacity style={{ marginLeft: "auto" }}>
                <Icon
                  name="arrow-down-1"
                  size={20}
                  color={lightTheme.colors.PrimaryFontColor}
                />
              </TouchableOpacity>
            </View>
            <DirectorsLineChart loading={loadingSummary} data={summary} />

            <Text h2>Total Payment Report</Text>
            <Text style={{ color: lightTheme.colors.PrimaryGrey }}>
              Payment status according to class levels
            </Text>
            <DirectorsStackedBarChart data={summary} />

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
        )}
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
  },
  loading: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
