import { NavigationContainer } from "@react-navigation/native";
// import { useAppSelector } from '@safsims/redux/hooks/useAppSelector';
// import { updateAppUserState } from '@safsims/redux/users/actions';
import RNBootSplash from "react-native-bootsplash";
import { useCallback, useEffect } from "react";
import { Appearance, ColorSchemeName } from "react-native";
import "react-native-gesture-handler";
import { ThemeManager } from "react-native-ui-lib";
import { useDispatch } from "react-redux";
import AppStackScreens from "./AppStackScreen";
import AuthStackScreens from "./auth-stack-navigation/AuthStackNavigation";
import { useAppSelector } from "../redux/hooks/useAppSelector";
import { updateAppUserState } from "../redux/users/actions";
import { darkTheme, lightTheme } from "../utils/Theme";
import OnboardingStackScreens from "./onboarding-stack-navigation/OnboardinStackNavigation";
import SelectSchoolScreen from "../screens/authentication-screens/SelectSchool";
import useNotification from "@safsims/general-hooks/useNotification";
import pusherService from "@safsims/utils/pusherService";

const AppNavigationContainer = () => {
  const dispatch = useDispatch();
  const theme = useAppSelector((state) => state.user?.theme);
  const token = useAppSelector((state) => state.user?.access_token);
  const onboarded = useAppSelector((state) => state.user.onboarded);
  const { requestNotificationPermission } = useNotification();
  const setTheme = (theme: ColorSchemeName) => {
    dispatch(
      updateAppUserState({
        theme: theme || "light",
      })
    );
  };

  const themeChangeListener = useCallback(() => {
    setTheme(Appearance.getColorScheme());
  }, []);

  useEffect(() => {
    const event = Appearance.addChangeListener(themeChangeListener);
    return () => event.remove();
  }, [themeChangeListener]);
  useEffect(() => {
    requestNotificationPermission();
    pusherService.initialize();
  }, []);

  ThemeManager.setComponentTheme("Text", (props: any, context: any) => {
    return {
      // this will apply a different backgroundColor
      // depending on whether the Button has an outline or not
      //fontFamily: props.font ? "Nunito-Regular" : "",
    };
  });

  // const colorScheme = useColorScheme();

  return (
    <>
      <NavigationContainer
        onReady={() => RNBootSplash.hide()}
        // @ts-ignore
        theme={theme === "dark" ? darkTheme : lightTheme}
      >
        {token ? (
          <AppStackScreens />
        ) : (
          <>{onboarded ? <AuthStackScreens /> : <OnboardingStackScreens />}</>
        )}
      </NavigationContainer>
    </>
  );
};

export default AppNavigationContainer;
