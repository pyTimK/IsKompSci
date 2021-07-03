import { makeStyles } from "@material-ui/core";
import { motion, useAnimation } from "framer-motion";
import React from "react";
import { statusToColor } from "../interfaces/Status";

export interface PositionDimension {
  x: number;
  y: number;
  width: number;
  height: number;
}

type ExitAnimate = (predicate: {
  initialColor?: string;
  finalColor?: string;
  copyDivRefPosition?: React.RefObject<HTMLButtonElement> | React.MutableRefObject<HTMLDivElement | null>;
  initialPosition?: PositionDimension;
  /**
   * Defaults to `0.3`.
   */
  duration?: number;
}) => Promise<void>;

const CrossFadeTransition: React.FC = ({ children }) => {
  const c = useStyles();
  const divFullScreenAnimate = useAnimation();

  const exitAnimate: ExitAnimate = async ({
    initialColor = statusToColor("taken"),
    finalColor = "var(--materialgreen)",
    copyDivRefPosition,
    initialPosition,
    duration = 0.3,
  }) => {
    divFullScreenAnimate?.set({ backgroundColor: initialColor, display: "block" });
    divFullScreenAnimate?.set(
      initialPosition
        ? initialPosition
        : copyDivRefPosition && copyDivRefPosition.current
        ? domRectToPositionAndDimenstion(copyDivRefPosition.current.getBoundingClientRect())
        : slideUpProperties
    );

    await divFullScreenAnimate?.start({
      opacity: 1,
      x: 0,
      y: 0,
      width: window.screen.width,
      height: document.documentElement.clientHeight,

      backgroundColor: finalColor,
      transition: {
        duration: duration,
        ease: "easeOut",
      },
    });
    divFullScreenAnimate?.set({ display: "none" });
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

const slideUpProperties = {
  y: document.documentElement.clientHeight,
  width: window.screen.width,
  height: document.documentElement.clientHeight,
};

const domRectToPositionAndDimenstion = (domRect: DOMRect) => {
  return {
    x: domRect.x,
    y: domRect.y,
    width: domRect.width,
    height: domRect.height,
  };
};

const useStyles = makeStyles((theme) => {
  return {
    divFullScreen: {
      display: "none",
      position: "fixed",
      zIndex: 1101,
      opacity: 0,
    },
  };
});

export default CrossFadeTransition;
