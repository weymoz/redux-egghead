import React from "react";
import FilterLink from "./FilterLink";

const Footer = ({ store }) => (
  <>
    {"Show: "}
    <FilterLink filter="all">All</FilterLink>{" "}
    <FilterLink filter="active">Active</FilterLink>{" "}
    <FilterLink filter="completed">Completed</FilterLink>
  </>
);

export default Footer;
