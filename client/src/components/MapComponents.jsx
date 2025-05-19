import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Fix Leaflet marker icon paths
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function MapComponent() {
  const [location, setLocation] = useState([28.6139, 77.2090]); // Default: Delhi

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.error(err);
        alert("Location access is required for map tracking.");
      }
    );
  }, []);

  return (
    <Box sx={{ width: "100%", height: 400, borderRadius: 2, overflow: "hidden", boxShadow: 3, my: 4 }}>
      <Typography variant="h6" sx={{ mb: 1, px: 2 }}>
        Your Current Location
      </Typography>
      <MapContainer center={location} zoom={13} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={location}>
          <Popup>You are here</Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
}
