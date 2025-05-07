import { useState } from 'react'
import { useRouter } from 'next/router'
import Button from '@components/UI/Button'

export default function RegisterPage() {
    const router = useRouter()
    const [form, setForm] = useState({
        email: '',
        username: '',
        displayname: '',
        password: '',
        gender: 'male',
    })
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        // Kiểm tra dữ liệu trước khi gửi yêu cầu
        if (!form.email || !form.username || !form.password) {
            setError('Please fill in all required fields')
            setLoading(false)
            return
        }

        try {
            const res = await fetch('/api/v1/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })

            const data = await res.json()
            setLoading(false)

            if (res.ok) {
                
                router.push('/')
            } else {
                setError(data.message || 'Đã xảy ra lỗi khi đăng ký')
            }
        } catch (err) {
            setLoading(false)
            setError('Lỗi kết nối đến máy chủ')
            console.error(err)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-8">Đăng ký tài khoản</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <input
                    type="text"
                    name="displayname"
                    placeholder="Tên hiển thị"
                    value={form.displayname}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <div className="flex justify-around w-full gap-4 mb-8">
                    <label className="flex items-center space-x-2 cursor-pointer px-4">
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={form.gender === "male"}
                            onChange={handleChange}
                            className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                            required
                        />
                        <span className="text-gray-700">Nam</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer px-8">
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={form.gender === "female"}
                            onChange={handleChange}
                            className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                            required
                        />
                        <span className="text-gray-700">Nữ</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer px-4">
                        <input
                            type="radio"
                            name="gender"
                            value="other"
                            checked={form.gender === "other"}
                            onChange={handleChange}
                            className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                            required
                        />
                        <span className="text-gray-700">Khác</span>
                    </label>
                </div>
                {/* <button
                    type="submit"
                    className={`w-full p-2 rounded ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white`}
                    disabled={loading}
                >
                    {loading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
                </button> */}

                <Button variant="primary" className={`w-full p-2 rounded ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-sky-400'} text-white [&:disabled]:bg-gray-400 [&:disabled]:text-gray-200`} disabled={loading} label={loading ? 'Đang tạo tài khoản...' : 'Đăng ký'}></Button>

                {/* <button
                    type="button"
                    className="w-full p-2 rounded bg-green-600 text-white hover:bg-green-700 mt-2"
                    onClick={() => router.push('./login')}
                >
                    Đăng nhập
                </button> */}

                <Button variant="pink" className='w-full p-2 rounded text-white hover:bg-pink-500 mt-2' label='Đăng nhập' onClick={() => router.push('./login')}></Button>

            </form>
        </div>
    )
}
