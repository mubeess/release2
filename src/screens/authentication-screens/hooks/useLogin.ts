import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateAppPrivilegeState } from "@safsims/redux/privileges/actions";
import {
  setActiveUserType,
  setCurrentStaffSubjects,
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
  SUBJECT_TEACHER_ROLE,
} from "@safsims/utils/utils";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
// import Toast from 'react-native-toast-message';
import { useDispatch } from "react-redux";

interface IProps {
  username?: string;
  password?: string;
  code?: string;
  callback?: () => void;
}

interface Props {
  transfer_code?: string;
}

const useLogin = ({ transfer_code }: Props) => {
  const { loading, startLoading, stopLoading } = useLoading();
  const dispatch = useDispatch();

  const loginUser = async ({ username, password, code, callback }: IProps) => {
    startLoading();
    const url = code ? `/auth/google/transfer` : "/auth/login";
    const payload = code ? { code } : { username, password };
    try {
      const { data: ref } = await httpClient.post(url, payload);

      const ums = ref.ums_login_response;
      const roles = ums?.user?.roles;

      const isSuperAdmin = !!roles?.find(
        (item) => item.role?.name === ONBOARDING_ROLE
      );

      const isAdmin = !!roles?.find((item) => item.role?.name === ADMIN_ROLE);
      let isFormTeacher = false;
      let isSubjectTeacher = false;
      if (ref.user_types.find((x) => x.toLowerCase() === "staff")) {
        const form_teachers = ref.form_teachers || [];
        const subject_teachers = ref.subject_teachers || [];
        if (form_teachers.length > 0) {
          isFormTeacher = true;
        }

        if (subject_teachers.length > 0) {
          isSubjectTeacher = true;
        }
      }
      const isDirector = !!roles?.find(
        (item) => item.role?.name === DIRECTOR_ROLE
      );
      if (!isDirector && !isFormTeacher && !isAdmin && !isSubjectTeacher) {
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
      if (isSubjectTeacher) {
        dispatch(setCurrentStaffSubjects(JSON.stringify(ref.subject_teachers)));
        // console.log(ref.subject_teachers, "main");
      }

      if (isDirector) {
        dispatch(setActiveUserType(DIRECTOR_ROLE));

        dispatch(setLoginAttempts(0));
      } else if (isFormTeacher) {
        dispatch(setActiveUserType(FORM_TEACHER_ROLE));
      } else if (isAdmin && !isDirector) {
        dispatch(setActiveUserType(ADMIN_ROLE));
      } else if (isSubjectTeacher) {
        dispatch(setActiveUserType(SUBJECT_TEACHER_ROLE));
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
      console.log(director, "director");
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
  useEffect(() => {
    if (transfer_code) {
      loginUser({ code: transfer_code });
    }
  }, [transfer_code]);
  return {
    loading,
    loginUser,
  };
};

export default useLogin;
