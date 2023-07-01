import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import { lightTheme } from "../../../../utils/Theme";

import { StyleSheet } from "react-native";
import { RevenueSummaryDto } from "@safsims/generated";
const axesSvg = { fontSize: 10, fill: "grey" };
const verticalContentInset = { top: 10, bottom: 10 };
const xAxisHeight = 30;
export default function DirectorsStackedBarChart({
  data = undefined,
}: {
  data: RevenueSummaryDto;
  loading: boolean;
}) {
  const [month, setMonth] = useState<any[]>([]);
  const [numberOfPayed, setNumberOfPayed] = useState<any[]>([]);
  const [numberOfUnpayed, setNumberOfUnpayed] = useState<any[]>([]);
  useEffect(() => {
    const grades: any[] = [];
    const payed: any[] = [];
    const unpayed: any[] = [];
    if (data !== undefined) {
      data.level_payment_distribution?.map((item) => {
        grades.push(item.class_level?.short_name);
        payed.push(item.paid);
        unpayed.push(item.outstanding);
      });
    }
    setMonth(grades);
    setNumberOfPayed(payed);
    setNumberOfUnpayed(unpayed);
  }, [data]);
  return (
    <View>
      <View style={styles.label}>
        <TouchableOpacity
          onPress={() => {
            console.log(numberOfPayed);
          }}
        >
          <Text>sips</Text>
        </TouchableOpacity>
        <Text>Grade class</Text>
        <View style={styles.mainLabel}>
          <Text>Paid</Text>
          <View style={styles.color} />
        </View>

        <View style={styles.mainLabel}>
          <Text>Outstanding</Text>
          <View
            style={{
              ...styles.color,
              backgroundColor: lightTheme.colors.PrimaryRed,
            }}
          />
        </View>
      </View>
      {data !== undefined && (
        <View
          style={{
            height: 500,
            padding: 20,
            flexDirection: "row",
            width: "100%",
          }}
        >
          <YAxis
            data={numberOfPayed}
            style={{ marginBottom: xAxisHeight }}
            contentInset={verticalContentInset}
            svg={axesSvg}
            formatLabel={(value, index) => {
              return `${month[index]}`;
            }}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <BarChart
              style={{ height: 450 }}
              data={[
                {
                  data: numberOfPayed,
                  svg: { fill: lightTheme.colors.PrimaryColor },
                },
                {
                  data: numberOfUnpayed,
                  svg: { fill: "red", marginBottom: 20 },
                },
                {
                  data: [10, 10, 10, 10, 10, 10].reverse(),
                  svg: { fill: "#fff" },
                },
              ]}
              horizontal={true}
              contentInset={{ top: 10, bottom: 10 }}
              spacing={1}
              gridMin={0}
            >
              <Grid direction={Grid.Direction.VERTICAL} />
            </BarChart>
            <XAxis
              style={{ height: xAxisHeight, width: "90%" }}
              data={[1000, 10000, 100000]}
              formatLabel={(value, index) => `N${10000 * index}`}
              contentInset={{ left: 10, right: 10 }}
              svg={axesSvg}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  mainLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  color: {
    height: 10,
    width: 10,
    borderRadius: 2,
    backgroundColor: lightTheme.colors.PrimaryColor,
    marginLeft: 5,
  },
});
