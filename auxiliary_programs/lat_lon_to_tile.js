function latLngToTile(lat, lng, zoom) {
  const latRad = lat * Math.PI / 180;
  const n = Math.pow(2, zoom);

  return {
    x: Math.floor((lng + 180) / 360 * n),
    y: Math.floor(
      (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n
    )
  };
}

latLngToTile(28.601681, -81.200679, 17)