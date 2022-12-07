import { useTranslation } from "react-i18next";

export const Empty = () => {
  const { t } = useTranslation();
  return <div>{t("empty_products")}</div>;
};
