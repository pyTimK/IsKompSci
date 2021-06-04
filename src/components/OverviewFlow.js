import React, { useContext, useRef } from "react";
import ReactFlow, { useStoreState, Controls, useZoomPanHelper } from "react-flow-renderer";
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
  const { transform } = useZoomPanHelper();
  const onMoveStart = (flowTransform) => {
    transform({ x: transformState[0], y: transformState[1], zoom: transformState[2] });
  };

  const exitAnimate = async ({ node }) => {
    if (node === null || node.data === null || node.data.status === null) return;
    if (divRef.current === null) {
      divFullScreenAnimate.set({
        y: window.screen.height,
        width: window.screen.width,
        height: window.screen.height,
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
      // nodeTypes={{ special: CustomGraphNode }}
      onNodeDragStop={(e, node) => {
        console.log(node);
        const savedGraphPositions = getFromLocalStorage("graphPositions");
        savedGraphPositions[node.id] = node.position;
        setFromLocalStorage("graphPositions", savedGraphPositions);
      }}
      selectNodesOnDrag={false}
      minZoom={0.3}
      // elementsSelectable={false}
      onSelectionChange={(elements) => {
        if ([null, [], undefined].includes(elements)) return;
        const node = elements[0];
        const subject = encodeURIComponent(node.id);
        exitAnimate({ node }).then(() => history.push(`/course/${subject}`));
      }}
      onTouchStart={(e) => (divRef.current = e.target)}
      arrowHeadColor="black"
      snapToGrid={true}
      snapGrid={[10, 10]}>
      {!editMode && <Controls showInteractive={false} />}
      {/* <Background color="black" gap={10} /> */}
    </ReactFlow>
  );
};

export default OverviewFlow;
