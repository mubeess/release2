import {
  LessonPlanDto,
  LessonPlanRestControllerService,
} from "@safsims/generated";
import { useAppSelector } from "@safsims/redux/hooks/useAppSelector";
import { apiWrapper } from "@safsims/utils/http-client";
import useLoading from "@safsims/utils/useLoading/useLoading";
import { handleError } from "@safsims/utils/utils";
import { useEffect, useState } from "react";

interface IProps {
  termId?: string;
  studentId?: string;
}

const useGetTeacherLessonPlan = (id) => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [myLessonPlans, setMyLessonPlans] = useState<LessonPlanDto[]>([]);
  const user = useAppSelector((user) => user.user);
  const getMyLessonPlans = async () => {
    startLoading();
    try {
      // console.log(user.subject_teacher[0].id, id, "started");
      const data = await apiWrapper(() =>
        LessonPlanRestControllerService.filterLessonPlansByCreatorUsingGet({
          id: id,

          limit: 10,
          search: "",
          offset: 0,
        })
      );
      // console.log(data, "0909");
      setMyLessonPlans(data.content || []);
      stopLoading();
    } catch (error) {
      handleError(error);
      stopLoading();
    }
  };
  useEffect(() => {
    if (user.subject_teacher && user.subject_teacher?.length > 0 && id) {
      getMyLessonPlans();
    }
  }, [id]);
  return {
    loading,
    myLessonPlans,
    getMyLessonPlans,
  };
};

export default useGetTeacherLessonPlan;
