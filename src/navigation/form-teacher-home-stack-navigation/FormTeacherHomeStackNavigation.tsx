import { createStackNavigator } from '@react-navigation/stack';

import useTabBarDisplay from '@safsims/utils/useTabBarDisplay/useTabBarDisplay';

const FormTeacherStackScreens = () => {
  const FeesStack = createStackNavigator<any>();

  const { checkTabBar } = useTabBarDisplay();

  return (
    <FeesStack.Navigator
      initialRouteName="FormTeacherHomeScreen"
      screenOptions={{ headerShown: false }}
      screenListeners={{
        state: (e) => checkTabBar(e),
      }}
    >
      <FeesStack.Screen name="FormTeacherHomeScreen" component={FormTeacherStackScreens} />
      
    </FeesStack.Navigator>
  );
};
export default FormTeacherStackScreens;
