import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Model3D {
    _id: string
    object3d_name: string
    object3d_description: string
    object3d_thumbnailUrl: string
    object3d_modelUrl: string
    updatedAt: string
    object3d_bucket: string
}

export default function ModelDetailPage() {
    const router = useRouter()
    const { id } = router.query
    const [model, setModel] = useState<Model3D | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return
        const fetchModel = async () => {
            try {
                const res = await fetch(`/api/v1/model/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                const data = await res.json()
                if (res.ok) {
                    setModel(data.metadata)
                } else {
                    console.error(data.message)
                }
            } catch (err) {
                console.error('Lỗi khi tải chi tiết mô hình:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchModel()
    }, [id])

    if (loading) return <p className="text-center mt-8">Đang tải chi tiết mô hình...</p>
    if (!model) return <p className="text-center mt-8">Không tìm thấy mô hình.</p>

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{model.object3d_name}</h1>
            <Image
                src={model.object3d_thumbnailUrl}
                alt={model.object3d_name}
                width={800}
                height={400}
                className="rounded-xl mb-4"
                unoptimized
            />
            <p className="text-gray-600 mb-4">{model.object3d_description}</p>
            <p className="text-sm text-gray-400 mb-2">
                Mã mô hình: <span className="font-mono">{model._id}</span>
            </p>
            <p className="text-sm text-gray-400">
                Cập nhật lúc: {new Date(model.updatedAt).toLocaleString()}
            </p>
            <div className="mt-6">
                <button
                    onClick={() => router.push(`/environment/view/${model._id}`)}
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Xem mô hình 3D
                </button>
            </div>
        </div>
    )
}
