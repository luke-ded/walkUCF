import pointsData from "../json_files/coords.json";

interface Point 
{
    id: number;
    lat: number;
    lon: number;
}

// via https://tinyurl.com/3yvuz6zs
function haversine(lat1 : number, lon1 : number,
    lat2 : number, lon2 : number)
{
    // Distance between latitudes and longitudes
    var dLat = (lat2 - lat1) * Math.PI / 180.0;
    var dLon = (lon2 - lon1) * Math.PI / 180.0;

    // Convert to radians
    lat1 = (lat1) * Math.PI / 180.0;
    lat2 = (lat2) * Math.PI / 180.0;

    // Apply formulae
    var a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) 
    * Math.cos(lat1) * Math.cos(lat2);
    var rad = 6371;
    var c = 2 * Math.asin(Math.sqrt(a));

    return Math.abs(rad * c);
}

export function nearestPoint(currentLoc: any) : Point
{
    const points: Point[] = pointsData;
    var closestPoint : Point = {id: -1, lat: -1, lon: -1};
    var closestDist : number = Infinity;

    points.forEach((point) =>
    {
        var dist = haversine(currentLoc[0], currentLoc[1], point.lat, point.lon);
        if(dist < closestDist)
        {
            closestDist = dist;
            closestPoint = point;
        }
    });

    return closestPoint;
}