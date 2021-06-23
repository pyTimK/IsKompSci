import { makeStyles } from "@material-ui/core";
import { Route, Switch } from "react-router";
import MainPage1 from "./MainPage1";
import MainPage2 from "./MainPage2";

const MainWrapper = ({ editMode }) => {
  const c = useStyles();
  return (
    <div className={c.root}>
      <Switch>
        <Route path='/main2'>
          <MainPage2 editMode={editMode} />
        </Route>
        <Route path='/'>
          <MainPage1 editMode={editMode} />
        </Route>
      </Switch>
    </div>
  );
};
const useStyles = makeStyles((theme) => {
  return {
    root: {
      paddingTop: "calc(var(--tabsHeight))",
    },
  };
});

export default MainWrapper;
