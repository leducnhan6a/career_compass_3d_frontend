import PersonalInfo from '@components/Dashboard/PersonalInfo';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Gear } from 'phosphor-react';

export default function AdminDashboard() {
    const [selectedTab, setSelectedTab] = useState<'users' | 'edit' | 'history' | 'profile'>('profile');
    const router = useRouter();

    const renderContent = () => {
        switch (selectedTab) {
            case 'users':
                return <div>đoạn này thêm button xóa thông tin</div>;
            case 'edit':
                return <p>Trang chỉnh sửa nội dung hệ thống.</p>;
            case 'history':
                return <p>Lịch sử bài làm của người dùng.</p>;
            case 'profile':
                return <p>leducnhan</p>;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <p className="text-3xl font-bold mb-6 text-gray-800 text-center uppercase">
                setting
                <Gear size={32} />
            </p>

            <div className="flex flex-col gap-6 ">
                {/* Menu bên trái */}
                <div
                    onClick={() => alert('Coming soon')}
                    className={`px-6 py-2 bg-secondary hover:cursor-pointer hover:shadow-[0_10px_0] transition-all rounded-xl shadow-[0_4px_0] hover:-translate-y-1 text-info ${
                        selectedTab === 'profile'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'bg-white shadow hover:shadow-md'
                    }`}
                >
                    <p className="font-bold text-light whitespace-nowrap text-center">Thông tin cá nhân</p>
                </div>
                <div
                    onClick={() => router.push('/dashboard/delete-info')}
                    className={`px-6 py-2 bg-secondary hover:cursor-pointer hover:shadow-[0_10px_0] transition-all rounded-xl shadow-[0_4px_0] hover:-translate-y-1 text-info ${
                        selectedTab === 'profile'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'bg-white shadow hover:shadow-md'
                    }`}
                >
                    <p className="font-bold text-light whitespace-nowrap text-center">Xóa thông tin người dùng</p>
                </div>
                <div
                    onClick={() => {
                        router.push('/dashboard/edit');
                    }}
                    className={`px-6 py-2 bg-secondary hover:cursor-pointer hover:shadow-[0_10px_0] transition-all rounded-xl shadow-[0_4px_0] hover:-translate-y-1 text-info ${
                        selectedTab === 'profile'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'bg-white shadow hover:shadow-md'
                    }`}
                >
                    <p className="font-bold text-light whitespace-nowrap text-center">Chỉnh sửa</p>
                </div>
                <div
                    onClick={() => router.push('/survey/history')}
                    className={`px-6 py-2 bg-secondary hover:cursor-pointer hover:shadow-[0_10px_0] transition-all rounded-xl shadow-[0_4px_0] hover:-translate-y-1 text-info ${
                        selectedTab === 'profile'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'bg-white shadow hover:shadow-md'
                    }`}
                >
                    <p className="font-bold text-light whitespace-nowrap text-center">Lịch sử bài làm</p>
                </div>

                {/* Nội dung bên phải */}
                {/* <div className="w-full md:w-2/3 bg-white shadow rounded-lg p-6">{renderContent()}</div> */}
            </div>
        </div>
    );
}
