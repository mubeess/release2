import useAssessmentTermlySettingsGet from "@safsims/general-hooks/useAssessmentTermlySettingsGet";
import useClassLevelsWithArmsFetch from "@safsims/general-hooks/useClassLevelsWithArmsFetch";
import { ClassLevelDto } from "@safsims/generated";

interface IProps {
  termId: string;
  levels?: ClassLevelDto[];
}

const useAssessmentTrackingGet = ({ termId, levels }: IProps) => {
  const { classLevelsWithArms, loadingClassLevels } =
    useClassLevelsWithArmsFetch({
      termId,
      fetch: !levels,
    });
  const { loading, assessmentSettings } = useAssessmentTermlySettingsGet({
    termId,
  });

  const activeLevels =
    levels ||
    classLevelsWithArms?.filter((level) => (level.arms || []).length > 0);

  // This condition handles non-early-years levels
  // const levelsUsingAssessment = activeLevels.filter((level) => !level.early_years);

  const levelsUsingAssessment = activeLevels;

  const levelsConfigured = assessmentSettings
    .map((item) => item.assessment_format!.class_levels!)
    .flat();

  const percentageConfigured =
    (levelsConfigured.length / levelsUsingAssessment.length) * 100;
  const isComplete = percentageConfigured === 100;

  const levelConfigurations = levelsUsingAssessment.map((level) => ({
    ...level,
    hasSetting: !!levelsConfigured.find(
      (item) => item.class_level_id === level.id
    ),
  }));

  return {
    loading: loadingClassLevels || loading,
    levelsUsingAssessment,
    levelsConfigured,
    isComplete,
    percentageConfigured,
    levelConfigurations,
  };
};

export default useAssessmentTrackingGet;
