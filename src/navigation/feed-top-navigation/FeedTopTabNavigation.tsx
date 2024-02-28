import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { lightTheme } from "@safsims/utils/Theme";
import CustomTabBar from "./components/CustomTabBar";
import ActivityFeeds from "@safsims/screens/activity-feeds/ActivityFeeds";
import Chats from "@safsims/screens/chats/Chats";

import GroupsScreen from "@safsims/screens/groups/GroupsScreen";

const Tab = createMaterialTopTabNavigator();

export default function FeedTopTabNavigation() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarIndicatorStyle: {
          borderColor: lightTheme.colors.PrimaryColor,
          borderWidth: 1,
        },
        tabBarLabelStyle: {
          textTransform: "capitalize",
        },
      }}
    >
      <Tab.Screen name="Activityfeeds" component={ActivityFeeds} />
      <Tab.Screen name="Groups" component={GroupsScreen} />
    </Tab.Navigator>
  );
}
