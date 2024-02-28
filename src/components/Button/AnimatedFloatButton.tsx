import { lightTheme } from "@safsims/utils/Theme";
import { ReactElement, useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Toast from "react-native-toast-message";
import Text from "../Text/Text";
import { ArrowRightIcon, CloseIcon } from "../Images";
import BottomSlider from "../BottomSlider/BottomSlider";
import Input from "../Input/Input";
import Button from "./Button";
import useCreateGroupPost from "@safsims/screens/activity-feeds/hooks/useCreateGroupPost";
import { useNavigation } from "@react-navigation/native";
import useAddParentToGroupPost from "@safsims/screens/activity-feeds/hooks/useAddParentToGroupPost";
import { useAppSelector } from "@safsims/redux/hooks/useAppSelector";
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
interface IProps {
  color?: string;
  onPress?: () => void;
  Icon: ReactElement;
  navigation?: {};
  refresh: () => void;
}
export default function AnimatedFloatButton({
  color = "",
  onPress,
  Icon,
  navigation,
  refresh,
  ...props
}: IProps) {
  const sharedValue = useSharedValue(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const { createGroup, loading, groups } = useCreateGroupPost();
  const { addUserToGroup, loading: addingUser } = useAddParentToGroupPost();
  const user = useAppSelector((user) => user.user);
  // const navigation = useNavigation();
  const animatedStyle = useAnimatedStyle(() => {
    const interpolatedValue = interpolate(sharedValue.value, [0, 1], [0, -70]);
    return {
      transform: [{ translateY: interpolatedValue }],
      opacity: sharedValue.value,
    };
  });
  const animatedStyle2 = useAnimatedStyle(() => {
    const interpolatedValue = interpolate(sharedValue.value, [0, 1], [0, -140]);
    return {
      transform: [{ translateY: interpolatedValue }],
      opacity: sharedValue.value,
    };
  });
  const animatedTextStyle = useAnimatedStyle(() => {
    const interpolatedValue = interpolate(sharedValue.value, [0, 1], [0, 1]);
    return {
      opacity: interpolatedValue,
    };
  });
  const animatedTouchableStyle = useAnimatedStyle(() => {
    const interpolatedValue = interpolate(sharedValue.value, [0, 1], [0, 45]);
    const interpolatedOpacity = interpolate(
      sharedValue.value,
      [0, 1],
      [1, 0.5]
    );
    return {
      transform: [{ rotate: `${interpolatedValue}deg` }],
      opacity: interpolatedOpacity,
    };
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[animatedStyle2, styles.mainIconContainer]}>
        <TouchableOpacity
          onPress={() => {
            setModalOpen(true);
            sharedValue.value = withSpring(0);
          }}
        >
          <Text style={{ fontSize: 12 }} h3>
            Add Group
          </Text>
        </TouchableOpacity>
        <ArrowRightIcon />
      </Animated.View>

      <Animated.View style={[animatedStyle, styles.mainIconContainer]}>
        <TouchableOpacity
          onPress={() => {
            sharedValue.value = withSpring(0);
            navigation?.replace("AddUsers");
          }}
        >
          <Text style={{ fontSize: 12 }} h3>
            Add Users to groups
          </Text>
        </TouchableOpacity>

        <ArrowRightIcon />
      </Animated.View>

      <AnimatedTouchableOpacity
        onPress={() => {
          sharedValue.value = withSpring(sharedValue.value == 0 ? 1 : 0);
        }}
        {...props}
        style={[
          styles.mainIcon,
          {
            backgroundColor: color ? color : lightTheme.colors.PrimaryColor,
          },
          animatedTouchableStyle,
        ]}
      >
        {Icon && Icon}
      </AnimatedTouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <View style={styles.addGroup}>
          <View style={styles.form}>
            <View style={styles.head}>
              <TouchableOpacity
                onPress={() => setModalOpen(false)}
                style={styles.close}
              >
                <CloseIcon />
              </TouchableOpacity>
            </View>

            <View style={styles.body}>
              <Input
                value={groupName}
                onChange={(text) => setGroupName(text)}
                label="Group Name"
                placeholder="Enter Your Group Name"
              />
              <Button
                onPress={async () => {
                  console.log(user.currentUser.first_name);

                  const created = await createGroup({ name: groupName });

                  if (created.success) {
                    const newGroup = [created.id];
                    await addUserToGroup({
                      groups: newGroup,
                      id: user.currentUser.staff_ums_id,
                      username: user.currentUser.first_name,
                    });
                    setGroupName("");
                    setModalOpen(false);
                    Toast.show({
                      type: "success",
                      text1: "Success",
                      text2: "Created a new group",
                    });
                    refresh();
                  }
                }}
                isLoading={loading || addingUser}
                style={{ marginTop: "auto" }}
                label="Create Group"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: 40,
    marginBottom: 100,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 200,
  },
  mainIcon: {
    width: 50,
    height: 50,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  iconsContainer: {
    position: "relative",
  },
  mainIconContainer: {
    width: 200,
    height: 50,
    borderRadius: 40,
    alignItems: "center",
    position: "absolute",
    flexDirection: "row",
  },
  addGroup: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  form: {
    width: "100%",
    height: Dimensions.get("window").height / 2,
    backgroundColor: "#fff",
    marginTop: "auto",
  },
  close: {
    marginLeft: "auto",
    height: 40,
    width: 40,
    backgroundColor: lightTheme.colors.PrimaryFade,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  head: {
    padding: 20,
  },
  body: {
    padding: 20,
    flex: 1,
  },
});
