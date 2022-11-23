import { Route, Routes } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

function RoutesWithNotFound({ children }: Props) {
  return (
    <Routes>
      {children}
      <Route
        path="*"
        element={<h1>Page not found</h1>}
      ></Route>
    </Routes>
  );
}
export default RoutesWithNotFound;
