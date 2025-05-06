import { useRouter } from 'next/router'
import Image from 'next/image'
import LogoutButton from '@components/UI/LogoutButton'
import Button from '@components/UI/Button'

export default function LogoutPage() {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/v1/user/logout', {
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-4">
            <Image
                src="/images/image.webp"
                alt="Logout Illustration"
                width={192}
                height={192}
                className="w-48 h-48 mb-6 rounded-full border-2 border-gray-300 shadow-lg"
            />
            <h1 className="text-2xl font-semibold mb-2 text-gray-700">Bạn có chắc muốn đăng xuất?</h1>
            <p className="text-gray-500 mb-6 text-center max-w-md">
                Nhấn vào nút bên dưới để thoát khỏi hệ thống và quay lại trang đăng nhập.
            </p>
            <Button variant='danger' label='Đăng xuất' onClick={handleLogout}/>
        </div >
    )
}
