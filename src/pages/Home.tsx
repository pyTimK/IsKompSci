import Layout from "../components/Layout";
import useToggle from "../hooks/useToggle";
import React from "react";
import MainWrapper from "./main/MainWrapper";
import { useContext } from "react";
import { HasIntroDataContext } from "../RoutesWrapper";

export const EditModeContext = React.createContext<[boolean, () => void] | null>(null);
const EditModeProvider = EditModeContext.Provider;

const Home: React.FC = () => {
  const [editMode, toggleEditMode] = useToggle();
  const hasIntroData = useContext(HasIntroDataContext);

  return (
    <div className='home-page-vars'>
      <EditModeProvider value={[editMode, toggleEditMode]}>
        <Layout hasIntroData={hasIntroData}>
          <MainWrapper />
        </Layout>
      </EditModeProvider>
    </div>
  );
};

export default Home;
