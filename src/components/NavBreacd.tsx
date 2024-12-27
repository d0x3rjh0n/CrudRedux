import { Box, Square } from "@chakra-ui/react";
import { BreadcrumbLink, BreadcrumbRoot } from "./ui/breadcrumb";
import { SlHome } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";
import { MdAssignmentAdd } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";

const NavBreacd = () => {
  const location = useLocation();
  return (
    <Box lg={{ display: "block" }} display={"none"}>
      <BreadcrumbRoot variant={"underline"} style={{ listStyleType: "none" }}>
        <BreadcrumbLink asChild>
          <Link to={"/"}>
            {" "}
            <Square gap={"2"}>
              {" "}
              <SlHome /> Home{" "}
            </Square>
          </Link>
        </BreadcrumbLink>
        {location.pathname === "/newClient" ||
        location.pathname === "/newProject" ? (
          <>
            <BreadcrumbLink
              asChild
              display={location.pathname === "/newClient" ? "block" : "none"}
            >
              <Link to={"/newClient"}>
                {" "}
                <Square gap={"2"}>
                  {" "}
                  <IoPersonAddOutline size={"1.1em"} /> New Client{" "}
                </Square>
              </Link>
            </BreadcrumbLink>
            <BreadcrumbLink
              asChild
              display={location.pathname === "/newProject" ? "block" : "none"}
            >
              <Link to={"/newProject"}>
                {" "}
                <Square gap={"2"}>
                  {" "}
                  <MdAssignmentAdd size={"1.1em"} /> New Project{" "}
                </Square>
              </Link>
            </BreadcrumbLink>
          </>
        ) : null}
      </BreadcrumbRoot>
    </Box>
  );
};

export default NavBreacd;
