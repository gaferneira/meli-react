import i18n from "@/core/i18n";
import { pages } from "@/ui";
import { AppBar, Toolbar } from "@mui/material";
import { ChangeEvent, useState } from "react";
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

const languages = [
  { value: "", text: "Options" },
  { value: "en", text: "English" },
  { value: "es", text: "Spanish" },
];

const Navbar: React.FC = () => {
  const [lang, setLang] = useState("");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLang(value);
    i18n.changeLanguage(e.target.value);
  };

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
        <select value={lang} onChange={handleChange}>
          {languages.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.text}
              </option>
            );
          })}
        </select>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
