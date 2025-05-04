import { useRouter } from 'next/router'
import { useState } from 'react'
import Image from 'next/image'

export default function DeleteAccountPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        const confirm = window.confirm('Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.')
        if (!confirm) return

        setLoading(true)
        try {
            const res = await fetch('/api/v1/user/delete-account', {
                method: 'DELETE',
            })

            const data = await res.json()

            if (res.ok) {
                alert('Tài khoản đã được xóa vĩnh viễn.')
                router.push('/login')
            } else {
                alert(data.message || 'Xóa tài khoản thất bại.')
            }
        } catch (error) {
            console.error(error)
            alert('Lỗi kết nối đến máy chủ.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-4">
            <Image
                src="/images/image.webp"
                alt="Logout Illustration"
                width={192}
                height={192}
                className="w-48 h-48 mb-6 rounded-full border-2 border-gray-300 shadow-lg"
            />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Xóa tài khoản
            </h1>
            <p className="text-gray-600 mb-6 text-center max-w-md">
                Hành động này sẽ xóa vĩnh viễn tài khoản của bạn và không thể khôi phục.
            </p>
            <button
                onClick={handleDelete}
                disabled={loading}
                className="px-6 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
            >
                {loading ? 'Đang xóa...' : 'Xác nhận xóa tài khoản'}
            </button>
        </div>
    )
}
