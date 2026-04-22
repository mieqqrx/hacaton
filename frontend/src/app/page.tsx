import Link from "next/link";
import { HeartHandshake, Map, Users, ArrowRight } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Навігація зверху */}
            <nav className="h-20 border-b flex items-center justify-between px-8 md:px-20">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-blue-900 text-2xl tracking-tight">
                        Миколаїв<span className="text-blue-600">:</span>Поруч
                    </span>
                </div>

                <div className="flex gap-4">
                    <Link href="/login" className="px-5 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">
                        Увійти
                    </Link>

                    <Link href="/register" className="px-5 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md">
                        Приєднатися
                    </Link>
                </div>
            </nav>

            <main className="flex-1">
                <section className="py-20 px-8 md:px-20 text-center max-w-5xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                        Платформа взаємодопомоги та <span className="text-blue-600">відбудови</span> Миколаєва
                    </h1>

                    <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Ми створюємо простір, де ветерани отримують підтримку, а кожен мешканець може долучитися до відновлення рідного міста.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register" className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-lg shadow-lg group">
                            Стати частиною спільноти
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </section>

                <section className="py-16 bg-slate-50 px-8 md:px-20 border-y border-slate-100">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                                <HeartHandshake size={28} />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-3">Допомога ветеранам</h3>
                            <p className="text-slate-600">Пряма координація між тими, хто потребує допомоги, та тими, хто може її надати.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6 text-green-600">
                                <Map size={28} />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-3">Інтерактивна мапа</h3>
                            <p className="text-slate-600">Повідомляйте про пошкодження або пропонуйте місця для благоустрою на мапі міста.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6 text-amber-600">
                                <Users size={28} />
                            </div>
                            
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Спільнота героїв</h3>
                            <p className="text-slate-600">Об’єднуйтесь для спільного дозвілля, консультацій та відбудови Миколаївщини.</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-10 border-t text-center text-slate-400 text-sm">
                <p>© 2026 Миколаїв: Поруч. Разом ми — незламне місто.</p>
            </footer>
        </div>
    );
}