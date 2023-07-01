import useClassLevelsWithArmsFetch from "@safsims/general-hooks/useClassLevelsWithArmsFetch";
import useCognitiveSkillsTermlySettingsGet from "@safsims/general-hooks/useCognitiveSkillsTermlySettingsGet";
import { ClassLevelDto, ClassLevelLiteDto } from "@safsims/generated";

interface IProps {
  termId: string;
  levels?: ClassLevelDto[];
}

const useSkillGroupSettingsTrack = ({ termId, levels }: IProps) => {
  const { classLevelsWithArms, loadingClassLevels } =
    useClassLevelsWithArmsFetch({
      termId,
      fetch: !levels,
    });

  const activeLevels =
    levels ||
    classLevelsWithArms?.filter((level) => (level.arms || []).length > 0);
  // This condition handles hybrid levels
  // const levelsThatCanUseSkills = activeLevels.filter(
  //   (level) => level.early_years === true || level.early_years === null,
  // );

  const levelsThatCanUseSkills = activeLevels;

  const { cognitiveSkillSettings, loading } =
    useCognitiveSkillsTermlySettingsGet({
      termId,
    });

  const levelsConfigured: ClassLevelLiteDto[] = cognitiveSkillSettings
    .map((item) => item.class_levels)
    .flat()
    .reduce((t, a) => {
      if (!!!t.find((level) => level.class_level_id === a.class_level_id))
        t.push(a);
      return t;
    }, []);

  const percentageConfigured =
    (levelsConfigured.length / levelsThatCanUseSkills.length) * 100;
  const isComplete = percentageConfigured === 100;

  const levelConfigurations = levelsThatCanUseSkills.map((level) => ({
    ...level,
    hasSetting: !!levelsConfigured.find(
      (item) => item.class_level_id === level.id
    ),
  }));

  return {
    loading: loadingClassLevels || loading,
    levelsThatCanUseSkills,
    levelsConfigured,
    isComplete,
    percentageConfigured,
    levelConfigurations,
  };
};

export default useSkillGroupSettingsTrack;
