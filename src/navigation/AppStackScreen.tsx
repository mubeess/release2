import { createStackNavigator } from "@react-navigation/stack";
import { useAppSelector } from "../redux/hooks/useAppSelector";

import DirectorStackScreens from "./director-stack-navigation/DirectorStackNavigation";
import FormTeacherTabNavigation from "./form-teacher-tab-navigation/FormTeacherTabNavigation";
import { DIRECTOR_ROLE } from "@safsims/utils/utils";
import ClassessScreen from "@safsims/screens/form-teacher-screens/class-screens/ClassessScreen";
// import { useAppSelector } from '@safsims/redux/hooks/useAppSelector';
// import LoginScreen from '@safsims/screens/authentication-screens/LoginScreen';

const AppStackScreens = () => {
  const AppStack = createStackNavigator<any>();
  const userRole = useAppSelector((state) => state.user.activeUserType);

  return (
    <AppStack.Navigator
      initialRouteName="MainDashboard"
      screenOptions={{ headerShown: false }}
    >
      <AppStack.Screen
        name="MainDashboard"
        component={
          userRole == DIRECTOR_ROLE
            ? DirectorStackScreens
            : FormTeacherTabNavigation
        }
      />
      {/* <AppStack.Screen name="" component={ClassessScreen} /> */}
    </AppStack.Navigator>
  );
};
export default AppStackScreens;
