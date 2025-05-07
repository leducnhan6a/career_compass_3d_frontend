import React from 'react'
import Button from './Button'
import { useRouter } from 'next/router'

export default function LogoutButton() {
    const router = useRouter()

    const handleLogout = async () => {
        await fetch('/api/logout')
        router.push('/login')
    }
    return (
        <Button variant='danger' onClick={handleLogout} label='Đăng xuất' />
    )
}
