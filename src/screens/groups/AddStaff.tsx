import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import UserList from "./components/UserList";
import useParentGet from "@safsims/general-hooks/useParentGet";
import useAllParentGet from "./hooks/useAllParentGet";
import SkeletonLoader from "@safsims/components/SkeletonLoader/SkeletonLoader";
import Button from "@safsims/components/Button/Button";
import { lightTheme } from "@safsims/utils/Theme";
import { ArrowLeftIcon, ArrowRightIcon } from "@safsims/components/Images";
import Input from "@safsims/components/Input/Input";
import Icon from "@safsims/components/Icon/Icon";
import Checkbox from "expo-checkbox";
import Select from "@safsims/components/Select/Select";
import useGetAllGroups from "../activity-feeds/hooks/useGetAllGroups";
import { GroupResponse } from "@safsims/generated";
import useAddBulkUsersToGroup from "../activity-feeds/hooks/useAddBulkUsersToGroup";
import useGetAllStaff from "./hooks/useGetAllStaff";
import StaffList from "./components/StaffList";

export default function AddStaff() {
  const [groupOptions, setOptionGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const { addUsersToGroup, loading: addidnUsers } = useAddBulkUsersToGroup();

  const handleSelect = (id) => {
    setSelectedUsers((prev) => [...prev, id]);
  };

  const handleRemove = (id) => {
    const filtered = selectedUsers.filter((user) => user !== id);
    setSelectedUsers(filtered);
  };
  const {
    page,
    setPage,
    lastPage,
    setOffset,
    offset,
    setSearchText,
    searchText,
    loadingParent,
    staff,
  } = useGetAllStaff();
  const { groups, loading, getGroups } = useGetAllGroups();

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    const mainOptions = [];
    if (groups.length > 0) {
      groups.map((group: GroupResponse) => {
        mainOptions.push({ label: group.name, value: group.id });
      });
    }
    setOptionGroups(mainOptions);
  }, [groups]);
  return (
    <View style={styles.container}>
      <View style={{ padding: 20 }}>
        <Select
          onChange={(val) => {
            setSelectedGroup(val.value);
          }}
          required
          label="Select Group"
          options={groupOptions}
        />
      </View>
      <View style={styles.head}>
        <Input
          style={{ width: "50%" }}
          label=""
          placeholder="Search Parent"
          Icon={<Icon name="filter-search" size={20} />}
        />
        <View style={styles.check}>
          <Checkbox
            onValueChange={(e) => {
              if (e == true) {
                const allUsers = staff.map((staff) => staff.staff_ums_id);
                setAllSelected(true);
                setSelectedUsers(allUsers || []);
              } else {
                setAllSelected(false);
                setSelectedUsers([]);
              }
            }}
            value={allSelected}
            color={
              allSelected
                ? lightTheme.colors.PrimaryColor
                : lightTheme.colors.PrimaryBorderColor
            }
          />
          <Text style={{ marginLeft: 10 }}>Select All</Text>
        </View>
      </View>
      <ScrollView style={styles.list}>
        {loadingParent && <SkeletonLoader isLoading />}
        {!loadingParent && (
          <>
            {staff.map((staff, index) => (
              <StaffList
                selected={selectedUsers}
                selectUser={handleSelect}
                removeUser={handleRemove}
                staff={staff}
                key={index}
              />
            ))}
          </>
        )}
        <View style={styles.buttons}>
          <Button
            onPress={() => {
              if (page == 1) {
                return;
              }
              setPage(page - 1);
            }}
            style={{
              ...styles.button,
              backgroundColor: "transparent",
              elevation: 0,
              borderWidth: 1,
              borderColor: lightTheme.colors.PrimaryBorderColor,
            }}
            label=""
            IconLeft={<ArrowLeftIcon />}
          />
          <Button style={styles.button} label={`${page}`} />
          <Button
            onPress={() => {
              if (lastPage) {
                return;
              }
              setOffset((prev) => prev + 1);
            }}
            IconLeft={<ArrowRightIcon />}
            style={{
              ...styles.button,
              backgroundColor: "transparent",
              elevation: 0,
              borderWidth: 1,
              borderColor: lightTheme.colors.PrimaryBorderColor,
            }}
            label=""
          />
        </View>
      </ScrollView>
      <Button
        isLoading={addidnUsers}
        onPress={() =>
          addUsersToGroup({ group: selectedGroup, user_ids: selectedUsers })
        }
        label="Add To Group"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    paddingHorizontal: 20,
    flex: 1,
  },
  buttons: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
  },
  button: {
    width: 40,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  check: {
    flexDirection: "row",
    alignItems: "center",
  },
});
