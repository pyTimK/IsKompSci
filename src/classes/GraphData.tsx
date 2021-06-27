import { LocalStorageHelper } from "./LocalStorageHelper";
import { Course } from "./Course";
import { Edge, Elements, Node } from "react-flow-renderer";
import { NodeData } from "../interfaces/NodeData";

export type GraphPositions = { [subject: string]: { x: number; y: number } };

export class GraphData {
  public positions: GraphPositions;
  public elements: Elements;

  constructor(courses: Course[]) {
    this.positions = this.initializePositions();
    this.elements = this.initializeGraphElements(courses);
  }

  private initializePositions() {
    let savedGraphPositions = LocalStorageHelper.get<GraphPositions>("graphPositions", {});
    if (Object.keys(savedGraphPositions).length !== 0) return savedGraphPositions;
    return this.originalGraphPositions;
  }

  get originalGraphPositions() {
    const originalGraphPositionsData: GraphData = require("../data/initial-graph-positions.json");
    const originalGraphPositions = originalGraphPositionsData.positions;
    LocalStorageHelper.set("graphPositions", originalGraphPositions);
    return originalGraphPositions;
  }

  resetGraphPositions() {
    this.positions = this.originalGraphPositions;
  }

  private initializeGraphElements(courses: Course[]) {
    const taken = LocalStorageHelper.get<string[]>("taken", []);
    const taking = LocalStorageHelper.get<string[]>("taking", []);

    // ? set true for AUTO GRAPH BETA
    const autoGraph = false;

    const hasSavedGraph = this.positions !== {};
    // if ([taken, taking].some((r) => ([null, undefined] as Array<null | undefined | string[]>).includes(r))) return [];

    const semSequence = ["1Y-1S", "1Y-2S", "2Y-1S", "2Y-2S", "3Y-1S", "3Y-2S", "3Y-MS", "4Y-1S", "4Y-2S", "PE", "NSTP"];
    const semCounts = new Array<number>(semSequence.length).fill(0);

    //* ADD Course Nodes
    const graphElements: Elements = courses
      .map((course) => {
        let semIndex = semSequence.findIndex((sem) => sem === course.offered);
        let position: { x: number; y: number };
        if (!autoGraph && hasSavedGraph) {
          position = this.positions[course.subject];
        } else {
          semCounts[semIndex]++;
          position = { x: 120 * (semCounts[semIndex] - 1), y: 100 * semIndex };
        }
        const className = taken.includes(course.subject)
          ? "taken"
          : taking.includes(course.subject)
          ? "taking"
          : "not-taken";

        const nodeData: NodeData = {
          label: <>{course.subject}</>,
          status: className,
        };

        return {
          id: course.subject,
          className: className,
          // type: "special",
          type: course.prerequisites === "" ? "input" : "default",
          data: nodeData,
          position: position,
        } as Node<NodeData>;
      })
      .filter((course) => !["PE", "NSTP"].includes(course.id));

    //* ADD Edges
    courses.forEach((course) => {
      if (["PE", "NSTP"].includes(course.subject)) return;
      let prereqs = course.prerequisites === "" ? [] : course.prerequisites.split(", ");
      prereqs.forEach((prereq) => {
        graphElements.push({
          id: `e${prereq}-${course.subject}`,
          source: prereq,
          target: course.subject,
          // arrowHeadType: "arrowclosed",
          animated: true,
        } as Edge);
      });
    });

    return graphElements;
  }
}
