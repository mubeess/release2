import { PusherEvent } from "@pusher/pusher-websocket-react-native";
import { useNavigation } from "@react-navigation/native";

import useNotification from "@safsims/general-hooks/useNotification";

import { GroupResponse } from "@safsims/generated";
import { handleError } from "@safsims/utils/utils";
import { memo, useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

import FeedMenu from "./components/FeedMenu";
import useGetAllFeeds from "./hooks/useGetAllFeeds";
import useGetGroups from "./hooks/useGetGroups";
import FloatButton from "@safsims/components/Button/FloatButton";
import Icon from "@safsims/components/Icon/Icon";
import SkeletonLoader from "@safsims/components/SkeletonLoader/SkeletonLoader";
import pusherService from "@safsims/utils/pusherService";
import EmptyState from "@safsims/components/EmptyState/EmptyState";
import { EmptyPaper } from "@safsims/components/Images";

function ActivityFeeds({ navigation }) {
  // const navigation = useNavigation();
  const { notify } = useNotification();

  const [connected, setConnected] = useState(false);

  const { getGroups, loading, groups } = useGetGroups();

  const { getFeeds, loadingFeeds, feeds, setNewData, refetch, refresh } =
    useGetAllFeeds();

  const SubscribeToChannel = async (channel: string) => {
    try {
      const myChannel = await pusherService.pusher.subscribe({
        channelName: channel,
        onEvent: (event: PusherEvent) => {
          if (event.eventName == "incoming_feed") {
            setNewData(JSON.parse(event.data));
            Toast.show({
              type: "success",
              text1: "New Post",
              text2: JSON.parse(event.data).object?.content,
            });
            notify({
              id: event.channelName,
              title: JSON.parse(event.data).actor?.name,
              body: JSON.parse(event.data).object?.content,
            });
          }
        },
      });
    } catch (error) {
      console.log(error, "onerror");
      handleError(error);
    }
  };

  // useEffect(() => {
  //   getGroups();
  //   getFeeds();
  // }, []);

  useEffect(() => {
    if (groups.length > 0) {
      groups.map((group: GroupResponse) => {
        SubscribeToChannel(group.id || "");
      });
    }
  }, [groups]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getGroups();
      getFeeds();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <View style={styles.container}>
        {loadingFeeds && refresh == 0 && <SkeletonLoader isLoading />}
        <>
          {!loadingFeeds && feeds?.length > 0 && (
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={loadingFeeds && refresh > 0}
                  onRefresh={refetch}
                />
              }
              data={feeds !== undefined ? feeds : []}
              renderItem={({ item }) => <FeedMenu feed={item} />}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </>
        {!loading && feeds?.length == 0 && (
          <EmptyState
            info="There is no feeds for you"
            title="No Feeds!"
            Image={<EmptyPaper />}
          />
        )}
      </View>

      <FloatButton
        onPress={() => navigation.navigate("AddPost")}
        Icon={<Icon name="message-edit" size={20} color="#fff" />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
});

export default memo(ActivityFeeds);
