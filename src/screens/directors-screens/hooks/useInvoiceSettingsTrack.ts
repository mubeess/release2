import useClassLevelsWithArmsFetch from "@safsims/general-hooks/useClassLevelsWithArmsFetch";
import useInvoiceTemplatesFetch from "@safsims/general-hooks/useInvoiceTemplatesFetch";
import { ClassLevelDto } from "@safsims/generated";

interface IProps {
  termId: string;
}

export type LevelConfigType = ClassLevelDto & {
  hasInvoice: boolean;
};

const useInvoiceSettingsTrack = ({ termId }: IProps) => {
  const { classLevelsWithArms, loadingClassLevels } =
    useClassLevelsWithArmsFetch({ termId });
  const { invoiceTemplates, loading } = useInvoiceTemplatesFetch({ termId });


    const levelsWithArms: LevelConfigType[] = classLevelsWithArms
    .filter((level) => level.arms?.length)
    .map((level) => ({
      ...level,
      hasInvoice: !!invoiceTemplates.find(
        (template) => template.class_level?.class_level_id === level.id
      ),
    }));
    const totalLevels = levelsWithArms.length;
  const configured = levelsWithArms.filter((level) => level.hasInvoice).length;
  const percentageConfigured = (configured / totalLevels) * 100;
  const isComplete = percentageConfigured === 100;

  
  return {
    levelConfigurations: levelsWithArms,
    configured,
    totalLevels,
    percentageConfigured,
    loadingSettings: loadingClassLevels || loading,
    isComplete,
  };
};

export default useInvoiceSettingsTrack;
