import { useState } from 'react'
import { useRouter } from 'next/router'

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
            const res = await fetch('/api/v1/access/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })

            const data = await res.json()
            setLoading(false)

            if (res.ok) {
                router.push('./login')
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
                className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">Register</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="displayname"
                    placeholder="Display Name"
                    value={form.displayname}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <button
                    type="submit"
                    className={`w-full p-2 rounded ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white`}
                    disabled={loading}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    )
}
