/**
 * Logo de marca Interbank.
 * Isotipo: cuadrado azul marino con elemento blanco inclinado dentro.
 *
 * @param {Object} props
 * @param {number}  [props.size=44]          Tamaño del isotipo en px.
 * @param {boolean} [props.wordmark=true]    Mostrar el texto "Interbank".
 * @param {'dark'|'light'} [props.variant='dark'] Color del texto.
 * @param {string}  [props.subtitle='BANCA POR INTERNET'] Texto secundario bajo el nombre.
 */

export default function Logo({
  size = 44,
  wordmark = true,
  variant = 'dark',
  subtitle = 'BANCA POR INTERNET',
}) {
  const textColor = variant === 'light' ? '#ffffff' : '#00B84D'
  const subColor = variant === 'light' ? 'rgba(255,255,255,.75)' : '#757575'
  const nameSize = Math.round(size * 0.5)
  const subSize = Math.max(9, Math.round(size * 0.23))

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Interbank"
        role="img"
      >
        {/* Blue square background */}
        <rect x="10" y="10" width="80" height="80" rx="12" fill="#003D7A" />
        
        {/* White/light element - rotated square */}
        <g transform="translate(50, 50) rotate(-20)">
          <rect x="-22" y="-22" width="44" height="44" fill="#FFFFFF" opacity="0.9" />
        </g>
        
        {/* Green accent corner */}
        <g transform="translate(50, 50) rotate(-20)">
          <rect x="-22" y="-22" width="44" height="8" fill="#00B84D" opacity="0.95" />
        </g>
      </svg>

      {wordmark && (
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.04 }}>
          <span
            style={{
              fontWeight: 800,
              fontSize: nameSize,
              color: textColor,
              letterSpacing: '-0.5px',
            }}
          >
            Interbank
          </span>
          {subtitle && (
            <span
              style={{
                fontSize: subSize,
                fontWeight: 700,
                color: subColor,
                letterSpacing: '1px',
              }}
            >
              {subtitle}
            </span>
          )}
        </span>
      )}
    </span>
  )
}
