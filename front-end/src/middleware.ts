import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Các route cần phân quyền
const protectedRoutes = [
    { path: '/authentication/logout', role: 'user' },
    { path: '/authentication/logout', role: 'admin' },
    { path: '/dashboard', role: 'user' },
    { path: '/dashboard/edit', role: 'admin' },
    { path: '/dashboard/history', role: 'user' },
    { path: '/dashboard/delete-info', role: 'user' },
    { path: '/dashboard/change-password', role: 'user' },
    // { path: '/survey', role: 'user' },
    // { path: '/survey/take-test', role: 'user' },
    { path: '/survey/result', role: 'user' },
    { path: '/events/edit', role: 'admin' },
]

// Middleware chính
export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()
    const { pathname } = url

    const token = request.cookies.get('token')?.value || ''
    const role = request.cookies.get('role')?.value || ''

    const route = protectedRoutes.find((r) => pathname.startsWith(r.path))
    if (token) {
        if (pathname.startsWith('/authentication/register')) {
            url.pathname = '/authentication/logout'
            return NextResponse.redirect(url)
        }
    }
    // Nếu route cần phân quyền
    if (route) {
        // Chưa đăng nhập
        if (!token) {
            url.pathname = '/authentication/login'
            return NextResponse.redirect(url)
        }

        // Không đúng quyền
        if (role !== route.role) {
            url.pathname = '/dashboard'
            return NextResponse.redirect(url)
        }
    }

    return NextResponse.next()
}

// Định nghĩa các path áp dụng middleware
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/survey/:path*',
        '/events/edit',
        '/authentication/:path*',
    ],
}
