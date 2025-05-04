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

interface GraphEdge
{
    node: number;
    distance: number;
}

interface QItem
{
    pointID: number;
    distance:number;
}

interface Result
{
    distances: Map<number, number>;
    path: number[];
}

// Refined Graph interface using Map
interface GraphMap extends Map<number, GraphEdge[]> {}

/* const startPoint;
const endPoint; */

export function createGraph() : GraphMap
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
        {
            console.error("Path ID " + path.id + " contains an invalid point in createGraph.\n");
            console.error("point1: " + path.point_id1 + ", point2: " + path.point_id2);
            return graph;
        }
    });

    return graph;
}

export function dijkstra (graph : GraphMap, startID : number, endID : number) : Result
{
    // <nodeID, distance from start node>
    const distances : Map<number, number> = new Map();
    // <nodeID, predecessor nodeID>
    const previous : Map<number, number | null> = new Map();

    // Error check
    if(!graph.has(startID))
    {
        console.error("Invalid start node ID " + startID);
        return {distances: new Map(), path: []};
    }
    else if(!graph.has(endID))
    {
        console.error("Invalid end node ID " + endID);
        return {distances: new Map(), path: []};
    }

    // Initialize values
    for(var pointID of graph.keys())
    {
        distances.set(pointID, Infinity);
        previous.set(pointID, null);
    }
    // change to infinity?
    distances.set(startID, 0);
    previous.set(startID, null);


    var pQueue = new PriorityQueue<QItem>({ comparator: function(a: QItem, b: QItem) { return a.distance - b.distance; }});

    pQueue.queue({pointID: startID, distance: 0});

    // Run algorithm
    while(pQueue.length > 0)
    {
        var curItem: QItem = pQueue.dequeue();
        var curID = curItem.pointID;
        var curDistance = curItem.distance;

        // Add optimization here?
        if(curDistance > distances.get(curID)!)
            continue;

        if(endID !== null && curID === endID)
            break;

        var adjs = graph.get(curID) || [];

        for(var edge of adjs)
        {
            var adjID = edge.node;
            var distance = edge.distance;

            var altDistance = curDistance + distance;
            if(altDistance < distances.get(adjID)!)
            {
                distances.set(adjID, altDistance);
                previous.set(adjID, curID);

                pQueue.queue({pointID: adjID, distance: altDistance});
            }
        }
    }

    // Path reconstruction
    if(distances.get(endID)! == Infinity)
    {
        console.error("End node " + endID + "unreachable from start node " + startID);
        return {distances: new Map(), path: []};
    }

    curID = endID;

    var path: number[] = [];
    while(curID != null)
    {
        path.push(curID);
        curID = previous.get(curID)!;
    }

    path = path.reverse();

    return {distances, path};
}