import useBankAccountFetch from "@safsims/general-hooks/useBankAccountFetch";
import useClassLevelsFetch from "@safsims/general-hooks/useClassLevelsFetch";

const useBankSettingsTrack = () => {
  const { classLevels: activeLevels, loadingClassLevels } =
    useClassLevelsFetch();

  const { loading, bankAccounts } = useBankAccountFetch();

  const levelsConfigured = bankAccounts.map((item) => item.class_level);
  const percentageConfigured =
    (levelsConfigured.length / activeLevels.length) * 100;

  const isComplete = percentageConfigured === 100;
  const levelConfigurations = activeLevels.map((level) => ({
    ...level,
    hasSetting: !!levelsConfigured.find(
      (item) => item?.class_level_id === level.id
    ),
  }));

  return {
    loading: loadingClassLevels || loading,
    activeLevels,
    levelsConfigured,
    isComplete,
    percentageConfigured,
    levelConfigurations,
    bankAccounts,
  };
};

export default useBankSettingsTrack;
