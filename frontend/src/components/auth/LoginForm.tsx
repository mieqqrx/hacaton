"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/store/api/services";

export default function LoginForm() {
    const router = useRouter();
    const [loginUser, { isLoading }] = useLoginMutation();
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errorMessage) setErrorMessage("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await loginUser({
                email: formData.email,
                password: formData.password,
            }).unwrap();

            router.push("/dashboard");

        } catch (error: any) {
            const backendMessage = error?.data?.message || "Помилка авторизації. Перевірте введені дані.";
            setErrorMessage(backendMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-900 text-center mb-6">Вхід в аккаунт</h2>

            {errorMessage && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200 text-center">
                    {errorMessage}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Електронна пошта</label>
                <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="user123@gmail.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
                <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="••••••••"
                />
            </div>

            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Запам"ятати мене
                    </label>
                </div>
                <div className="text-sm">
                    <a href="#" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                        Забули пароль?
                    </a>
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg mt-6 transition-colors shadow-md flex justify-center items-center"
            >
                {isLoading ? "Завантаження..." : "Увійти"}
            </button>
        </form>
    );
}