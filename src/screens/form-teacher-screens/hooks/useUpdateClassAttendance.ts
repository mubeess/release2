import {
  AttendanceRequest,
  AttendanceRestControllerService,
} from "@safsims/generated";
import { apiWrapper } from "@safsims/utils/http-client";
import useLoading from "@safsims/utils/useLoading/useLoading";
import { handleError } from "@safsims/utils/utils";
import Toast from "react-native-toast-message";

const useUpdateClassAttendace = () => {
  const { loading, startLoading, stopLoading } = useLoading();

  const updateAttendance = async ({
    request,
  }: {
    request: AttendanceRequest;
  }) => {
    startLoading();
    try {
      const data = await apiWrapper(() =>
        AttendanceRestControllerService.createAttendanceRecordsUsingPost({
          request,
        })
      );
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Attendance updated successfully",
      });
      stopLoading();
    } catch (error) {
      handleError(error);
      stopLoading();
    }
  };

  return {
    updatingAttendance: loading,
    updateAttendance,
  };
};

export default useUpdateClassAttendace;
