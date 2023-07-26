import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../redux/hooks/useAppSelector';

import DirectorStackScreens from './director-stack-navigation/DirectorStackNavigation';
import FormTeacherTabNavigation from './form-teacher-tab-navigation/FormTeacherTabNavigation';
// import { useAppSelector } from '@safsims/redux/hooks/useAppSelector';
// import LoginScreen from '@safsims/screens/authentication-screens/LoginScreen';


const AppStackScreens = () => {
  const AppStack = createStackNavigator<any>();
  const accessToken = useAppSelector((state) => state.user.access_token);
  const hasOnboarded = useAppSelector((state) => state.user.onboarded);

  return (
    <AppStack.Navigator
      initialRouteName='FormTeacher'
      screenOptions={{ headerShown: false }}
    >
      <AppStack.Screen name="FormTeacher" component={FormTeacherTabNavigation} />
      <AppStack.Screen name="Director" component={DirectorStackScreens} />
    </AppStack.Navigator>
  );
};
export default AppStackScreens;