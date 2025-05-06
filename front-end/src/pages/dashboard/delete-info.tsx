import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function DeleteInfo() {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                router.push('/');
            }, 3000); // 3 giây

            return () => clearTimeout(timer); // clear timer nếu component unmount
        }
    }, [success, router]);

    const handleDelete = async () => {
        setLoading(true);
        setErrorMsg('');
        try {
            const response = await axios.delete('/api/v1/user/delete-account');
            if (response.status === 200) {
                setSuccess(true);
                // Redirect or show a success message
            }
        } catch (error: any) {
            setErrorMsg(error?.response?.data?.message || 'Đã có lỗi xảy ra!');
        } finally {
            setLoading(false);
            setShowModal(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Xóa tài khoản</h1>
            <p className="mb-4">Bạn có chắc chắn muốn xóa tài khoản này không? Thao tác này không thể hoàn tác.</p>
            <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                onClick={() => setShowModal(true)}
            >
                Xóa tài khoản
            </button>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Xác nhận xóa tài khoản</h2>
                        <div className="text-center py-4 text-gray-700">
                            tạo thêm thẻ img hoặc file gif để bỏ trong đây
                        </div>
                        <p className="mb-4 text-gray-700">
                            Bạn chắc chắn muốn xóa tài khoản? Thao tác này sẽ xóa vĩnh viễn dữ liệu của bạn.
                        </p>
                        {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 border rounded-[20px] hover:bg-gray-100"
                                onClick={() => setShowModal(false)}
                                disabled={loading}
                            >
                                Hủy
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-[20px] hover:bg-red-700 disabled:opacity-50"
                                onClick={handleDelete}
                                disabled={loading}
                            >
                                {loading ? 'Đang xóa...' : 'Xác nhận'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {success && <p className="text-green-600 mt-4">Tài khoản đã được xóa thành công.</p>}
        </div>
    );
}
