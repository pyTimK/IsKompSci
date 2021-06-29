import { makeStyles } from "@material-ui/core";
import { motion, useAnimation } from "framer-motion";
import React from "react";

const CrossFadeTransition: React.FC = ({ children }) => {
  const c = useStyles();
  const divFullScreenAnimate = useAnimation();

  const exitAnimate = async (
    status: string,
    divRef: React.RefObject<HTMLButtonElement> | React.MutableRefObject<HTMLDivElement | null>
  ) => {
    if (divRef.current === null) {
      divFullScreenAnimate?.set({
        y: document.documentElement.clientHeight,
        width: window.screen.width,
        height: document.documentElement.clientHeight,
        backgroundColor: `var(--${status}Color)`,
      });
    } else {
      const domRect = divRef.current.getBoundingClientRect();
      divFullScreenAnimate?.set({
        x: domRect.x,
        y: domRect.y,
        width: domRect.width,
        height: domRect.height,
        backgroundColor: `var(--${status}Color)`,
      });
    }
    await divFullScreenAnimate?.start({
      opacity: 1,
      x: 0,
      y: 0,
      width: window.screen.width,
      height: document.documentElement.clientHeight,

      backgroundColor: "var(--materialgreen)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    });
  };

  return (
    <CrossFadeTransitionProvider value={{ exitAnimate }}>
      <motion.div className={c.divFullScreen} animate={divFullScreenAnimate}></motion.div>
      {children}
    </CrossFadeTransitionProvider>
  );
};

export const CrossFadeTransitionContext = React.createContext<{
  exitAnimate: (
    status: string,
    divRef: React.RefObject<HTMLButtonElement> | React.MutableRefObject<HTMLDivElement | null>
  ) => Promise<void>;
} | null>(null);
const CrossFadeTransitionProvider = CrossFadeTransitionContext.Provider;

const useStyles = makeStyles((theme) => ({
  divFullScreen: {
    position: "fixed",
    zIndex: 1101,
    backgroundColor: "var(--green)",
    opacity: 0,
  },
}));

export default CrossFadeTransition;
