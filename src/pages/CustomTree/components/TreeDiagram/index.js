import React, { useEffect, useRef } from "react";
import { ReactDiagram } from "gojs-react";
import * as go from "gojs";

function TreeDiagram(props) {
  const {
    nodeDataArray,
    linkDataArray,
    handleModelChange,
    handleDiagramEvent,
    initDiagram,
    // modelData
  } = props;

  const diagramRef = useRef();

  useEffect(() => {
    if (!diagramRef.current) return;
    const diagram = diagramRef.current.getDiagram();
    if (diagram instanceof go.Diagram) {
      diagram.addDiagramListener("ChangedSelection", props.handleDiagramEvent);
    }
    return () => {
      if (!diagramRef.current) return;
      const diagram = diagramRef.current.getDiagram();
      if (diagram instanceof go.Diagram) {
        diagram.removeDiagramListener("ChangedSelection", props.handleDiagramEvent);
      }
    };
  }, []);

  return (
    <React.Fragment>
      <ReactDiagram
        ref={diagramRef}
        divClassName="myDiagramDiv"
        initDiagram={initDiagram}
        nodeDataArray={nodeDataArray}
        linkDataArray={linkDataArray}
        onModelChange={handleModelChange}
        onDiagramEvent={handleDiagramEvent}
      />
    </React.Fragment>
  );
}

export default TreeDiagram;
