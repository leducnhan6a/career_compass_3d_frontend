// front-end/src/pages/events/create.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const CreateEvent = () => {
    const [title, setTitle] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [publishedAt, setPublishedAt] = useState<string>('');
    const [thumbnail, setThumbnail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const eventData = { title, url, publishedAt, thumbnail };

        try {
            const response = await fetch('/api/v1/event/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Chưa được xác thực');
                }
                if (response.status === 403) {
                    throw new Error('Không có quyền thực hiện hành động này');
                }
                throw new Error('Lỗi khi tạo sự kiện');
            }

            // Redirect to events list after successful creation
            router.push('/events');
        } catch (err) {
            setError(err as string);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Tạo Sự Kiện Mới</h1>

            {error && <p className="text-center text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
                    <input
                        id="url"
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-700">Ngày đăng</label>
                    <input
                        id="publishedAt"
                        type="date"
                        value={publishedAt}
                        onChange={(e) => setPublishedAt(e.target.value)}
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">Ảnh minh họa</label>
                    <input
                        id="thumbnail"
                        type="url"
                        value={thumbnail}
                        onChange={(e) => setThumbnail(e.target.value)}
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                        disabled={loading}
                    >
                        {loading ? 'Đang tạo...' : 'Tạo sự kiện'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateEvent;
