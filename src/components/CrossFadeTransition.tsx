import { makeStyles } from "@material-ui/core";
import { motion, useAnimation } from "framer-motion";
import React from "react";
import { statusToColor } from "../interfaces/Status";

interface PositionDimension {
  x: number;
  y: number;
  width: number;
  height: number;
}

type ExitAnimate = (predicate: {
  initialColor?: string;
  finalColor?: string;
  initialPosition?:
    | React.RefObject<HTMLButtonElement>
    | React.MutableRefObject<HTMLDivElement | null>
    | PositionDimension;
}) => Promise<void>;

const CrossFadeTransition: React.FC = ({ children }) => {
  const c = useStyles();
  const divFullScreenAnimate = useAnimation();

  const exitAnimate: ExitAnimate = async ({
    initialColor = statusToColor("taken"),
    finalColor = "var(--materialgreen)",
    initialPosition,
  }) => {
    divFullScreenAnimate?.set({ backgroundColor: initialColor });
    divFullScreenAnimate?.set(
      !initialPosition
        ? slideUpProperties
        : isPositionDimension(initialPosition)
        ? initialPosition
        : !initialPosition.current
        ? slideUpProperties
        : domRectToPositionAndDimenstion(initialPosition.current.getBoundingClientRect())
    );

    await divFullScreenAnimate?.start({
      opacity: 1,
      x: 0,
      y: 0,
      width: window.screen.width,
      height: document.documentElement.clientHeight,

      backgroundColor: finalColor,
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
  /**
   *  Defaults to Slide Up transition if no provided `initialPosition`
   */
  exitAnimate: ExitAnimate;
} | null>(null);
const CrossFadeTransitionProvider = CrossFadeTransitionContext.Provider;

const isPositionDimension = (
  initialPosition:
    | React.RefObject<HTMLButtonElement>
    | React.MutableRefObject<HTMLDivElement | null>
    | PositionDimension
): initialPosition is PositionDimension => (initialPosition as PositionDimension).x !== undefined;

const slideUpProperties = {
  y: document.documentElement.clientHeight,
  width: window.screen.width,
  height: document.documentElement.clientHeight,
};

const domRectToPositionAndDimenstion = (domRect: DOMRect): PositionDimension => {
  return {
    x: domRect.x,
    y: domRect.y,
    width: domRect.width,
    height: domRect.height,
  };
};

const useStyles = makeStyles((theme) => ({
  divFullScreen: {
    position: "fixed",
    zIndex: 1101,
    backgroundColor: "var(--green)",
    opacity: 0,
  },
}));

export default CrossFadeTransition;
