import React, { useEffect, useState } from "react";
import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts";
import { View } from "react-native";

import { RevenueSummaryDto } from "@safsims/generated";

const DirectorsLineChart = ({
  data = undefined,
  loading = false,
}: {
  data: RevenueSummaryDto;
  loading: boolean;
}) => {
  const [month, setMonth] = useState<any[]>([]);
  const [numberOfPayments, setNumberOfPayments] = useState<any[]>([]);

  const axesSvg = { fontSize: 10, fill: "grey" };
  const verticalContentInset = { top: 10, bottom: 10 };
  const xAxisHeight = 30;
  useEffect(() => {
    const monthly: any[] = [];
    const numbers: any[] = [];
    if (data !== undefined) {
      data.monthly_payment_distribution?.map((item) => {
        monthly.push(item.month);
        numbers.push(item.no_of_payments);
      });
    }
    setMonth(monthly);
    setNumberOfPayments(numbers);
  }, [data]);
  return (
    <View
      style={{
        height: 300,
        padding: 20,
        flexDirection: "row",
        width: "100%",
      }}
    >
      {data !== undefined && (
        <>
          <YAxis
            data={numberOfPayments}
            style={{ marginBottom: xAxisHeight }}
            contentInset={verticalContentInset}
            svg={axesSvg}
            formatLabel={(value, index) => `${value}`}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <LineChart
              style={{ flex: 1 }}
              data={numberOfPayments}
              contentInset={verticalContentInset}
              svg={{ stroke: "rgb(134, 65, 244)" }}
            >
              <Grid />
            </LineChart>
            <XAxis
              style={{ marginHorizontal: -10, height: xAxisHeight }}
              data={numberOfPayments}
              formatLabel={(value, index) => month[index]}
              contentInset={{ left: 10, right: 10 }}
              svg={axesSvg}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default DirectorsLineChart;
