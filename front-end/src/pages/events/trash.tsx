// front-end/src/pages/events/trash.tsx
import React, { useEffect, useState } from 'react';
import { Article } from '.';

const TrashEvents = () => {
    const [events, setEvents] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch deleted events from /event/trash API
        const fetchTrashEvents = async () => {
            try {
                const response = await fetch('/api/v1/event/trash');

                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error('Chưa được xác thực');
                    }
                    if (response.status === 403) {
                        throw new Error('Không có quyền thực hiện hành động này');
                    }
                    throw new Error('Lỗi khi tải dữ liệu');
                }

                const data = await response.json();
                setEvents(data.metadata);
            } catch (err) {
                setError(err as string);
            } finally {
                setLoading(false);
            }
        };

        fetchTrashEvents();
    }, []);

    const handleRestore = async (eventId: string) => {
        try {
            const response = await fetch(`/api/v1/event/${eventId}/restore`, {
                method: 'PATCH',
            });

            if (!response.ok) {
                throw new Error('Lỗi khi khôi phục sự kiện');
            }

            // Re-fetch events after restoring
            setEvents(events.filter(event => event._id !== eventId));
        } catch (err) {
            setError('Lỗi khi khôi phục sự kiện');
            console.log(`Error restoring event: ${err}`);
        }
    };

    const handleDelete = async (eventId: string) => {
        try {
            const response = await fetch(`/api/v1/event/${eventId}/delete`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Lỗi khi xóa vĩnh viễn sự kiện');
            }

            // Re-fetch events after permanent deletion
            setEvents(events.filter(event => event._id !== eventId));
        } catch (err) {
            setError('Lỗi khi xóa vĩnh viễn sự kiện');
            console.log(`Error deleting event: ${err}`);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Danh sách sự kiện đã xóa</h1>

            {error && <p className="text-center text-red-500 mb-4">{error}</p>}

            {loading ? (
                <p className="text-center text-gray-500">Đang tải...</p>
            ) : (
                <div>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Tiêu đề</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Ngày đăng</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Ảnh minh họa</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => (
                                <tr key={event._id} className="border-b">
                                    <td className="py-4 px-4 text-sm text-gray-800">{event.title}</td>
                                    <td className="py-4 px-4 text-sm text-gray-600">{new Date(event.publishedAt).toLocaleDateString()}</td>
                                    <td className="py-4 px-4">
                                        <img
                                            src={event.thumbnail}
                                            alt={event.title}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </td>
                                    <td className="py-4 px-4">
                                        <button
                                            onClick={() => handleRestore(event._id)}
                                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-2"
                                        >
                                            Khôi phục
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event._id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                        >
                                            Xóa vĩnh viễn
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TrashEvents;
