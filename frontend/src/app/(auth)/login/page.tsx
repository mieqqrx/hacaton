import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-extrabold text-blue-900 mb-2">Mykolayiv: poruch</h1>
                <p className="text-gray-600 italic">З поверненням! Раді бачити вас знову.</p>
            </div>

            <LoginForm />

            <p className="mt-6 text-gray-600">
                Ще не маєте аккаунту?{' '}
                <Link href="/register" className="text-blue-600 hover:underline font-semibold">
                    Зареєструватися
                </Link>
            </p>
        </main>
    );
}