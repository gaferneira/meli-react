import { useAppSelector } from "@/domain";

const useFavoritesPage = () => {
  const favorites = useAppSelector((state) => state.favorites);
  return {
    favorites,
  };
};

export default useFavoritesPage;
