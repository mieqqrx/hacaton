import CreateRequestForm from "@/components/requests/CreateRequestForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreateRequestPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-10">
            <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium text-sm"
            >
                <ArrowLeft size={16} />
                Повернутися на мапу
            </Link>

            <div>
                <h1 className="text-3xl font-extrabold text-gray-900">Створити оголошення</h1>

                <p className="text-gray-500 mt-2">
                    Опишіть, яка саме допомога вам потрібна, або запропонуйте компанію для відпочинку.
                </p>
            </div>

            <CreateRequestForm />
        </div>
    );
}