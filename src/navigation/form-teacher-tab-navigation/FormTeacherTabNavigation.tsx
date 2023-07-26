import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import Icon from '@safsims/components/Icon/Icon';
import { useAppSelector } from '@safsims/redux/hooks/useAppSelector';
import { Platform, useWindowDimensions } from 'react-native';
import FormTeacherStackScreens from '../form-teacher-home-stack-navigation/FormTeacherHomeStackNavigation';
import FormTeacherHomeScreen from '@safsims/screens/form-teacher-screens/FormTeacherHomeScreen';


const Tab = createBottomTabNavigator();

const hideBottomTabRoutes = [
  'BankDetails',
  'BudgetDetails',
  'BudgetItem',
  'Notifications',
  'NotificationDetails',
  'CreateMarketList',
  'UseMarketList',
];

const FormTeacherTabNavigation = ({ navigation }) => {
  const dimensions = useWindowDimensions();
  const { colors } = useTheme();

  const tabBarStyle = useAppSelector((state) => state.user.tabBarStyle);
  const theme = useAppSelector((state) => state.user?.theme);
  const isDark = theme === 'dark';
  const isAndroid = Platform.OS === 'android';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // @ts-ignore
        tabBarStyle: {
          ...tabBarStyle,
          backgroundColor: colors.PrimaryWhite,
          borderTopColor: isDark ? colors.PrimaryBorderColor : '#BBB',
        },

        tabBarInactiveTintColor: colors.PrimaryFontColor,
        tabBarActiveTintColor: isDark ? '#448aff' : undefined,
      }}
      initialRouteName="FormTeacherHome"
    >
      <Tab.Screen
        options={{
          tabBarIcon: (props) => <Icon name="grid-3" {...props} />,
        }}
        name="FormTeacherHome"
        component={FormTeacherHomeScreen}
      />
   
    </Tab.Navigator>
  );
};

export default FormTeacherTabNavigation;
