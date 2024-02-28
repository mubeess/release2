import { createStackNavigator } from "@react-navigation/stack";
import PostFeedScreen from "@safsims/screens/activity-feeds/PostFeedScreen";
import FeedHomeScreen from "@safsims/screens/feed-home-screen/FeedHomeScreen";
import AddUsersToGroup from "@safsims/screens/groups/AddUsersToGroup";

import useTabBarDisplay from "@safsims/utils/useTabBarDisplay/useTabBarDisplay";

const FeedStackNavigation = () => {
  const ParentHomeStack = createStackNavigator<any>();

  const { checkTabBar } = useTabBarDisplay();

  return (
    <ParentHomeStack.Navigator
      initialRouteName="FeedHome"
      screenOptions={{ headerShown: false }}
      screenListeners={{
        state: (e) => checkTabBar(e),
      }}
    >
      <ParentHomeStack.Screen name="FeedHome" component={FeedHomeScreen} />
      <ParentHomeStack.Screen name="AddPost" component={PostFeedScreen} />
      <ParentHomeStack.Screen name="AddUsers" component={AddUsersToGroup} />
    </ParentHomeStack.Navigator>
  );
};
export default FeedStackNavigation;
