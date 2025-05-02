import pointsData from "./coords.json";
import pathsData from "./paths.json";

interface Point {
    id: number;
    lat: number;
    lon: number;
}

interface Path {
    id: number;
    point_id1: number;
    point_id2: number;
    dist: number;
}

const points: Point[] = pointsData;
const paths: Path[] = pathsData;

/* const startPoint;
const endPoint; */