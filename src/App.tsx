import "@/App.css";
import { Route, Routes, useNavigate } from "react-router-dom";

import FavoritesPage from "@/ui/pages/Favorites/FavoritesPage";
import HomePage from "@/ui/pages/Home/HomePage";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { LayoutContainer } from "./ui/components/styled-components";

function App() {
  const navigate = useNavigate();
  const pages = [
    { label: "Home", route: "/" },
    { label: "Favorites", route: "/favorites" },
  ];
  return (
    <LayoutContainer>
      <div className="App">
        <AppBar position="fixed">
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  onClick={() => navigate(page.route)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </div>
    </LayoutContainer>
  );
}

export default App;
