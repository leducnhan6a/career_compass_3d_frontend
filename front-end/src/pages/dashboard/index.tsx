import PersonalInfo from '@components/Dashboard/PersonalInfo';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function AdminDashboard() {
    const [selectedTab, setSelectedTab] = useState<'users' | 'edit' | 'history' | 'profile'>('profile');
    const router = useRouter();

    const handleClick = () => {
        alert('Coming soon !!!');
        // {tạo model để chỉnh sửa thông tin cá nhân}
    };

    const renderContent = () => {
        switch (selectedTab) {
            case 'users':
                return <div>đoạn này thêm button xóa thông tin</div>;
            case 'edit':
                return <p>Trang chỉnh sửa nội dung hệ thống.</p>;
            case 'history':
                return <p>Lịch sử bài làm của người dùng.</p>;
            case 'profile':
                return <PersonalInfo />
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center uppercase">Trang Quản Trị</h1>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Menu bên trái */}
                <div className="w-full md:w-1/3 space-y-4">
                    <div
                        onClick={() => setSelectedTab('profile')}
                        className={`transition-all p-4 rounded cursor-pointer ${
                            selectedTab === 'profile'
                                ? 'bg-blue-100 text-blue-700 font-semibold'
                                : 'bg-white shadow hover:shadow-md'
                        }`}
                    >
                        Thông tin cá nhân
                    </div>
                    <div
                        onClick={() => router.push('/dashboard/delete-info')}
                        className={`transition-all p-4 rounded cursor-pointer ${
                            selectedTab === 'users'
                                ? 'bg-blue-100 text-blue-700 font-semibold'
                                : 'bg-white shadow hover:shadow-md'
                        }`}
                    >
                        Xóa thông tin người dùng
                    </div>
                    <div
                        onClick={() => {
                            setSelectedTab('edit')
                            router.push('/dashboard/edit')
                        }}
                        className={`transition-all p-4 rounded cursor-pointer ${
                            selectedTab === 'edit'
                                ? 'bg-blue-100 text-blue-700 font-semibold'
                                : 'bg-white shadow hover:shadow-md'
                        }`}
                    >
                        Chỉnh sửa
                    </div>
                    <div
                        onClick={() => router.push('/survey/history')}
                        className={`transition-all p-4 rounded cursor-pointer ${
                            selectedTab === 'history'
                                ? 'bg-blue-100 text-blue-700 font-semibold'
                                : 'bg-white shadow hover:shadow-md'
                        }`}
                    >
                        Lịch sử bài làm
                    </div>
                </div>

                {/* Nội dung bên phải */}
                <div className="w-full md:w-2/3 bg-white shadow rounded-lg p-6">{renderContent()}</div>
            </div>
        </div>
    );
}
