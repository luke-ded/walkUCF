import PriorityQueue from 'js-priority-queue';
import pointsData from "./coords.json";
import pathsData from "./paths.json";

interface Point 
{
    id: number;
    lat: number;
    lon: number;
}

interface Path 
{
    id: number;
    point_id1: number;
    point_id2: number;
    dist: number;
}

interface GraphEdge {
    node: number;
    distance: number;
}

// Refined Graph interface using Map
interface GraphMap extends Map<number, GraphEdge[]> {}

/* const startPoint;
const endPoint; */

export function createGraph()
{
    // Change these to arguments
    const points: Point[] = pointsData;
    const paths: Path[] = pathsData;

    const graph : GraphMap = new Map();

    points.forEach(point => 
    {
        if(!graph.has(point.id))
            graph.set(point.id, []);
    });

    paths.forEach(path =>
    {
        if(graph.has(path.point_id1) && graph.has(path.point_id2))
        {
            graph.get(path.point_id1)!.push({node: path.point_id2, distance: path.dist});
            graph.get(path.point_id2)!.push({node: path.point_id1, distance: path.dist});
        }
        else
            console.error("Path ID " + path.id + " contains an invalid point in createGraph.\n");
    });

    return graph;
}

