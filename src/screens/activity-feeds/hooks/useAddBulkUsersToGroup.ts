import { ActivityFeedRestControllerService } from "@safsims/generated";
import { useAppSelector } from "@safsims/redux/hooks/useAppSelector";
import { apiWrapper } from "@safsims/utils/http-client";
import useLoading from "@safsims/utils/useLoading/useLoading";
import { handleError } from "@safsims/utils/utils";
import { useState } from "react";
import Toast from "react-native-toast-message";

const useAddBulkUsersToGroup = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [groups, setGroups] = useState<any>(undefined);
  const token = useAppSelector((user) => user.user.access_token);

  const addUsersToGroup = async ({ group, user_ids }) => {
    startLoading();
 
    try {
      const data = await apiWrapper(() =>
        ActivityFeedRestControllerService.addUsersToGroupUsingPost({
          authorization: token || "",
          request: {
            group,
            user_ids,
          },
        })
      );

      setGroups(data);
      stopLoading();
      Toast.show({
        type: "success",
        text1: "Added users group",
        text2: "Added",
      });
      return true;
    } catch (error) {
      handleError(error);
      stopLoading();
    }
  };

  return {
    loading,
    groups,
    addUsersToGroup,
  };
};

export default useAddBulkUsersToGroup;
