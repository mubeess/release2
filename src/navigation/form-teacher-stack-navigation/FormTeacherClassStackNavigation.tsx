import { createStackNavigator } from "@react-navigation/stack";
import ClassProfileScreen from "@safsims/screens/form-teacher-screens/class-screens/ClassProfileScreen";
import ClassessScreen from "@safsims/screens/form-teacher-screens/class-screens/ClassessScreen";
import EarlyYearsScoreEntryScreen from "@safsims/screens/form-teacher-screens/class-screens/EarlyYearsScoreEntryScreen";
import ResultDetailScreen from "@safsims/screens/form-teacher-screens/class-screens/ResultDetailScreen";
import SkillAssesmentScreen from "@safsims/screens/form-teacher-screens/class-screens/SkillAssesmentScreen";
import SubjectsScreen from "@safsims/screens/form-teacher-screens/class-screens/SubjectsScreen";

import useTabBarDisplay from "@safsims/utils/useTabBarDisplay/useTabBarDisplay";
const ClassStack = createStackNavigator<any>();
const FormTeacherClassStackScreens = () => {
  return (
    <ClassStack.Navigator
      initialRouteName="FormTeacheClass"
      screenOptions={{ headerShown: false }}
    >
      <ClassStack.Screen name="FormTeacheClass" component={ClassessScreen} />
      <ClassStack.Screen name="ClassProfile" component={ClassProfileScreen} />
      <ClassStack.Screen
        name="SkillsAssessment"
        component={SkillAssesmentScreen}
      />
      <ClassStack.Screen name="ResultDetails" component={ResultDetailScreen} />
      <ClassStack.Screen
        name="EarlyYearsScore"
        component={EarlyYearsScoreEntryScreen}
      />
    </ClassStack.Navigator>
  );
};
export default FormTeacherClassStackScreens;
