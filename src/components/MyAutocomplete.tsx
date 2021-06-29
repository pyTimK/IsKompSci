/* eslint-disable no-use-before-define */
import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { fade, InputBase, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useContext } from "react";
import { DataContext } from "../App";

const SearchBar: React.FC = () => {
  const c = useStyles();
  const data = useContext(DataContext);
  const courses = data.courseData.courses;
  return (
    <Autocomplete
      id='highlights-demo'
      classes={{
        inputRoot: c.searchInputRoot,
        input: c.searchInputInput,
        root: c.search,
        popper: c.popper,
        paper: c.paper,
        popupIndicator: c.popupIndicator,
        clearIndicator: c.clearIndicator,
      }}
      options={courses}
      getOptionLabel={(course) => course.displaySearch}
      renderInput={(params) => {
        const { InputLabelProps, InputProps, ...rest } = params;
        return (
          <div>
            <div className={c.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase {...params.InputProps} {...rest} placeholder='Search…' />
          </div>
        );
      }}
      renderOption={(course, { inputValue }) => {
        const matches = match(course.displaySearch, inputValue);
        const parts = parse(course.displaySearch, matches);

        return (
          <div className={c.searchTextWrapper}>
            {parts.map((part, index) => (
              <span key={index} className={c.searchText} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                {part.text}
              </span>
            ))}
          </div>
        );
      }}
      onChange={(e, newValue) => {
        return;
      }}
    />
  );
};

const useStyles = makeStyles((theme) => {
  return {
    searchTextWrapper: {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      color: "var(--darkergray)",
    },
    searchText: {},
    paper: {
      backgroundColor: "white",
    },
    popper: {
      backgroundColor: "transparent",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: "0 !important",
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "auto !important",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
    },
    popupIndicator: {
      color: "white",
    },
    clearIndicator: {
      color: "white",
    },
    searchInputRoot: {
      color: "inherit",
    },
    searchInputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px) !important`,
      transition: theme.transitions.create("width"),
      width: "100% !important",
      [theme.breakpoints.up("md")]: {
        width: "30ch !important",
      },
      color: "white !important",
    },
  };
});

export default SearchBar;
