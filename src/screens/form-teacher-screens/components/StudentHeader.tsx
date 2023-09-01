import { useNavigation } from "@react-navigation/native";
import Icon from "@safsims/components/Icon/Icon";
import {
  ArrowLeftIcon,
  StudentHeaderOverlay,
} from "@safsims/components/Images";
import Text from "@safsims/components/Text/Text";
import { lightTheme } from "@safsims/utils/Theme";
import React from "react";
import { TouchableOpacity } from "react-native";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
interface IProps {
  name?: string;
  student_class?: string;
  id?: string;
  screen?: string;
  profile_pic: string;
  onNext?: () => void;
  onPrev?: () => void;
}
export default function StudentHeader({
  name = "",
  id = "",
  student_class = "",
  screen = "",
  profile_pic = "",
  onNext,
  onPrev,
}: IProps) {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: lightTheme.colors.PrimaryColor }}>
      <StatusBar translucent backgroundColor={lightTheme.colors.PrimaryColor} />
      <ImageBackground
        resizeMode="cover"
        source={require("../../../../assets/overlay.png")}
        style={styles.container}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <ArrowLeftIcon />
        </TouchableOpacity>
        <View style={styles.content}>
          <Text
            h2
            style={{ textAlign: "center", color: "#fff", marginBottom: 5 }}
          >
            {screen}
          </Text>
          <Text style={{ textAlign: "center", color: "#fff" }}>
            {student_class}
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.detailsContainer}>
        <ImageBackground
          resizeMode="contain"
          source={require("../../../../assets/default.png")}
          style={styles.imageContainer}
        >
          {profile_pic && (
            <Image
              resizeMode="contain"
              style={styles.image}
              source={{
                uri: profile_pic,
              }}
            />
          )}
        </ImageBackground>

        <View style={styles.buttons}>
          <TouchableOpacity onPress={onPrev} style={styles.button}>
            <Icon
              color={lightTheme.colors.PrimaryGrey}
              name="arrow-circle-left"
              size={30}
            />
            <Text
              style={{
                ...styles.text,
                marginLeft: 10,
                color: lightTheme.colors.PrimaryGrey,
              }}
            >
              Previuos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onNext} style={styles.button}>
            <Text
              style={{
                ...styles.text,
                marginRight: 10,
                color: lightTheme.colors.PrimaryColor,
              }}
            >
              Next
            </Text>
            <Icon
              color={lightTheme.colors.PrimaryColor}
              name="arrow-circle-right"
              size={30}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.name}>
          <Text h2>{name}</Text>
          <Text style={{ color: lightTheme.colors.PrimaryGrey }}>{id}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 140,
    width: "100%",
    backgroundColor: lightTheme.colors.PrimaryColor,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  back: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: "#E6E9EC",
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "auto",
    position: "absolute",
    left: 0,
  },
  content: {
    // marginRight:'auto',
  },
  detailsContainer: {
    backgroundColor: "#fff",
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 72,
  },
  imageContainer: {
    height: 70,
    width: 70,
    borderRadius: 72,
    marginLeft: "auto",
    marginRight: "auto",
    transform: [{ translateY: -25 }],
    borderWidth: 4,
    borderColor: "#fff",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    transform: [{ translateY: -25 }],
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
  },
  name: {
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: -25 }],
  },
});
