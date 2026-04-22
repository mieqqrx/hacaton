'use client';

import { Settings, Bell, User } from 'lucide-react';

export default function Header() {
    return (
        <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-30">
            <div className="flex items-center gap-2">
                <span className="font-bold text-blue-900 text-xl">Миколаїв: Поруч</span>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                    <Bell size={20} className="text-gray-600" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-gray-900">Олександр Коваль</p>
                        <p className="text-xs text-blue-600 font-medium">Ветеран війни</p>
                    </div>

                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-200 cursor-pointer hover:opacity-80 transition-opacity">
                        <User className="text-blue-600" size={24} />
                    </div>
                    <button title="Налаштування" className="text-gray-400 hover:text-blue-600 transition-colors">
                        <Settings size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
}