import { Link, useMatch, useResolvedPath } from "react-router-dom";
import styled from "styled-components";

export const ListItem = styled.li`
  a {
    color: white;
    font-weight: bold;
    &.active {
      color: #21aeb4;
    }
  }
`;

interface Route {
  to: string;
  children: React.ReactNode;
}

function CustomLink(props: Route) {
  const resolvedPath = useResolvedPath(props.to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <ListItem>
      <Link
        to={props.to}
        className={`${isActive ? "active" : "inactive"}`}
      >
        {props.children}
      </Link>
    </ListItem>
  );
}
export default CustomLink;
