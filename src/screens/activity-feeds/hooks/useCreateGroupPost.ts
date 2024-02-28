import { ActivityFeedRestControllerService } from "@safsims/generated";
import { useAppSelector } from "@safsims/redux/hooks/useAppSelector";
import { apiWrapper } from "@safsims/utils/http-client";
import useLoading from "@safsims/utils/useLoading/useLoading";
import { handleError } from "@safsims/utils/utils";
import { useState } from "react";
import Toast from "react-native-toast-message";

const useCreateGroupPost = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [groups, setGroups] = useState<any>(undefined);
  const token = useAppSelector((user) => user.user.access_token);
  const createGroup = async ({ name }) => {
    startLoading();

    try {
      const data = await apiWrapper(() =>
        ActivityFeedRestControllerService.createGroupUsingPost({
          authorization: token || "",
          request: {
            name,
          },
        })
      );

      setGroups(data);
      stopLoading();

      return { success: true, id: data.id };
    } catch (error) {
      handleError(error);
      stopLoading();
      return { success: false };
    }
  };

  return {
    loading,
    groups,
    createGroup,
  };
};

export default useCreateGroupPost;
