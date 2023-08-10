import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import Icon from '@safsims/components/Icon/Icon';
import { useAppSelector } from '@safsims/redux/hooks/useAppSelector';
import { Platform, useWindowDimensions } from 'react-native';

import FormTeacherHomeScreen from '@safsims/screens/form-teacher-screens/FormTeacherHomeScreen';
import { FormTeacherClassIcon, FormTeacherHomeIcon, FormTeacherMoreIcon, FormTeacherStudenIcon } from '@safsims/components/Images';
import FormTeacherClassStackScreens from '../form-teacher-stack-navigation/FormTeacherClassStackNavigation';


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
          tabBarIcon: (props) => <FormTeacherHomeIcon {...props}/>,
          tabBarLabel:'Home'
          
        }}
        name="FormTeacherHome"
        
        component={FormTeacherHomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props) => <FormTeacherClassIcon {...props} />,
          tabBarLabel:'Classes'
        }}
        name="FormTeacherClass"
        component={FormTeacherClassStackScreens}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props) => <FormTeacherStudenIcon {...props} />,
          tabBarLabel:'Students'
        }}
        name="FormTeacheStudent"
        component={FormTeacherHomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props) => <FormTeacherMoreIcon {...props} />,
        }}
        name="More"
        component={FormTeacherHomeScreen}
      />
   
    </Tab.Navigator>
  );
};

export default FormTeacherTabNavigation;
