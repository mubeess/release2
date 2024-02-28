import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import GroupList from "../chats/components/GroupList";
import useGetGroups from "../activity-feeds/hooks/useGetGroups";
import { GroupResponse } from "@safsims/generated";
import FloatButton from "@safsims/components/Button/FloatButton";
import Icon from "@safsims/components/Icon/Icon";
import AnimatedFloatButton from "@safsims/components/Button/AnimatedFloatButton";
import EmptyState from "@safsims/components/EmptyState/EmptyState";
import { EmptyPaper } from "@safsims/components/Images";
import SkeletonLoader from "@safsims/components/SkeletonLoader/SkeletonLoader";

export default function GroupsScreen({ navigation }) {
  const { getGroups, loading, groups } = useGetGroups();
  const [refresh, setRefresh] = useState(0);
  const handleRefresh = () => {
    setRefresh((prev) => prev + 1);
  };
  useEffect(() => {
    getGroups();
  }, [refresh]);
  return (
    <>
      <ScrollView style={styles.container}>
        {loading && <SkeletonLoader isLoading />}
        {!loading &&
          groups.map((group: GroupResponse) => (
            <GroupList key={group.id} group={group} />
          ))}
        {!loading && groups?.length == 0 && (
          <EmptyState
            info="You are not added to group!"
            title="Not added to a group!"
            Image={<EmptyPaper />}
          />
        )}
      </ScrollView>
      <AnimatedFloatButton
        refresh={handleRefresh}
        navigation={navigation}
        Icon={<Icon name="add" size={20} color="#fff" />}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    position: "relative",
  },
});
