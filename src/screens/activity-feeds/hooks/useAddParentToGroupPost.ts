import { ActivityFeedRestControllerService } from "@safsims/generated";
import { useAppSelector } from "@safsims/redux/hooks/useAppSelector";
import { apiWrapper } from "@safsims/utils/http-client";
import useLoading from "@safsims/utils/useLoading/useLoading";
import { handleError } from "@safsims/utils/utils";
import { useState } from "react";

const useAddParentToGroupPost = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  // const [groups, setGroups] = useState<any>(undefined);
  const token = useAppSelector((user) => user.user.access_token);

  const addUserToGroup = async ({ id, username, groups }) => {
    startLoading();

    try {
      const data = await apiWrapper(() =>
        ActivityFeedRestControllerService.addUserToGroupsUsingPost({
          authorization: token || "",
          request: {
            groups,
            user_id: id,
            username,
          },
        })
      );

      stopLoading();
      return true;
    } catch (error) {
      handleError(error);
      stopLoading();
    }
  };

  return {
    loading,
    addUserToGroup,
  };
};

export default useAddParentToGroupPost;
