// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// proteksi untuk rute-rute ini saja
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/dosen/:path*',
    '/users/:path*',
    '/unit-kerja/:path*',
  ],
}

/**
 * Decode payload JWT (base64url → JSON).
 * Menggunakan atob(), so bisa jalan di Edge Runtime.
 */
function decodeJwtPayload(token: string): Record<string, any> | null {
  const parts = token.split('.')
  if (parts.length !== 3) return null

  try {
    // ganti URL-safe base64 ke base64 biasa
    const base64 = parts[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/')
    // decode base64 → percent-encoding → utf8 string
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => {
          const code = c.charCodeAt(0).toString(16).padStart(2, '0')
          return '%' + code
        })
        .join('')
    )
    return JSON.parse(json)
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { cookies, nextUrl } = request
  const { origin, pathname } = nextUrl

  // 1. Cek token
  const token = cookies.get('access_token')?.value
  if (!token) {
    // belum login → ke /login
    return NextResponse.redirect(new URL('/login', origin))
  }

  // 2. Hanya perlu cek role untuk rute‐rute matcher di atas
  //    (config.matcher sudah men‐capture /dashboard, /dosen, dll)
  //    Jadi kita tinggal decode payload & ambil role-nya:
  const payload = decodeJwtPayload(token)
  const role: string = payload?.role

  // 3. Tentukan allowed paths berdasar role
  let allowedPaths: string[] = []
  switch (role) {
    case 'admin':
      // admin TIDAK boleh /dashboard, hanya boleh akses area admin saja
      allowedPaths = ['/users', '/unit-kerja']               // ← sesuaikan kalau route admin-mu beda
      break
    case 'dosen':
      // dosen hanya boleh lihat dashboard
      allowedPaths = ['/dashboard']
      break
    case 'kaprodi':
      // kaprodi boleh lihat dashboard & dosen
      allowedPaths = ['/dashboard', '/dosen']
      break
    default:
      // selain role di atas → kosong (langsung redirect ke /login)
      allowedPaths = []
  }

  // 4. Kalau path yang diakses tidak ada di allowedPaths → redirect
  const isAllowed = allowedPaths.some(p => pathname.startsWith(p))
  if (!isAllowed) {
    // redirect ke yang pertama di allowedPaths, atau /login kalau kosong
    const target = allowedPaths[0] ?? '/login'
    return NextResponse.redirect(new URL(target, origin))
  }

  // 5. Sisanya → ijinkan
  return NextResponse.next()
}
