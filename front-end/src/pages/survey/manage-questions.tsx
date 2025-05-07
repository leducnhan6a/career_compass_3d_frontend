import Button from '@components/UI/Button';
import ConfirmDeleteModal from '@components/UI/ModelWarn';
import { useEffect, useState } from 'react';

interface Question {
    _id: string;
    question_text: string;
    question_code: string;
    isDeleted?: boolean;
}

export default function ManageQuestions() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const [newGroup, setNewGroup] = useState('');
    const [newQuestion, setNewQuestion] = useState('');
    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);
    const [selectedAction, setSelectedAction] = useState('create');

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const res = await fetch(
                `/api/v1/survey/${selectedAction === 'deleted' ? 'trash' : 'questionsSurvey'}?limit=100&page=1`,
            );
            const data = await res.json();
            if (res.ok && data.metadata) {
                setQuestions(data.metadata);
                setError(null);
            } else {
                setError(data.message || 'Không thể tải câu hỏi');
            }
        } catch (err) {
            console.error(err);
            setError('Lỗi khi tải câu hỏi');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [selectedAction]);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        setCreateError(null);

        if (!['R', 'I', 'A', 'S', 'E', 'C'].includes(newGroup)) {
            setCreateError('Nhóm phải là một trong các ký tự R, I, A, S, E, C');
            setCreating(false);
            return;
        }

        try {
            const res = await fetch('/api/v1/survey/questions/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    group: newGroup,
                    question: newQuestion,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                setCreateError(data.message || 'Không thể tạo câu hỏi');
            } else {
                setNewGroup('');
                setNewQuestion('');
                fetchQuestions();
            }
        } catch (err) {
            setCreateError('Lỗi khi tạo câu hỏi');
            console.error(err);
        } finally {
            setCreating(false);
        }
    };

    const softDelete = async (id: string) => {
        setShowModal(!showModal);
        if (!confirm('Bạn có chắc muốn ẨN câu hỏi này?')) return;
        const res = await fetch(`/api/v1/survey/questions/${id}/delete`, {
            method: 'PATCH',
        });
        if (res.ok) fetchQuestions();
    };

    const restoreQuestion = async (id: string) => {
        const res = await fetch(`/api/v1/survey/questions/${id}/restore`, {
            method: 'PATCH',
        });
        if (res.ok) fetchQuestions();
    };

    const deletePermanently = async (id: string) => {
        if (!confirm('Xóa VĨNH VIỄN câu hỏi này?')) return;
        const res = await fetch(`/api/v1/survey/questions/${id}`, {
            method: 'DELETE',
        });
        if (res.ok) fetchQuestions();
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
            <h1 className="text-2xl font-bold">Quản lý câu hỏi khảo sát</h1>
            {/* Dropdown chọn thao tác */}
            <div className="mb-6">
                <label htmlFor="actionSelect" className="block mb-1 font-medium">
                    Chọn thao tác
                </label>
                <select
                    id="actionSelect"
                    className="border rounded px-3 py-2 w-full max-w-xs"
                    value={selectedAction}
                    onChange={(e) => setSelectedAction(e.target.value)}
                >
                    <option value="create">Tạo câu hỏi mới</option>
                    <option value="nonDeleted">Lấy tất cả câu hỏi (chưa xóa)</option>
                    <option value="deleted">Lấy tất cả câu hỏi đã xóa</option>
                </select>
            </div>

            {/* FORM TẠO CÂU HỎI */}
            {selectedAction === 'create' && (
                <form onSubmit={handleCreate} className="space-y-4 p-4 border rounded">
                    <h2 className="text-lg font-semibold">Tạo câu hỏi mới</h2>
                    <div className="flex gap-4">
                        <div className="flex flex-col flex-1">
                            <label className="text-sm font-medium">Nhóm (R/I/A/S/E/C)</label>
                            <input
                                value={newGroup}
                                onChange={(e) => setNewGroup(e.target.value.toUpperCase())}
                                className="border p-2 rounded"
                                maxLength={1}
                                required
                            />
                        </div>
                        <div className="flex flex-col flex-[3]">
                            <label className="text-sm font-medium">Câu hỏi</label>
                            <input
                                value={newQuestion}
                                onChange={(e) => setNewQuestion(e.target.value)}
                                className="border p-2 rounded"
                                required
                            />
                        </div>
                    </div>
                    {createError && <p className="text-red-500 text-sm">{createError}</p>}
                    <button
                        type="submit"
                        disabled={creating}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {creating ? 'Đang tạo...' : 'Tạo mới'}
                    </button>
                </form>
            )}

            {/* DANH SÁCH CÂU HỎI */}
            {selectedAction === 'nonDeleted' &&
                (loading ? (
                    <p>Đang tải câu hỏi...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="space-y-4">
                        {questions.map((q) => (
                            <div
                                key={q._id}
                                className={`p-4 border rounded flex justify-between items-center ${
                                    q.isDeleted ? 'bg-gray-100 text-gray-500' : ''
                                }`}
                            >
                                <div className="max-w-[600px]">
                                    <p className="font-semibold">{q.question_text}</p>
                                    <p className="text-sm text-gray-500">Mã: {q.question_code}</p>
                                </div>
                                <div className="transition-all space-x-2 w-26 flex flex-col gap-4 justify-center items-center">
                                    {!q.isDeleted ? (
                                        <>
                                            <button
                                                className="px-2 py-1 w-full bg-yellow-100 rounded hover:bg-yellow-200"
                                                onClick={() => softDelete(q._id)}
                                            >
                                                Ẩn
                                            </button>

                                            <button
                                                onClick={() => alert('Coming soon')}
                                                className="px-2 py-1 w-full bg-green-100 rounded hover:bg-green-200"
                                            >
                                                Cập nhật
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="px-2 py-1 bg-green-100 rounded hover:bg-green-200"
                                            onClick={() => restoreQuestion(q._id)}
                                        >
                                            Khôi phục
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}

            {/* cau hoi da xoa */}
            {selectedAction === 'deleted' &&
                (loading ? (
                    <p>Đang tải câu hỏi...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="space-y-4">
                        {questions.map((q) => (
                            <div
                                key={q._id}
                                className={`p-4 border rounded flex justify-between items-center ${
                                    q.isDeleted ? 'bg-gray-100 text-gray-500' : ''
                                }`}
                            >
                                <div className="max-w-[600px]">
                                    <p className="font-semibold">{q.question_text}</p>
                                    <p className="text-sm text-gray-500">Mã: {q.question_code}</p>
                                </div>
                                <div className="transition-all space-x-2 w-26 flex flex-col gap-4 justify-center items-center">
                                    {!q.isDeleted ? (
                                        <>
                                            <button
                                                className="px-2 py-1 w-full bg-red-100 rounded hover:bg-red-200"
                                                onClick={() => deletePermanently(q._id)}
                                            >
                                                Xóa
                                            </button>
                                            <button
                                                className="px-2 py-1 w-full bg-green-100 rounded hover:bg-green-200"
                                                onClick={() => alert('Coming soon')}
                                            >
                                                Cập nhật
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="px-2 py-1 bg-green-100 rounded hover:bg-green-200"
                                            onClick={() => restoreQuestion(q._id)}
                                        >
                                            Khôi phục
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
        </div>
    );
}
