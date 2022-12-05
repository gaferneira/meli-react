import { useTranslation } from "react-i18next";

export const Empty = () => {
  const { t } = useTranslation();
  return <div>{t("There are no favorites")}</div>;
};
