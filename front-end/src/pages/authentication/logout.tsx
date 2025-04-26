import { useRouter } from 'next/router'

export default function LogoutPage() {
    const router = useRouter()
    const handleLogout = async () => {
        try {
            const res = await fetch('/api/v1/access/logout', {
                method: 'POST',
            })

            const data = await res.json()

            if (res.ok) {
                router.push('./login')
            } else {
                alert(data.message || 'Lỗi đăng xuất')
            }
        } catch (err) {
            console.error(err)
            alert('Lỗi kết nối đến máy chủ')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <button
                onClick={handleLogout}
                className="bg-red-600 text-white p-2 rounded"
            >
                Logout
            </button>
        </div>
    )
}
