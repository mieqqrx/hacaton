"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface MapPickerProps {
    onSelect: (address: string) => void;
    onClose: () => void;
}

export default function MapPicker({ onSelect, onClose }: MapPickerProps) {
    const [position, setPosition] = useState<L.LatLng | null>(null);
    const [address, setAddress] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const mykolaivCenter: [number, number] = [46.9750, 31.9946];

    const LocationMarker = () => {
        useMapEvents({
            click: async (e) => {
                setPosition(e.latlng);
                setIsLoading(true);
                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}&zoom=18&addressdetails=1&accept-language=uk`
                    );
                    const data = await res.json();

                    if (data && data.address) {
                        const street = data.address.road || data.address.pedestrian || data.address.residential || "";
                        const houseNumber = data.address.house_number || data.address.building || "";
                        const city = data.address.city || data.address.town || "Миколаїв";

                        if (street) {
                            setAddress(`${street}${houseNumber ? `, ${houseNumber}` : ""}, ${city}`);
                        } else {
                            setAddress(data.display_name || "Адресу не знайдено");
                        }
                    } else {
                        setAddress(`Координати: ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`);
                    }
                } catch (error) {
                    setAddress(`Помилка мережі. Координати: ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`);
                } finally {
                    setIsLoading(false);
                }
            },
        });

        return position === null ? null : <Marker position={position} icon={icon}></Marker>;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col h-[85vh]">
                <div className="p-4 border-b flex justify-between items-center bg-slate-50">
                    <div>
                        <h3 className="font-bold text-lg text-slate-800">Оберіть точку на карті Миколаєва</h3>
                        <p className="text-xs text-slate-500 mt-1">Клікайте точно на будівлю, щоб визначити її номер</p>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-red-500 font-bold p-2 text-xl leading-none">
                        ✕
                    </button>
                </div>

                <div className="flex-1 relative z-0">
                    <MapContainer center={mykolaivCenter} zoom={13} className="w-full h-full">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker />
                    </MapContainer>
                </div>

                <div className="p-4 border-t bg-slate-50 flex flex-col sm:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="text-sm text-slate-600 font-medium mb-1 block">
                            Уточніть адресу (якщо номер будинку не визначився):
                        </label>
                        <input
                            type="text"
                            value={isLoading ? "Визначаємо адресу..." : address}
                            onChange={(e) => setAddress(e.target.value)}
                            disabled={isLoading || !position}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100 disabled:text-gray-500"
                            placeholder="Натисніть на карту, щоб отримати адресу"
                        />
                    </div>

                    <button
                        type="button"
                        disabled={!position || isLoading}
                        onClick={() => {
                            onSelect(address);
                            onClose();
                        }}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-2.5 rounded-lg font-bold transition-colors h-[42px]"
                    >
                        Підтвердити
                    </button>
                </div>
            </div>
        </div>
    );
}