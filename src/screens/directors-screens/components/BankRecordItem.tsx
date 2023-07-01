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
import { BankAccountDto } from "@safsims/generated";

const data = [
  -70, -50, 60, 70, 50, 10, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50,
  -20, -80, 30,
];

const { height } = Dimensions.get("window");

export default function BankRecordItem({
  isEven = false,
  level = "",
  bank = "",
  data,
}: {
  isEven?: boolean;
  level: string;
  bank?: string;
  data: BankAccountDto;
}) {
  const heightValue = useSharedValue(0);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: heightValue.value,
    };
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
    <Animated.View
      style={[
        styles.accordionContainer,
        { backgroundColor: isEven ? lightTheme.colors.PrimaryFade : "#fff" },
      ]}
    >
      <View style={[styles.head]}>
        <View style={styles.avatar}>
          <View style={styles.name}>
            <Text h3>{level}</Text>
          </View>
        </View>
        <View style={styles.levelStatus}>
          <Text style={{ fontSize: 12, textAlign: "left" }}>{bank}</Text>
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
      </View>

      <Animated.View style={[reanimatedStyle]}>
        <View
          style={[
            styles.children,
            {
              backgroundColor: isEven ? lightTheme.colors.PrimaryFade : "#fff",
            },
          ]}
        >
          <View style={styles.list}>
            <Text>Email:</Text>
            <Text>{data.email}</Text>
          </View>

          <View style={styles.list}>
            <Text>Account Number:</Text>
            <Text>{data.account_number}</Text>
          </View>

          <View style={styles.list}>
            <Text>Phone Number</Text>
            <Text>{data.phone_number}</Text>
          </View>
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
    borderRadius: 5,
    padding: 10,
    height: "auto",
    marginTop: 20,
  },
  head: {
    height: 50,
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
    minHeight: 150,
    paddingHorizontal: 20,
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
  image: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  avatar: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    marginLeft: 10,
  },
  list: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 20,
  },
  status: {
    width: 70,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#CAF5E6",
    justifyContent: "center",
    alignItems: "center",
  },
  levelStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: lightTheme.colors.PrimaryBorderColor,
    marginVertical: 20,
  },
});
