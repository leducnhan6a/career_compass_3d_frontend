'use client';
import React, { useState } from 'react';

const ConfirmDeleteModal = () => {
    const [showModal, setShowModal] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleDelete = async () => {
        setLoading(true);
        try {
            // Gọi API xóa ở đây
            await new Promise((resolve) => setTimeout(resolve, 1500));
            // Sau khi thành công:
            alert('Tài khoản đã được xóa!');
            setShowModal(false);
        } catch (error) {
            setErrorMsg('Xóa thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                <h2 className="text-xl font-semibold mb-4">Xác nhận xóa tài khoản</h2>

                <div className="text-center py-4 text-gray-700">
                    <img
                        src="/images/delete-warning.gif"
                        alt="Xóa tài khoản"
                        className="mx-auto w-28 h-28 object-contain"
                    />
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
    );
};

export default ConfirmDeleteModal;
