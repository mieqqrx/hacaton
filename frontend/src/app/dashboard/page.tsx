export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Оперативна ситуація в місті</h2>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        SignalR Connected
                    </span>
                </div>
            </div>

            <div className="w-full h-[500px] bg-slate-200 rounded-2xl border-4 border-white shadow-sm flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                <div className="text-center z-10">
                    <p className="text-slate-500 font-medium">Інтерактивна мапа Миколаєва завантажується...</p>
                    <p className="text-xs text-slate-400 mt-2">Райони: Центральний, Інгульський, Корабельний, Заводський</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Активних зустрічей</p>
                    <p className="text-2xl font-bold text-blue-600">12</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Потрібна допомога</p>
                    <p className="text-2xl font-bold text-red-500">8</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Спільнота (онлайн)</p>
                    <p className="text-2xl font-bold text-green-600">142</p>
                </div>
            </div>
        </div>
    );
}