import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateAppPrivilegeState } from "@safsims/redux/privileges/actions";
import {
  setActiveUserType,
  setLoginAttempts,
  setUserTypes,
  updateAppUserState,
  userLoginSuccess,
} from "@safsims/redux/users/actions";
import { UserTypesEnum, school_id } from "@safsims/utils/constants";
import httpClient from "@safsims/utils/http-client";
import useLoading from "@safsims/utils/useLoading/useLoading";
import {
  ADMIN_ROLE,
  DIRECTOR_ROLE,
  ONBOARDING_ROLE,
  handleError,
} from "@safsims/utils/utils";
// import Toast from 'react-native-toast-message';
import { useDispatch } from "react-redux";

interface IProps {
  username: string;
  password: string;
  callback?: () => void;
}

const useLogin = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const dispatch = useDispatch();

  const loginUser = async ({ username, password, callback }: IProps) => {
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
      const isDirector = !!roles?.find(
        (item) => item.role?.name === DIRECTOR_ROLE
      );
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

      if (isDirector) {
        dispatch(setActiveUserType(DIRECTOR_ROLE));
        dispatch(userLoginSuccess(director));
        dispatch(setLoginAttempts(0));
      }

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
