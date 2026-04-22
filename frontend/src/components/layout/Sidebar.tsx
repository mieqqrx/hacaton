'use client';

import { useState } from 'react';
import {
    HeartHandshake,
    Coffee,
    Map as MapIcon,
    ChevronDown,
    Scale,
    Car,
    Home,
    Coins,
    Cpu
} from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    const helpCategories = [
        { name: 'Юридичний компас', icon: <Scale size={18} />, href: '/help/legal' },
        { name: 'Авто Братство', icon: <Car size={18} />, href: '/help/transport' },
        { name: 'Побутова варта', icon: <Home size={18} />, href: '/help/domestic' },
        { name: 'Спільна скарбниця', icon: <Coins size={18} />, href: '/help/finance' },
        { name: 'Техно-підтримка', icon: <Cpu size={18} />, href: '/help/tech' },
    ];

    return (
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky left-0 top-0 shadow-xl z-40">
            <div className="p-6 flex flex-col gap-6">
                <div className="relative">
                    <button
                        onClick={() => setIsHelpOpen(!isHelpOpen)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg font-bold transition-all ${
                            isHelpOpen ? 'bg-blue-600 text-white' : 'bg-blue-700 text-white hover:bg-blue-600'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <HeartHandshake size={22} />
                            <span>Допомогти</span>
                        </div>
                        <ChevronDown size={18} className={`transition-transform ${isHelpOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isHelpOpen && (
                        <div className="mt-2 flex flex-col gap-1 bg-slate-800 rounded-lg p-2 animate-in fade-in slide-in-from-top-2 duration-200">
                            {helpCategories.map((cat) => (
                                <Link
                                    key={cat.name}
                                    href={cat.href}
                                    className="flex items-center gap-3 p-2 hover:bg-slate-700 rounded-md text-sm transition-colors"
                                >
                                    <span className="text-blue-400">{cat.icon}</span>
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <nav className="flex flex-col gap-2">
                    <Link href="/dashboard" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition-colors">
                        <MapIcon size={20} />
                        <span>Мапа міста</span>
                    </Link>
                    <Link href="/leisure" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition-colors">
                        <Coffee size={20} />
                        <span>Час разом</span>
                    </Link>
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-slate-800">
                <p className="text-xs text-slate-500 text-center">Миколаїв — місто героїв</p>
            </div>
        </aside>
    );
}