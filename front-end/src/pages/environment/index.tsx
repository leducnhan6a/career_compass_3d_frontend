import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import BackButton from '@components/UI/BackButton'

interface Model3D {
    _id: string
    object3d_name: string
    object3d_description: string
    object3d_thumbnailUrl: string
    object3d_modelUrl: string
    updatedAt: string
    object3d_bucket: string
}


export default function EnvironmentPage() {
    const router = useRouter()
    const [models, setModels] = useState<Model3D[]>([])
    const [loading, setLoading] = useState(true)

    const fetchModels = async () => {
        try {
            const res = await fetch('/api/v1/model', {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data = await res.json()
            if (res.ok) {
                setModels(data.metadata || [])
            } else {
                console.error(data.message || 'Có lỗi xảy ra')
            }
        } catch (err) {
            console.error('Lỗi khi tải danh sách mô hình:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchModels()
    }, [])

    return (
        <div className="max-w-5xl mx-auto p-6">
            <BackButton />
            <h1 className="text-3xl font-bold mb-6 text-center">Danh sách mô hình 3D</h1>

            {loading ? (
                <p className="text-center">Đang tải dữ liệu...</p>
            ) : models.length === 0 ? (
                <p className="text-center">Không có mô hình nào.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {models.map((model) => (
                        <div key={model._id} className="bg-white rounded-xl shadow p-4 space-y-2">
                            <Image
                                src={model.object3d_thumbnailUrl}
                                alt={model.object3d_name}
                                width={400}
                                height={200}
                                className="w-full h-48 object-cover rounded-md"
                                unoptimized
                            />
                            <h2 className="text-lg font-semibold truncate">{model.object3d_name}</h2>
                            <p className="text-gray-600 text-sm line-clamp-3">{model.object3d_description}</p>
                            <p className="text-gray-400 text-xs">
                                Cập nhật: {new Date(model.updatedAt).toLocaleString()}
                            </p>
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                                onClick={() => {
                                    router.push(`/environment/${model._id}`)
                                }}
                            >
                                Xem chi tiết
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
