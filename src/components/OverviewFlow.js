import React, { useContext, useRef } from "react";
import ReactFlow, { useStoreState, Controls, useZoomPanHelper, useStoreActions } from "react-flow-renderer";
import { useHistory } from "react-router";
import CoursesDataContext from "../contexts/CoursesDataContext";
import CrossFadePageContext from "../contexts/CrossFadePageContext";
import getFromLocalStorage from "../functions/getFromLocalStorage";
import setFromLocalStorage from "../functions/setFromLocalStorage";

const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

const OverviewFlow = ({ editMode }) => {
  const data = useContext(CoursesDataContext);
  const divFullScreenAnimate = useContext(CrossFadePageContext);
  const divRef = useRef();
  const history = useHistory();
  const graphElements = data.graphElements || [];
  const transformState = useStoreState((store) => store.transform);
  const setSelectedElements = useStoreActions((actions) => actions.setSelectedElements);
  const { transform } = useZoomPanHelper();
  const initialTapPosition = useRef([0, 0]);
  const initialTransformState = useRef([0, 0]);
  const isMouseDown = useRef(false);
  const numMoves = useRef(0);
  const onMoveStart = (flowTransform) => {
    if (numMoves.current > 2) return;
    transform({ x: transformState[0], y: transformState[1], zoom: transformState[2] });
    numMoves.current++;
  };

  const exitAnimate = async ({ node }) => {
    if (![node, node.data, node.data.status].every((e) => ![null, undefined].includes(e))) return;
    if (divRef.current === null) {
      divFullScreenAnimate.set({
        y: document.documentElement.clientHeight,
        width: window.screen.width,
        height: document.documentElement.clientHeight,
        // opacity: 0,
        backgroundColor: `var(--${node.data.status}Color)`,
      });
    } else {
      const domRect = divRef.current.getBoundingClientRect();
      divFullScreenAnimate.set({
        x: domRect.x,
        y: domRect.y,
        width: domRect.width,
        height: domRect.height,
        backgroundColor: `var(--${node.data.status}Color)`,
      });
    }

    await divFullScreenAnimate.start({
      opacity: 1,
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,

      backgroundColor: "var(--materialgreen)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    });
  };

  return (
    <ReactFlow
      nodesConnectable={false}
      nodesDraggable={editMode}
      elements={graphElements}
      onLoad={onLoad}
      onMoveStart={onMoveStart}
      onNodeDragStop={(e, node) => {
        const savedGraphPositions = getFromLocalStorage("graphPositions");
        savedGraphPositions[node.id] = node.position;
        setFromLocalStorage("graphPositions", savedGraphPositions);
      }}
      minZoom={0.3}
      selectNodesOnDrag={false}
      onSelectionChange={(elements) => {
        if (editMode) return;
        // console.log("ON SELECTION CHANGE,", elements, divRef.current);
        if (![null, [], undefined].includes(elements) && [null, undefined].includes(divRef.current)) {
          setSelectedElements([]);
        }
        if ([null, [], undefined].includes(elements) || [null, undefined].includes(divRef.current)) return;
        const node = elements[0];
        const subject = encodeURIComponent(node.id);
        exitAnimate({ node }).then(() => history.push(`/course/${subject}`));
      }}
      onMouseDown={(e) => {
        if (editMode) return;
        isMouseDown.current = true;
        divRef.current = e.target;
        initialTapPosition.current = [e.clientX, e.clientY];
        initialTransformState.current = [transformState[0], transformState[1]];
      }}
      onMouseMove={(e) => {
        if (editMode) return;
        if (!isMouseDown.current) return;

        divRef.current = null;
        const dx = e.clientX - initialTapPosition.current[0];
        const dy = e.clientY - initialTapPosition.current[1];
        transform({
          x: initialTransformState.current[0] + dx,
          y: initialTransformState.current[1] + dy,
          zoom: transformState[2],
        });
      }}
      onMouseUp={(e) => {
        if (editMode) return;
        isMouseDown.current = false;
      }}
      onTouchStart={(e) => {
        if (editMode) return;
        divRef.current = e.target;
        const evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
        const touch = evt.touches[0] || evt.changedTouches[0];
        initialTapPosition.current = [touch.pageX, touch.pageY];
        initialTransformState.current = [transformState[0], transformState[1]];
      }}
      onTouchMove={(e) => {
        if (editMode) return;
        const evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
        const touch = evt.touches[0] || evt.changedTouches[0];
        const dx = touch.pageX - initialTapPosition.current[0];
        const dy = touch.pageY - initialTapPosition.current[1];
        transform({
          x: initialTransformState.current[0] + dx,
          y: initialTransformState.current[1] + dy,
          zoom: transformState[2],
        });
      }}
      arrowHeadColor="black"
      snapToGrid={true}
      snapGrid={[10, 10]}>
      {!editMode && (
        <Controls
          showZoom={false}
          showInteractive={false}
          style={{ top: "10px", bottom: "auto", right: "10px", left: "auto" }}
        />
      )}
      {/* <Background color="black" gap={10} /> */}
    </ReactFlow>
  );
};

export default OverviewFlow;
