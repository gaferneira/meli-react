import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { pages } from "@/ui";
import styled from "styled-components";
import CustomLink from "./CustomLink";

export const List = styled.ul`
  list-style: none;
  display: flex;
  cursor: default;
  li {
    padding-right: 1rem;
  }
`;

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <List>
          {pages.map((page) => (
            <CustomLink key={page.route} to={page.route}>
              {" "}
              {page.label}
            </CustomLink>
          ))}
        </List>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
