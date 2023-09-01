import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import Icon from "@safsims/components/Icon/Icon";
import { useAppSelector } from "@safsims/redux/hooks/useAppSelector";
import { Dimensions, Platform, useWindowDimensions } from "react-native";

import FormTeacherHomeScreen from "@safsims/screens/form-teacher-screens/form-teacher-home-screens/FormTeacherHomeScreen";
import {
  FormTeacherClassIcon,
  FormTeacherHomeIcon,
  FormTeacherMoreIcon,
  FormTeacherStudenIcon,
} from "@safsims/components/Images";
import FormTeacherClassStackScreens from "../form-teacher-stack-navigation/FormTeacherClassStackNavigation";
import Modal from "@safsims/components/Modal/Modal";
import Text from "@safsims/components/Text/Text";
import { useEffect, useState } from "react";
import TabMoreMenu from "@safsims/screens/form-teacher-screens/components/TabMoreMenu";
import BottomSlider from "@safsims/components/BottomSlider/BottomSlider";
import { useDispatch } from "react-redux";
import { updateAppUserState } from "@safsims/redux/users/actions";
import NullComponent from "@safsims/components/Null/NullComponent";
import AttendanceHomeScreen from "@safsims/screens/form-teacher-screens/attendance-screens/AttendanceHomeScreen";

const Tab = createBottomTabNavigator();

const hideBottomTabRoutes = [
  "BankDetails",
  "BudgetDetails",
  "BudgetItem",
  "Notifications",
  "NotificationDetails",
  "CreateMarketList",
  "UseMarketList",
];

const FormTeacherTabNavigation = ({ navigation }) => {
  const dimensions = useWindowDimensions();
  const { colors } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const tabBarStyle = useAppSelector((state) => state.user.tabBarStyle);
  const theme = useAppSelector((state) => state.user?.theme);
  const isDark = theme === "dark";
  const isAndroid = Platform.OS === "android";

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          // @ts-ignore
          tabBarStyle: {
            ...tabBarStyle,
            backgroundColor: colors.PrimaryWhite,
            borderTopColor: isDark ? colors.PrimaryBorderColor : "#BBB",
          },

          tabBarInactiveTintColor: colors.PrimaryFontColor,
          tabBarActiveTintColor: isDark ? "#448aff" : undefined,
        }}
        initialRouteName="FormTeacherHome"
      >
        <Tab.Screen
          options={{
            tabBarIcon: (props) => <FormTeacherHomeIcon {...props} />,
            tabBarLabel: "Home",
          }}
          name="FormTeacherHome"
          component={FormTeacherHomeScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: (props) => <FormTeacherClassIcon {...props} />,
            tabBarLabel: "Classes",
          }}
          name="FormTeacherClass"
          component={FormTeacherClassStackScreens}
        />
        <Tab.Screen
          options={{
            tabBarIcon: (props) => <Icon name="calendar" {...props} />,
            tabBarLabel: "Attendance",
          }}
          name="FormTeacherAttendance"
          component={AttendanceHomeScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: (props) => <FormTeacherMoreIcon {...props} />,
          }}
          name="More"
          component={NullComponent}
          listeners={{
            tabPress: (event) => {
              event.preventDefault();
              setModalOpen(true);
            },
          }}
        />
      </Tab.Navigator>
      <BottomSlider
        height={Dimensions.get("window").height / 3}
        isOpen={modalOpen}
        children={<TabMoreMenu />}
        onClose={closeModal}
      />
    </>
  );
};

export default FormTeacherTabNavigation;
