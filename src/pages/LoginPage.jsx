import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { CreditCard, Fingerprint, Lock, LogIn, ArrowLeft } from 'lucide-react'
import { useHBAuth } from '../hooks/useHBAuth.js'
import { extractError } from '../utils/format.js'
import Alert from '../components/ui/Alert.jsx'

// ✅ CORREGIDO: Importación nativa de imágenes para Vite/Vercel
import logoInterbank from '../img/Interbank_logo.png'
import fondoPlaya from '../img/Fondo_Playa.jpg'

export default function LoginPage() {
  const { login, isAuthenticated } = useHBAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [tarjeta, setTarjeta] = useState(location.state?.tarjeta || '')
  const [dni, setDni] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate('/inicio', { replace: true })
  }, [isAuthenticated, navigate])

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!/^\d{8}$/.test(dni.trim())) {
      setError('Ingresa un DNI válido de 8 dígitos.')
      return
    }

    setLoading(true)
    try {
      await login(tarjeta.trim(), password)
      navigate('/inicio', { replace: true })
    } catch (err) {
      setError(extractError(err, 'No se pudo iniciar sesión.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      minHeight: '100vh',
      background: '#fff'
    }}>
      {/* Izquierda: Formulario */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        background: '#fff'
      }}>
        <div style={{ maxWidth: 360, width: '100%' }}>
          {/* ✅ CORREGIDO: Uso de la variable importada */}
          <img src={logoInterbank} alt="Interbank" style={{ height: 50, marginBottom: 40 }} />

          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: 'var(--hb-text)' }}>Inicia sesión</h1>
          <p style={{ fontSize: 14, color: 'var(--hb-muted)', marginBottom: 28 }}>Accede a tu banca digital</p>

          <Alert tipo="error">{error}</Alert>

          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="tarjeta" style={{ fontSize: 13, fontWeight: 600, marginBottom: 7, color: 'var(--hb-text)' }}>N° de tarjeta de ahorros</label>
              <div style={{ position: 'relative' }}>
                <CreditCard size={18} style={iconStyle} />
                <input
                  id="tarjeta"
                  className="hb-input"
                  style={{ paddingLeft: 40, borderRadius: 10 }}
                  placeholder="Ej. cli000001 o DNI"
                  autoComplete="username"
                  value={tarjeta}
                  onChange={(e) => setTarjeta(e.target.value)}
                  autoFocus
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="dni" style={{ fontSize: 13, fontWeight: 600, marginBottom: 7, color: 'var(--hb-text)' }}>DNI</label>
              <div style={{ position: 'relative' }}>
                <Fingerprint size={18} style={iconStyle} />
                <input
                  id="dni"
                  className="hb-input"
                  style={{ paddingLeft: 40, borderRadius: 10 }}
                  placeholder="8 dígitos"
                  inputMode="numeric"
                  maxLength={8}
                  autoComplete="off"
                  value={dni}
                  onChange={(e) => setDni(e.target.value.replace(/\D/g, ''))}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="password" style={{ fontSize: 13, fontWeight: 600, marginBottom: 7, color: 'var(--hb-text)' }}>Clave de Internet</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={iconStyle} />
                <input
                  id="password"
                  type="password"
                  className="hb-input"
                  style={{ paddingLeft: 40, borderRadius: 10 }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="hb-btn" style={{ width: '100%', justifyContent: 'center', marginTop: 6 }} disabled={loading}>
              <LogIn size={18} />
              {loading ? 'Ingresando…' : 'Ingresar'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 18 }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--hb-primary)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              <ArrowLeft size={15} /> Volver al inicio
            </Link>
          </div>
        </div>
      </div>

      {/* Derecha: Imagen de playa */}
      {/* ✅ CORREGIDO: Uso dinámico de la imagen inyectada */}
      <div style={{
        backgroundImage: `url(${fondoPlaya})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }} />
    </div>
  )
}

const iconStyle = {
  position: 'absolute',
  left: 12,
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#9ca3af',
  pointerEvents: 'none',
}