import AppHeader from "@safsims/components/Header/AppHeader";
import FeedTopTabNavigation from "@safsims/navigation/feed-top-navigation/FeedTopTabNavigation";
import { useAppSelector } from "@safsims/redux/hooks/useAppSelector";
import { useEffect } from "react";

import { StyleSheet, View } from "react-native";

export default function FeedHomeScreen({ navigation }) {
  const user = useAppSelector((user) => user.user.currentUser);

  return (
    <View style={styles.container}>
      <AppHeader withBorder={false} navigation={navigation} />
      <FeedTopTabNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
