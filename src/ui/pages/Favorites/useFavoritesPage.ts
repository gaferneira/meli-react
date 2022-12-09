import { useAppSelector } from "@/ui";

const useFavoritesPage = () => {
  const favorites = useAppSelector((state) => state.favorites);
  return {
    favorites,
  };
};

export default useFavoritesPage;
