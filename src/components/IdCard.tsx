import { forwardRef } from 'react';

interface IdCardProps {
  photoUrl: string | null;
  name: string;
  stack: string;
  builderClass: string;
  teamName?: string;
}

const IdCard = forwardRef<HTMLDivElement, IdCardProps>(
  ({ photoUrl, name, stack, builderClass, teamName }, ref) => {
    return (
      <div
        ref={ref}
        className="relative rounded-3xl overflow-hidden font-display card-shadow id-card"
        style={{
          backgroundColor: '#061a0b',
          fontFamily: "'Outfit', sans-serif",
          width: '320px',
          height: '480px',
          minWidth: '320px',
          maxWidth: '320px',
          minHeight: '480px',
          maxHeight: '480px',
        }}
      >
        {/* Brand banner */}
        <div className="relative overflow-hidden" style={{ height: '140px', backgroundColor: '#0a2e12' }}>
          <img
            src="/hh-goa-brand.webp"
            alt="Hacker House Goa 2026"
            className="w-full h-full object-cover object-[center_20%]"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 brand-vignette" />
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full z-10"
            style={{
              background: 'rgba(6,15,9,0.7)',
              border: '2px solid rgba(245,197,24,0.6)',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.8)',
            }}
          />
        </div>

        {/* Avatar */}
        <div className="flex justify-center relative z-10" style={{ marginTop: '-56px', marginBottom: '8px' }}>
          <div
            className="w-28 h-28 rounded-full gold-ring ring-spin p-[3px]"
            style={{ boxShadow: '0 0 24px rgba(245,197,24,0.35), 0 8px 32px rgba(0,0,0,0.6)' }}
          >
            <div
              className="w-full h-full rounded-full overflow-hidden ring-counter"
              style={{ border: '3px solid #061a0b', backgroundColor: '#0f3d1a' }}
            >
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={name || 'Builder'}
                  className="w-full h-full object-cover object-top"
                  crossOrigin="anonymous"
                />
              ) : (
                <div
                  className="w-full h-full flex flex-col items-center justify-center gap-1"
                  style={{ color: 'rgba(255,254,245,0.38)', fontSize: '0.55rem', letterSpacing: '0.05em', textAlign: 'center' }}
                >
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                  <span>Upload<br/>photo</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Text content — explicit width: 100% on every text child prevents flex shrink-to-content wrapping */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px' }}>

          {/* Name — always single line */}
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1.15rem',
              fontWeight: 900,
              lineHeight: 1.1,
              textAlign: 'center',
              color: name ? '#fffef5' : 'rgba(255,254,245,0.38)',
              fontStyle: name ? 'normal' : 'italic',
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
              marginBottom: teamName ? '4px' : '6px',
            }}
          >
            {name || 'Your Name'}
          </div>

          {/* Team Name — single line */}
          {teamName && (
            <div
              style={{
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                textAlign: 'center',
                color: '#ff4db8',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
                marginBottom: '6px',
              }}
            >
              Team: {teamName}
            </div>
          )}

          {/* Builder Class pill — always single line */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              borderRadius: '9999px',
              padding: '6px 16px',
              marginTop: '2px',
              marginBottom: '10px',
              background: 'linear-gradient(135deg, rgba(245,197,24,0.18), rgba(245,197,24,0.06))',
              border: '1.5px solid rgba(245,197,24,0.45)',
              color: builderClass ? '#ffe55a' : 'rgba(255,254,245,0.38)',
              fontStyle: builderClass ? 'normal' : 'italic',
              textShadow: builderClass ? '0 0 12px rgba(245,197,24,0.35)' : 'none',
              letterSpacing: '0.06em',
              fontSize: '0.72rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
            }}
          >
            {builderClass && <span style={{ flexShrink: 0 }}>⚡</span>}
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {builderClass || 'Click \u27f3 to generate'}
            </span>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', marginBottom: '10px' }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(245,197,24,0.25))' }} />
            <span style={{ color: 'rgba(245,197,24,0.5)', fontSize: '0.45rem' }}>◆</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(270deg, transparent, rgba(245,197,24,0.25))' }} />
          </div>

          {/* Stack / Role — single line */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '3px' }}>
            <span style={{ fontSize: '0.5rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.14em', color: 'rgba(255,254,245,0.4)' }}>
              Stack&nbsp;/&nbsp;Role
            </span>
            <span
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                textAlign: 'center',
                width: '100%',
                color: stack ? '#fffef5' : 'rgba(255,254,245,0.35)',
                fontStyle: stack ? 'normal' : 'italic',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {stack || 'e.g. Fullstack \u00b7 React \u00b7 Go'}
            </span>
          </div>
        </div>

        {/* Footer pinned to bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '4px',
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 20px',
            borderTop: '1px solid rgba(245,197,24,0.18)',
            background: 'linear-gradient(135deg, rgba(13,61,31,0.8), rgba(6,15,9,0.95))',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.58rem', color: 'rgba(255,254,245,0.6)', fontWeight: 500 }}>
            <span>📍</span>
            <span>Goa, India&nbsp;·&nbsp;28–31 Oct 2026</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#ff4db8', letterSpacing: '0.04em' }}>
              #FrameInGoa
            </span>
            <span style={{ fontSize: '0.52rem', color: 'rgba(255,254,245,0.35)', letterSpacing: '0.08em' }}>
              hhgoa.com
            </span>
          </div>
        </div>

        <div className="h-1 rainbow-bar absolute bottom-0 left-0 right-0" />
      </div>
    );
  }
);

IdCard.displayName = 'IdCard';
export default IdCard;
