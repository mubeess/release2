import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/authentication-screens/LoginScreen';
import SelectSchoolScreen from '../../screens/authentication-screens/SelectSchool';
import { useAppSelector } from '../../redux/hooks/useAppSelector';


const AuthStackScreens = () => {
  const AuthStack = createStackNavigator<any>();
  const selectedSchool = useAppSelector((state) => state.configuration.selectedSchool);

  return (
    <AuthStack.Navigator
    initialRouteName={selectedSchool ? 'Login' : 'SelectSchool'}
      screenOptions={{ headerShown: false }}
    >
     <AuthStack.Screen name="SelectSchool" component={SelectSchoolScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
    
    </AuthStack.Navigator>
  );
};
export default AuthStackScreens;