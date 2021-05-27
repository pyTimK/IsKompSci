import React, { useEffect, useState } from "react";
import ReactFlow, { useStoreState, Controls, Background, useZoomPanHelper, useStore } from "react-flow-renderer";

const onLoad = (reactFlowInstance) => {
  setTimeout(reactFlowInstance.fitView, 0);
};

const OverviewFlow = ({ graphElements }) => {
  const [elements, setElements] = useState(graphElements);
  const transformState = useStoreState((store) => store.transform);
  const { transform } = useZoomPanHelper();
  const onMoveStart = (flowTransform) => {
    transform({ x: transformState[0], y: transformState[1], zoom: transformState[2] });
  };

  useEffect(() => {}, []);

  return (
    <ReactFlow
      nodesConnectable={false}
      nodesDraggable={false}
      elements={elements}
      onLoad={onLoad}
      onMoveStart={onMoveStart}
      selectNodesOnDrag={false}
      minZoom={0.3}
      elementsSelectable={false}
      //
    >
      <Controls showInteractive={false} />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default OverviewFlow;
