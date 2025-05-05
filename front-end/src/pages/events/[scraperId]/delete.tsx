/* eslint-disable @next/next/no-img-element */
// front-end/src/pages/events/[scraperId]/delete.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Article } from '..';

const DeleteEvent = () => {
    const [event, setEvent] = useState<Article>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { scraperId } = router.query;

    useEffect(() => {
        // Fetch event details based on scraperId
        const fetchEvent = async () => {
            if (!scraperId) return; // Ensure scraperId exists

            try {
                const response = await fetch(`/api/v1/event/${scraperId}`);
                if (!response.ok) {
                    throw new Error('Lỗi khi tải dữ liệu sự kiện');
                }

                const data = await response.json();
                setEvent(data.metadata);
            } catch (err) {
                setError('Lỗi khi tải dữ liệu');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [scraperId]);

    const handleDelete = async () => {
        if (!scraperId) return;

        try {
            setLoading(true);
            const response = await fetch(`/api/v1/event/${scraperId}/delete`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Lỗi khi xóa vĩnh viễn sự kiện');
            }

            // Redirect to the events list after successful deletion
            router.push('/events');
        } catch (err) {
            setError('Lỗi khi xóa sự kiện');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Xóa Sự Kiện</h1>

            {error && <p className="text-center text-red-500 mb-4">{error}</p>}

            {loading ? (
                <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
            ) : (
                event && (
                    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
                        <div className="flex justify-center mb-4">
                            <img
                                src={event.thumbnail}
                                alt={event.title}
                                className="w-40 h-40 object-cover rounded-lg"
                            />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">{event.title}</h2>
                        <p className="text-center text-gray-600 mb-6">{new Date(event.publishedAt).toLocaleDateString()}</p>

                        <p className="text-center text-lg text-red-600 mb-4">
                            Bạn chắc chắn muốn xóa sự kiện này vĩnh viễn?
                        </p>

                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleDelete}
                                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                            >
                                Xóa Vĩnh Viễn
                            </button>
                            <Link href="/events">
                                <a className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none">
                                    Hủy
                                </a>
                            </Link>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default DeleteEvent;
