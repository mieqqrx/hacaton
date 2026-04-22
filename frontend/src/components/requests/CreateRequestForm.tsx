"use client";

import { useState, useRef } from "react";
import { MapPin, UploadCloud, X, Image as ImageIcon, Send } from "lucide-react";
import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("./MapPicker"), { ssr: false });

export default function CreateRequestForm() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        address: "",
    });

    const [photos, setPhotos] = useState<File[]>([]);
    const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isMapOpen, setIsMapOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setPhotos((prev) => [...prev, ...newFiles]);

            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setPhotoPreviews((prev) => [...prev, ...newPreviews]);
        }
    };

    const removePhoto = (index: number) => {
        setPhotos(photos.filter((_, i) => i !== index));
        setPhotoPreviews(photoPreviews.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const submitData = new FormData();
        submitData.append("title", formData.title);
        submitData.append("description", formData.description);
        submitData.append("address", formData.address);
        photos.forEach((photo) => {
            submitData.append("photos", photo);
        });

        console.log("Дані готові до відправки в БД:", Object.fromEntries(submitData));
        alert("Оголошення успішно створено!");
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 max-w-3xl mx-auto space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Тема (коротко) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="Наприклад: Потрібна допомога з ремонтом генератора"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Детальний опис <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="description"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                        placeholder="Опишіть ситуацію детальніше. Що саме потрібно зробити? Які інструменти чи ресурси потрібні?"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Точка зустрічі або адреса <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="address"
                            required
                            value={formData.address}
                            onChange={handleChange}
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="Введіть адресу або оберіть на карті..."
                        />

                        <button
                            type="button"
                            onClick={() => setIsMapOpen(true)}
                            className="bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600 px-4 rounded-lg flex items-center gap-2 font-medium transition-colors border border-gray-300 whitespace-nowrap"
                        >
                            <MapPin size={20} />
                            <span className="hidden sm:inline">На карті</span>
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Точна адреса допоможе людям поблизу швидше відреагувати.
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Фотографії (опціонально)
                    </label>

                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                        <UploadCloud size={40} className="text-blue-500 mb-3" />
                        <p className="text-sm font-medium text-gray-700 text-center">Натисніть сюди, щоб завантажити фото</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, до 5MB</p>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handlePhotoUpload}
                            multiple
                            accept="image/*"
                            className="hidden"
                        />
                    </div>

                    {photoPreviews.length > 0 && (
                        <div className="flex gap-3 mt-4 flex-wrap">
                            {photoPreviews.map((src, index) => (
                                <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 group">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={src} alt="Preview" className="w-full h-full object-cover" />

                                    <button
                                        type="button"
                                        onClick={() => removePhoto(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-colors shadow-md ml-auto"
                    >
                        <Send size={18} />
                        Опублікувати запит
                    </button>
                </div>
            </form>

            {isMapOpen && (
                <MapPicker
                    onClose={() => setIsMapOpen(false)}
                    onSelect={(selectedAddress) => setFormData({ ...formData, address: selectedAddress })}
                />
            )}
        </>
    );
}