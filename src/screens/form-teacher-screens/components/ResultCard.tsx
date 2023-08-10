import Icon from "@safsims/components/Icon/Icon";
import Text from "@safsims/components/Text/Text";
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
  
  export default function ResultCard({
    isEven = false,
    active = false,
   
  }: {
    isEven?: boolean;
    active?: boolean;
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
            <View style={styles.staffImage}>
            <Text>image</Text>
            </View>
            <View style={styles.name}>
              <Text h3>
                sample
              </Text>
              <Text
                style={{
                  color: lightTheme.colors.PrimaryGrey,
                }}
              >
               sample
              </Text>
            </View>
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
              <Text>Gender</Text>
              <Text>male</Text>
            </View>
  
            <View style={styles.list}>
              <Text>Class Level</Text>
              <Text>academic</Text>
            </View>
  
            <View style={styles.list}>
              <Text>Status</Text>
              <View
                style={[
                  styles.status,
                  {
                    backgroundColor:"#F5C6D6",
                  },
                ]}
              >
                <Text
                  style={{
                    color : lightTheme.colors.PrimaryRed,
                  }}
                >
                 Inactive
                </Text>
              </View>
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
    staffImage:{
      height: 40,
      width: 40,
      borderRadius:40,
      borderWidth:1,
      borderColor:lightTheme.colors.PrimaryBorderColor
    }
  });
  