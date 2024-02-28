import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { lightTheme } from "@safsims/utils/Theme";

import AddParents from "@safsims/screens/groups/AddParents";
import AddStaff from "@safsims/screens/groups/AddStaff";

const Tab = createMaterialTopTabNavigator();

export default function AddUsersToGroupTopTabNavigation() {
  return (
    <Tab.Navigator
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
      <Tab.Screen name="Parents" component={AddParents} />
      <Tab.Screen name="Staff" component={AddStaff} />
    </Tab.Navigator>
  );
}
