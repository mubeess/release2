import useClassLevelsWithArmsFetch from "@safsims/general-hooks/useClassLevelsWithArmsFetch";
import useGradingTermlySettingsGet from "@safsims/general-hooks/useGradingTermlySettingsGet";
import { ClassLevelDto } from "@safsims/generated";

interface IProps {
  termId: string;
  levels?: ClassLevelDto[];
}

const useGradeSettingsTrack = ({ termId, levels }: IProps) => {
  const { classLevelsWithArms, loadingClassLevels } =
    useClassLevelsWithArmsFetch({
      termId,
      fetch: !levels,
    });
  const { loading, gradeSettings } = useGradingTermlySettingsGet({
    termId,
  });

  const activeLevels =
    levels ||
    classLevelsWithArms?.filter((level) => (level.arms || []).length > 0);

  // This condition handles non-early-years levels
  // const levelsUsingGrading = activeLevels.filter((level) => !level.early_years);

  const levelsUsingGrading = activeLevels;

  const levelsConfigured = gradeSettings
    .map((item) => item.class_levels!)
    .flat();

  const percentageConfigured =
    (levelsConfigured.length / levelsUsingGrading.length) * 100;
  const isComplete = percentageConfigured === 100;

  const levelConfigurations = levelsUsingGrading.map((level) => ({
    ...level,
    hasSetting: !!levelsConfigured.find(
      (item) => item.class_level_id === level.id
    ),
  }));

  return {
    loading: loadingClassLevels || loading,
    levelsUsingGrading,
    levelsConfigured,
    isComplete,
    percentageConfigured,
    levelConfigurations,
  };
};

export default useGradeSettingsTrack;
