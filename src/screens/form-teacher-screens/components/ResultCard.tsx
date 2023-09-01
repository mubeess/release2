import Icon from "@safsims/components/Icon/Icon";
import Text from "@safsims/components/Text/Text";
import { SubjectResult } from "@safsims/generated";
import { lightTheme } from "@safsims/utils/Theme";
import {
  Dimensions,
  Image,
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

const { height } = Dimensions.get("window");
interface IProps {
  result: SubjectResult;
}
export default function ResultCard({ result }: IProps) {
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
      style={[styles.accordionContainer, { backgroundColor: "#fff" }]}
    >
      <View style={[styles.head]}>
        <View style={styles.avatar}>
          <Text h3>{result.subject_name}</Text>
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

      <Animated.View style={[{ overflow: "hidden" }, reanimatedStyle]}>
        <View style={[styles.children]}>
          {result.assessment_results?.map((assessment, ind) => (
            <View key={ind} style={styles.list}>
              <Text>{assessment.result?.assessment_name}</Text>
              <Text h3>{assessment.result?.average_score}</Text>
            </View>
          ))}
        </View>
      </Animated.View>

      <View style={styles.grade}>
        <View style={styles.gradeLabel}>
          <Text>Total</Text>
          <Text>Grade</Text>
        </View>

        <View style={styles.gradeLabel}>
          <Text h2>{result.result?.average_score}</Text>
          <Text h2>{result.result?.grade}</Text>
        </View>
      </View>

      <View style={styles.comments}>
        <Text style={{ color: lightTheme.colors.PrimaryFontColor }}>
          Comments
        </Text>
        <Text style={{ color: "#000" }}>{result.result?.comments}</Text>
      </View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  accordionContainer: {
    backgroundColor: lightTheme.colors.PrimaryWhite,
    width: "100%",
    borderRadius: 5,
    height: "auto",
    marginTop: 20,
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
    marginBottom: 20,
    overflow: "hidden",
  },
  head: {
    height: 50,
    borderBottomColor: lightTheme.colors.PrimaryBorderColor,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    borderStyle: "dashed",
  },

  children: {
    backgroundColor: "#ffffff",
    marginTop: 20,
    minHeight: 150,
    padding: 10,
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
    width: "70%",
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
  staffImage: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: lightTheme.colors.PrimaryBorderColor,
  },
  grade: {
    height: 68,
    width: "100%",
    backgroundColor: lightTheme.colors.PrimaryBackground,
    padding: 10,
  },
  gradeLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  comments: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
