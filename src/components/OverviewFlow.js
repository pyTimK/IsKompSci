import React, { useContext } from "react";
import ReactFlow, { useStoreState, Controls, useZoomPanHelper } from "react-flow-renderer";
import CoursesDataContext from "../contexts/CoursesDataContext";
import getFromLocalStorage from "../functions/getFromLocalStorage";
import setFromLocalStorage from "../functions/setFromLocalStorage";

const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

const OverviewFlow = ({ editMode }) => {
  const data = useContext(CoursesDataContext);
  const graphElements = data.graphElements || [];
  // const [rfInstance, setRfInstance] = useState(null);
  const transformState = useStoreState((store) => store.transform);
  const { transform } = useZoomPanHelper();
  const onMoveStart = (flowTransform) => {
    transform({ x: transformState[0], y: transformState[1], zoom: transformState[2] });
  };
  // const onNodeDragStop(e, node)

  return (
    <ReactFlow
      nodesConnectable={false}
      nodesDraggable={editMode}
      elements={graphElements}
      onLoad={onLoad}
      onMoveStart={onMoveStart}
      onNodeDragStop={(e, node) => {
        //
        console.log(node);
        const savedGraphPositions = getFromLocalStorage("graphPositions");
        savedGraphPositions[node.id] = node.position;
        setFromLocalStorage("graphPositions", savedGraphPositions);
      }}
      selectNodesOnDrag={false}
      minZoom={0.3}
      elementsSelectable={false}
      arrowHeadColor="black"
      snapToGrid={true}
      snapGrid={[10, 10]}

      //
    >
      {!editMode && <Controls showInteractive={false} />}
      {/* <Background color="black" gap={10} /> */}
    </ReactFlow>
  );
};

export default OverviewFlow;
