import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import DirectorsHomeScreen from '../../screens/directors-screens/DirectorsHomeScreen';
// import { useAppSelector } from '@safsims/redux/hooks/useAppSelector';
// import LoginScreen from '@safsims/screens/authentication-screens/LoginScreen';

const DirectorStackScreens = () => {
  const DirectorStack = createStackNavigator<any>();
  const selectedSchool = useAppSelector((state) => state.configuration.selectedSchool);

  return (
    <DirectorStack.Navigator
    initialRouteName='DirectorHome'
      screenOptions={{ headerShown: false }}
    >
     <DirectorStack.Screen name="DirectorHome" component={DirectorsHomeScreen} />
    </DirectorStack.Navigator>
  );
};
export default DirectorStackScreens;