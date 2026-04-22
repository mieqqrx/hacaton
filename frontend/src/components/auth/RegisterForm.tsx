"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRole } from "@/types/api.types";
import { useRegisterMutation } from "@/store/api/services";

export default function RegisterForm() {
    const router = useRouter();
    const [registerUser, { isLoading }] = useRegisterMutation();
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        role: "user",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errorMessage) setErrorMessage("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Паролі не співпадають");
            return;
        }

        const roleToSubmit: UserRole = formData.role === "veteran" ? "Veteran" : "User";

        try {
            await registerUser({
                role: roleToSubmit,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phoneNumber: formData.phone,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
            }).unwrap();

            alert("Реєстрація успішна! Тепер ви можете увійти.");
            router.push("/login");

        } catch (error: any) {
            const backendMessage = error?.data?.message || "Сталася помилка при реєстрації";
            setErrorMessage(backendMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-900 text-center mb-6">Створення аккаунту</h2>

            {errorMessage && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                    {errorMessage}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Хто ви?</label>
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                    <option value="user">Містянин (хочу допомогти)</option>
                    <option value="veteran">Ветеран війни</option>
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ім"я</label>
                    <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Іван"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Прізвище</label>
                    <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Сірко"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Електронна пошта</label>
                <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="user123@gmail.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Номер телефону</label>
                <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="+380..."
                />
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
                    <input
                        type="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Підтвердження пароля</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg mt-6 transition-colors shadow-md flex justify-center items-center"
            >
                {isLoading ? "Реєстрація..." : "Зареєструватися"}
            </button>
        </form>
    );
}