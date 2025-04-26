// src/pages/dashboard/index.tsx
import { useCookies } from 'react-cookie'

export default function DashboardPage() {
    const [cookies] = useCookies(['token', 'role'])

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
            <p>Role: {cookies.role}</p>
            {/* Nội dung dashboard khác ở đây */}
        </div>
    )
}
