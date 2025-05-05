/* eslint-disable @next/next/no-img-element */
// front-end/src/pages/events/[scraperId]/restore.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Article } from '..';

const RestoreEvent = () => {
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
                console.error('Error fetching event:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [scraperId]);

    const handleRestore = async () => {
        if (!scraperId) return;

        try {
            setLoading(true);
            const response = await fetch(`/api/v1/event/${scraperId}/restore`, {
                method: 'PATCH',
            });

            if (!response.ok) {
                throw new Error('Lỗi khi khôi phục sự kiện');
            }

            // Redirect to the events list after successful restoration
            router.push('/events');
        } catch (err) {
            setError('Lỗi khi khôi phục sự kiện');
            console.error('Error restoring event:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Khôi Phục Sự Kiện</h1>

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

                        <p className="text-center text-lg text-green-600 mb-4">
                            Bạn chắc chắn muốn khôi phục sự kiện này?
                        </p>

                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleRestore}
                                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                            >
                                Khôi Phục
                            </button>
                            <Link href="/events" className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none">
                                Hủy
                            </Link>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default RestoreEvent;
