import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../screens/authentication-screens/LoginScreen";
import SelectSchoolScreen from "../../screens/authentication-screens/SelectSchool";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import ResetLinkScreen from "@safsims/screens/authentication-screens/ResetLinkScreen";

const AuthStackScreens = () => {
  const AuthStack = createStackNavigator<any>();
  const selectedSchool = useAppSelector(
    (state) => state.configuration.selectedSchool
  );

  return (
    <AuthStack.Navigator
      initialRouteName={selectedSchool ? "Login" : "SelectSchool"}
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="SelectSchool" component={SelectSchoolScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="ResetLink" component={ResetLinkScreen} />
    </AuthStack.Navigator>
  );
};
export default AuthStackScreens;
