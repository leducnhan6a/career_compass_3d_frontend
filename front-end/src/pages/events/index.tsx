// front-end/src/pages/events/index.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export interface Article {
    _id: string;
    source: string;
    title: string;
    url: string;
    publishedAt: string;
    thumbnail: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
}

const EventsIndex = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch data from /event API
        const fetchArticles = async () => {
            try {
                const response = await fetch('/api/v1/event');

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
                setArticles(data.metadata);
            } catch (err) {
                setError(err as string);
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Danh sách các bài viết</h1>

            {loading ? (
                <p className="text-center text-xl text-gray-500">Đang tải...</p>
            ) : error ? (
                <p className="text-center text-xl text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Tiêu đề</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Ngày đăng</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Ảnh minh họa</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((article) => (
                                <tr key={article._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-700">{article.title}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(article.publishedAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <img
                                            src={article.thumbnail}
                                            alt={article.title}
                                            width={100}
                                            height={100}
                                            className="rounded-md object-cover"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                                            href={article.url} target="_blank" rel="noopener noreferrer">
                                            Xem chi tiết
                                        </Link>
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

export default EventsIndex;
