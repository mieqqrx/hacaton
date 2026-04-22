import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-extrabold text-blue-900 mb-2">Mykolayiv: poruch</h1>
                <p className="text-gray-600 italic">Разом ми сильніші. Приєднуйтесь до громади.</p>
            </div>

            <RegisterForm />

            <p className="mt-6 text-gray-600">
                Вже маєте аккаунт?{' '}

                <Link href="/login" className="text-blue-600 hover:underline font-semibold">
                    Увійти
                </Link>
            </p>
        </main>
    );
}