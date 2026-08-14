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
        className="relative rounded-3xl overflow-hidden font-display card-shadow transition-transform duration-400 id-card"
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
        <div className="relative h-44 overflow-hidden" style={{ backgroundColor: '#0a2e12' }}>
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

        <div className="flex justify-center -mt-14 relative z-10 mb-3">
          <div className="w-28 h-28 rounded-full gold-ring ring-spin p-[3px]"
            style={{ boxShadow: '0 0 24px rgba(245,197,24,0.35), 0 8px 32px rgba(0,0,0,0.6)' }}
          >
            <div className="w-full h-full rounded-full overflow-hidden ring-counter"
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
                <div className="w-full h-full flex flex-col items-center justify-center gap-1"
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

        <div className="flex flex-col items-center px-5 pb-0">
          <div
            className="text-center font-black leading-tight"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: name ? '1.4rem' : '1rem',
              color: name ? '#fffef5' : 'rgba(255,254,245,0.38)',
              fontStyle: name ? 'normal' : 'italic',
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
              letterSpacing: '-0.01em',
            }}
          >
            {name || 'Your Name'}
          </div>

          {/* Team Name display */}
          {teamName && (
            <div
              className="text-center font-bold text-xs uppercase tracking-widest text-hh-pink mt-1 mb-2"
              style={{ letterSpacing: '0.1em' }}
            >
              Team: {teamName}
            </div>
          )}

          <div
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 mt-2 mb-4 text-xs font-bold uppercase tracking-wide"
            style={{
              background: 'linear-gradient(135deg, rgba(245,197,24,0.18), rgba(245,197,24,0.06))',
              border: '1.5px solid rgba(245,197,24,0.45)',
              color: builderClass ? '#ffe55a' : 'rgba(255,254,245,0.38)',
              fontStyle: builderClass ? 'normal' : 'italic',
              textShadow: builderClass ? '0 0 12px rgba(245,197,24,0.35)' : 'none',
              letterSpacing: '0.06em',
            }}
          >
            {builderClass && <span>⚡</span>}
            {builderClass || 'Click ⟳ to generate'}
          </div>

          <div className="flex items-center gap-2 w-full mb-4">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,197,24,0.25))' }} />
            <span style={{ color: 'rgba(245,197,24,0.5)', fontSize: '0.45rem' }}>◆</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(270deg, transparent, rgba(245,197,24,0.25))' }} />
          </div>

          <div className="flex flex-col items-center w-full mb-5 px-1">
            <span
              className="shrink-0 font-bold uppercase tracking-widest mb-1"
              style={{ fontSize: '0.5rem', color: 'rgba(255,254,245,0.4)' }}
            >
              Stack&nbsp;/&nbsp;Role
            </span>
            <span
              className="font-semibold truncate text-center"
              style={{
                fontSize: '0.85rem',
                color: stack ? '#fffef5' : 'rgba(255,254,245,0.35)',
                fontStyle: stack ? 'normal' : 'italic',
              }}
            >
              {stack || 'e.g. Fullstack · React · Go'}
            </span>
          </div>
        </div>

        <div
          className="flex items-center justify-between px-5 py-3"
          style={{
            borderTop: '1px solid rgba(245,197,24,0.18)',
            background: 'linear-gradient(135deg, rgba(13,61,31,0.8), rgba(6,15,9,0.95))',
          }}
        >
          <div className="flex items-center gap-1.5" style={{ fontSize: '0.6rem', color: 'rgba(255,254,245,0.6)', fontWeight: 500 }}>
            <span>📍</span>
            <span>Goa, India&nbsp;·&nbsp;28–31 Oct 2026</span>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span className="font-extrabold" style={{ fontSize: '0.65rem', color: '#ff4db8', letterSpacing: '0.04em' }}>
              #FrameInGoa
            </span>
            <span style={{ fontSize: '0.52rem', color: 'rgba(255,254,245,0.35)', letterSpacing: '0.08em' }}>
              hhgoa.com
            </span>
          </div>
        </div>

        <div className="h-1 rainbow-bar" />
      </div>
    );
  }
);

IdCard.displayName = 'IdCard';
export default IdCard;
