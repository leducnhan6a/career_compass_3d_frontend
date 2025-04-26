// src/utils/cookies.ts
import { serialize, parse, type SerializeOptions } from 'cookie'
import type { NextApiResponse, NextApiRequest } from 'next'

// Hàm để set nhiều cookies
export const setCookies = (
    res: NextApiResponse,
    cookies: { name: string, value: string, options?: SerializeOptions }[]
) => {
    const defaultOptions: SerializeOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,  // cookie sống 7 ngày
    }

    // Serialize từng cookie và gộp với defaultOptions
    const serializedCookies = cookies.map(({ name, value, options = {} }) =>
        serialize(name, value, { ...defaultOptions, ...options })
    )

    // Set cookies header
    const existingCookies = res.getHeader('Set-Cookie')
    if (Array.isArray(existingCookies)) {
        res.setHeader('Set-Cookie', [...existingCookies, ...serializedCookies])
    } else if (typeof existingCookies === 'string') {
        res.setHeader('Set-Cookie', [existingCookies, ...serializedCookies])
    } else {
        res.setHeader('Set-Cookie', serializedCookies)
    }
}

// Hàm để lấy tất cả cookies từ request
export const getCookies = (req: NextApiRequest) => {
    return parse(req.headers.cookie || '')
}

// Hàm để lấy giá trị của một cookie theo tên
export const getCookie = (req: NextApiRequest, name: string) => {
    const cookies = getCookies(req)
    return cookies[name]
}

// Hàm để xóa một cookie
export const clearCookie = (res: NextApiResponse, name: string) => {
    const expired = serialize(name, '', {
        path: '/',
        expires: new Date(0),
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    })
    res.setHeader('Set-Cookie', expired)
}

// Helper để xóa nhiều cookies cùng lúc
export const clearCookies = (res: NextApiResponse, names: string[]) => {
    const expiredCookies = names.map((name) =>
        serialize(name, '', {
            path: '/',
            expires: new Date(0),
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        })
    )
    res.setHeader('Set-Cookie', expiredCookies)
}
