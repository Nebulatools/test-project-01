import { useAuth } from '../hooks/auth/useAuth'
import ProfileForm from '../components/auth/profile-form'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="auth-page auth-page-sm">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="auth-page auth-page-sm">
      <div className="auth-page-container">
        <h1 className="auth-page-title">
          Mi Perfil
        </h1>
        <p className="auth-page-subtitle">
          Administra tu información personal
        </p>
      </div>

      <div className="auth-form-container">
        <ProfileForm 
          initialData={{
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            bio: user.bio || ''
          }}
        />
      </div>
    </div>
  )
}