/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { fade, InputBase, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useContext } from "react";
import { DataContext } from "../App";
import { CrossFadeTransitionContext } from "./CrossFadeTransition";
import { useHistory } from "react-router-dom";
import { Course } from "../classes/Course";

const sortCourses = (courses: Course[], input: string) => {
  if (input === "") return courses;
  const coursesStartsWithInput: Course[] = [];
  const coursesLeft: Course[] = [];
  courses.forEach((course) => {
    if (course.subject.toLowerCase().startsWith(input.toLowerCase())) {
      coursesStartsWithInput.push(course);
    } else {
      coursesLeft.push(course);
    }
  });
  return [...coursesStartsWithInput, ...coursesLeft];
};

const SearchBar: React.FC = () => {
  const c = useStyles();
  const history = useHistory();
  const crossFadeTransition = useContext(CrossFadeTransitionContext);
  const data = useContext(DataContext);
  const courses = data.courseData.courses;
  const [input, setInput] = useState("");
  const [sortedCourses, setSortedCourses] = useState(sortCourses(courses, input));

  useEffect(() => {
    setSortedCourses(sortCourses(courses, input));
  }, [courses, input]);

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
      options={sortedCourses}
      getOptionLabel={(course) => course.displaySearch}
      renderInput={(params) => {
        const { InputLabelProps, InputProps, ...rest } = params;
        return (
          <div>
            <div className={c.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase {...InputProps} {...rest} placeholder='Search…' />
          </div>
        );
      }}
      onInputChange={(e, input) => {
        setInput(input);
      }}
      renderOption={(course, { inputValue }) => {
        const matches = match(course.displaySearch, inputValue);
        const parts = parse(course.displaySearch, matches);

        return (
          <div className={c.optionTextWrapper}>
            {parts.map((part, index) => (
              <span key={index} className={c.optionText} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                {part.text}
              </span>
            ))}
          </div>
        );
      }}
      onChange={(e, newValue) => {
        if (!newValue) return;
        const encodedSubject = encodeURIComponent(newValue.subject);
        crossFadeTransition?.exitAnimate({}).then(() => history.push(`/course/${encodedSubject}`));
      }}
    />
  );
};

const useStyles = makeStyles((theme) => {
  return {
    optionTextWrapper: {
      // textOverflow: "ellipsis",
      // whiteSpace: "nowrap",
      // overflow: "hidden",
      color: "var(--darkergray)",
    },
    optionText: {
      fontSize: "0.9rem",
      letterSpacing: 0,
    },
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
