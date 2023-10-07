import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateAppPrivilegeState } from "@safsims/redux/privileges/actions";
import {
  setActiveUserType,
  setLoginAttempts,
  setUserTypes,
  updateAppUserState,
  userLoginSuccess,
} from "@safsims/redux/users/actions";
import { UserTypesEnum } from "@safsims/utils/constants";
import httpClient from "@safsims/utils/http-client";
import useLoading from "@safsims/utils/useLoading/useLoading";
import {
  ADMIN_ROLE,
  DIRECTOR_ROLE,
  ONBOARDING_ROLE,
  FORM_TEACHER_ROLE,
  handleError,
} from "@safsims/utils/utils";
import Toast from "react-native-toast-message";
// import Toast from 'react-native-toast-message';
import { useDispatch } from "react-redux";

interface IProps {
  username: string;
  password: string;

  callback?: () => void;
}

const useLogin = ({ school_id }) => {
  const { loading, startLoading, stopLoading } = useLoading();
  const dispatch = useDispatch();

  const loginUser = async ({
    username,
    password,

    callback,
  }: IProps) => {
    startLoading();

    try {
      const { data: ref } = await httpClient.post(
        "/auth/login",
        { username, password },
        {
          headers: {
            "X-TENANT-ID": school_id,
          },
        }
      );

      const ums = ref.ums_login_response;
      const roles = ums?.user?.roles;
      const isSuperAdmin = !!roles?.find(
        (item) => item.role?.name === ONBOARDING_ROLE
      );
      const isAdmin = !!roles?.find((item) => item.role?.name === ADMIN_ROLE);
      let isFormTeacher = false;
      if (ref.user_types.find((x) => x.toLowerCase() === "staff")) {
        const form_teachers = ref.form_teachers || [];
        if (form_teachers.length > 0) {
          isFormTeacher = true;
        }
      }
      const isDirector = !!roles?.find(
        (item) => item.role?.name === DIRECTOR_ROLE
      );
      if (!isDirector && !isFormTeacher) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "You don't have permission to access this app",
        });
        stopLoading();
        return;
      }
      dispatch(
        updateAppPrivilegeState({
          isSuperAdmin,
          isAdmin,
          isDirector,
        })
      );
      const userTypes = (ref.user_types || [])?.map((item) => ({
        user_type: item.toLowerCase(),
        ...ref[item.toLowerCase()],
      }));
      dispatch(setUserTypes(userTypes));

      if (isDirector) {
        dispatch(setActiveUserType(DIRECTOR_ROLE));

        dispatch(setLoginAttempts(0));
      }
      if (isFormTeacher) {
        dispatch(setActiveUserType(FORM_TEACHER_ROLE));
      }
      if (isAdmin && !isDirector) {
        dispatch(setActiveUserType(ADMIN_ROLE));
      }
      dispatch(
        updateAppUserState({
          access_token: ums?.access_token,
        })
      );
      await AsyncStorage.setItem("access_token", ums?.access_token || "");
      await AsyncStorage.setItem("refresh_token", ums?.refresh_token || "");
      httpClient.defaults.headers.common.Authorization = `Bearer ${ums?.access_token}`;
      const director = userTypes.find(
        (item) => item.user_type === UserTypesEnum.STAFF
      );
      dispatch(userLoginSuccess(director));

      callback?.();
      stopLoading();
    } catch (error) {
      handleError(
        error,
        { code: 401, message: error.response.data.message },
        true,
        true
      );
      stopLoading();
    }
  };

  return {
    loading,
    loginUser,
  };
};

export default useLogin;
