import React from "react";
import ReactFlow, { useStoreState, Controls, useZoomPanHelper } from "react-flow-renderer";

const onLoad = (reactFlowInstance) => {
  setTimeout(reactFlowInstance.fitView, 0);
};

const OverviewFlow = ({ graphElements }) => {
  const transformState = useStoreState((store) => store.transform);
  const { transform } = useZoomPanHelper();
  const onMoveStart = (flowTransform) => {
    transform({ x: transformState[0], y: transformState[1], zoom: transformState[2] });
  };

  return (
    <ReactFlow
      nodesConnectable={false}
      nodesDraggable={false}
      elements={graphElements}
      onLoad={onLoad}
      onMoveStart={onMoveStart}
      selectNodesOnDrag={false}
      minZoom={0.3}
      elementsSelectable={false}
      arrowHeadColor="black"

      //
    >
      <Controls showInteractive={false} />
    </ReactFlow>
  );
};

export default OverviewFlow;
