import { View, StyleSheet } from "react-native";
import React, { ReactElement } from "react";
import { PercentageRiseIcon } from "../../../components/Images";
import Text from "../../../components/Text/Text";
import Currency from "@safsims/components/Currency/Currency";
interface MenuItemProps {
  percentage?: string;
  amount: string;
  Icon: ReactElement;
  color?: string;
  label: string;
}
export default function MenuItem({
  percentage = "",
  Icon,
  amount,
  color = "red",
  label,
}: MenuItemProps) {
  return (
    <View style={styles.menuContainer}>
      <View style={styles.icon}>
        {Icon}
        <View style={styles.values}>
          <Currency
            style={{
              color,
              fontWeight: "bold",
              fontSize: 16,
            }}
            amount={amount}
          />

          <Text style={{ color: "#9D9DB7" }}>{label}</Text>
        </View>
      </View>

      {percentage && (
        <View style={styles.percentage}>
          <PercentageRiseIcon />
          <Text style={styles.percentageText}>{percentage}%</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  icon: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  percentage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 60,
  },
  percentageText: {
    marginLeft: 15,
  },
  values: {
    width: "90%",
    marginLeft: 20,
  },
});
