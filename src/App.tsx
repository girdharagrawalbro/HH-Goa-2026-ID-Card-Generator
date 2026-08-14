import { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { Upload, RefreshCw, Download, Image as ImageIcon } from 'lucide-react';
import IdCard from './components/IdCard';
import { getRandomBuilderClass } from './data/builderClasses';

interface Toast { message: string; icon: string; show: boolean; }

export default function App() {
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [stack, setStack] = useState('');
  const [teamName, setTeamName] = useState('');
  const [builderClass, setBuilderClass] = useState<string>(() => getRandomBuilderClass());
  const [shuffleSpinning, setShuffleSpinning] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [activeAction, setActiveAction] = useState<'download' | 'share' | null>(null);
  const [toast, setToast] = useState<Toast>({ message: '', icon: '', show: false });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const showToast = useCallback((message: string, icon = '✅') => {
    setToast({ message, icon, show: true });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 3200);
  }, []);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/') && !file.name.match(/\.(heic|heif)$/i)) {
      showToast('Please upload an image file', '⚠️');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setPhotoUrl(e.target?.result as string);
    reader.readAsDataURL(file);
  }, [showToast]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = '';
  }, [processFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleShuffle = useCallback(() => {
    setShuffleSpinning(true);
    setBuilderClass(prev => getRandomBuilderClass(prev));
    setTimeout(() => setShuffleSpinning(false), 420);
  }, []);

  const generateImage = useCallback(async (): Promise<string | null> => {
    if (!cardRef.current) return null;
    try {
      const options = {
        cacheBust: true,
        pixelRatio: 3, // Crisp high-res export
        width: 320,
        height: 480,
        style: {
          width: '320px',
          height: '480px',
          transform: 'scale(1)',
          transformOrigin: 'top left',
        }
      };
      // Prime capture cache
      await toPng(cardRef.current, options);
      const dataUrl = await toPng(cardRef.current, {
        ...options,
        backgroundColor: '#061a0b',
      });
      return dataUrl;
    } catch (err) {
      console.error(err);
      showToast('Could not generate image. Try again.', '❌');
      return null;
    }
  }, [showToast]);

  const handleDownload = useCallback(async () => {
    if (!photoUrl) {
      showToast('Please upload a photo first!', '⚠️');
      return;
    }
    if (!name.trim()) {
      showToast('Please enter your name!', '⚠️');
      return;
    }
    setActiveAction('download');
    const dataUrl = await generateImage();
    setActiveAction(null);
    if (!dataUrl) return;
    const safe = (name.trim() || 'builder').replace(/\s+/g, '-').toLowerCase();
    const a = document.createElement('a');
    a.download = `hh-goa-2026-${safe}.png`;
    a.href = dataUrl;
    a.click();
    showToast('Badge downloaded! 🎉', '🎉');
  }, [generateImage, name, photoUrl, showToast]);

  const handleShareToX = useCallback(async () => {
    if (!photoUrl) {
      showToast('Please upload a photo first!', '⚠️');
      return;
    }
    if (!name.trim()) {
      showToast('Please enter your name!', '⚠️');
      return;
    }
    setActiveAction('share');
    const dataUrl = await generateImage();
    if (dataUrl) {
      setPreviewUrl(dataUrl);
      const safe = (name.trim() || 'builder').replace(/\s+/g, '-').toLowerCase();
      const a = document.createElement('a');
      a.download = `hh-goa-2026-${safe}.png`;
      a.href = dataUrl;
      a.click();
      setIsModalOpen(true);
    }
    setActiveAction(null);
  }, [generateImage, name, photoUrl]);

  const handleProceedToTwitter = useCallback(async () => {
    if (previewUrl) {
      try {
        const response = await fetch(previewUrl);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob })
        ]);
        showToast('Badge copied to clipboard! 🎉', '🎉');
      } catch (err) {
        console.warn('Clipboard write failed:', err);
      }
    }
    setTimeout(() => {
      const text = encodeURIComponent(
        `Locked in for Hacker House Goa 2026! 🌴🛠️\n\n` +
        `Builder Class: ${builderClass}\n` +
        (stack ? `Stack: ${stack}\n` : '') +
        (teamName ? `Team: ${teamName}\n\n` : '\n') +
        `Ready to ship code on the beach from Oct 28–31. No fluff, just pure build station. 🏖️\n\n` +
        `#FrameInGoa @247pmstudio\n` +
        `hhgoa.com`
      );
      window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank', 'noopener');
      setIsModalOpen(false);
    }, 100);
  }, [previewUrl, builderClass, stack, teamName, showToast]);

  return (
    <div className="min-h-screen flex flex-col relative z-1">
      <header className="px-6 py-4 flex items-center justify-between border-b border-[rgba(245,197,24,0.35)] bg-[#060f09]/85 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg border border-hh-gold-dark overflow-hidden">
            <img src="/hh-goa-brand.webp" alt="HH Goa" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col leading-none">
            <div className="font-display text-sm font-extrabold text-hh-gold tracking-wider uppercase">HH Goa 2026</div>
            <div className="text-[0.62rem] text-rgba(255,254,245,0.38) tracking-[0.18em] uppercase mt-0.5">ID Card Generator</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-hh-pink/12 border border-hh-pink/35 rounded-full px-3.5 py-1.5 text-[0.7rem] font-bold text-hh-pink-light tracking-wide uppercase">
          #FrameInGoa
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 md:grid-cols-2">
        <section className="flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-[rgba(245,197,24,0.35)] bg-[#060f09]/30">
          <div className="id-card-scaler-wrap before:content-[''] before:block before:w-[3px] before:h-7 before:bg-gradient-to-b before:from-transparent before:to-hh-gold-dark before:mx-auto fade-up">
            <IdCard
              ref={cardRef}
              photoUrl={photoUrl}
              name={name}
              stack={stack}
              builderClass={builderClass}
              teamName={teamName}
            />
          </div>
        </section>

        <section className="py-4 px-8 md:py-4 md:px-7 flex flex-col justify-center gap-4 overflow-y-auto bg-[#060f09]/20">
          <div className="flex flex-col gap-2">
            <h1 className="font-display text-3xl font-extrabold leading-none text-[#fffef5] tracking-tight">
              Your Badge,<br /><span className="text-hh-gold">Your Vibe.</span>
            </h1>
            <p className="text-[0.83rem] text-[#fffef5]/65 leading-relaxed">
              Upload your photo · fill in your details · download and share on X with{' '}
              <strong className="text-hh-gold">#FrameInGoa</strong>
            </p>
          </div>

          <div
            id="photo-upload-area"
            className={`border-2 border-dashed rounded-2xl p-1 text-center cursor-pointer transition-all duration-300 relative overflow-hidden ${
              dragOver ? 'border-hh-gold bg-hh-gold/5' : 'border-[rgba(245,197,24,0.3)] bg-hh-gold/[0.02]'
            } ${photoUrl ? 'p-2 border-solid border-hh-gold-dark' : ''}`}
            onClick={() => !photoUrl && fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            role="button"
            aria-label="Upload photo"
          >
            {photoUrl ? (
              <div className="relative group">
                <img src={photoUrl} alt="Uploaded" className="w-full max-h-[180px] object-contain rounded-xl" />
                <button
                  className="inline-flex items-center gap-1 mt-2 text-[0.7rem] font-semibold text-hh-gold underline underline-offset-4 cursor-pointer bg-transparent border-none font-body"
                  id="change-photo-btn"
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                >
                  <ImageIcon size={11} /> Change photo
                </button>
              </div>
            ) : (
              <>
                <div className="w-13 h-13 rounded-full bg-hh-gold/9 border border-hh-gold/25 flex items-center justify-center mx-auto mb-3 transition-transform duration-300 hover:scale-110">
                  <Upload size={22} className="text-hh-gold" />
                </div>
                <div className="font-display text-sm font-semibold text-[#fffef5] mb-1">Drop your photo here</div>
                <div className="text-[0.72rem] text-[#fffef5]/38">Click to browse · JPG, PNG, HEIC supported</div>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            id="file-input"
            type="file"
            accept="image/*,.heic,.heif"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#fffef5]/65" htmlFor="name-input">Your Name *</label>
              <input
                id="name-input"
                className="bg-[#0f3d1a]/45 border border-[rgba(245,197,24,0.2)] rounded-xl px-4 py-3 font-body text-[0.92rem] font-medium text-[#fffef5] w-full transition-all duration-250 outline-none focus:border-hh-gold focus:bg-[#0f3d1a]/65 focus:shadow-[0_0_0_3px_rgba(245,197,24,0.09)]"
                type="text"
                placeholder="e.g. Priya Sharma"
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={18}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#fffef5]/65" htmlFor="team-input">Team Name (Optional)</label>
              <input
                id="team-input"
                className="bg-[#0f3d1a]/45 border border-[rgba(245,197,24,0.2)] rounded-xl px-4 py-3 font-body text-[0.92rem] font-medium text-[#fffef5] w-full transition-all duration-250 outline-none focus:border-hh-gold focus:bg-[#0f3d1a]/65 focus:shadow-[0_0_0_3px_rgba(245,197,24,0.09)]"
                type="text"
                placeholder="e.g. Code Sandstorm"
                value={teamName}
                onChange={e => setTeamName(e.target.value)}
                maxLength={18}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#fffef5]/65" htmlFor="stack-input">Stack / Role</label>
              <input
                id="stack-input"
                className="bg-[#0f3d1a]/45 border border-[rgba(245,197,24,0.2)] rounded-xl px-4 py-3 font-body text-[0.92rem] font-medium text-[#fffef5] w-full transition-all duration-250 outline-none focus:border-hh-gold focus:bg-[#0f3d1a]/65 focus:shadow-[0_0_0_3px_rgba(245,197,24,0.09)]"
                type="text"
                placeholder="e.g. Fullstack · Rust · ML"
                value={stack}
                onChange={e => setStack(e.target.value)}
                maxLength={24}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#fffef5]/65" htmlFor="builder-class-input">Builder Class</label>
              <div className="flex gap-2.5 items-center">
                <input
                  id="builder-class-input"
                  className="bg-[#0f3d1a]/45 border border-[rgba(245,197,24,0.2)] rounded-xl px-4 py-3 font-body text-[0.92rem] font-medium text-[#fffef5] flex-1 transition-all duration-250 outline-none focus:border-hh-gold focus:bg-[#0f3d1a]/65 focus:shadow-[0_0_0_3px_rgba(245,197,24,0.09)]"
                  type="text"
                  placeholder="Your builder title"
                  value={builderClass}
                  onChange={e => setBuilderClass(e.target.value)}
                  maxLength={22}
                />
                <button
                  id="shuffle-btn"
                  className={`shrink-0 w-11 h-11 rounded-xl bg-hh-pink/12 border border-hh-pink/35 flex items-center justify-center transition-all duration-250 text-hh-pink-light hover:bg-hh-pink/25 hover:border-hh-pink hover:scale-105 active:scale-95 cursor-pointer ${shuffleSpinning ? 'spinning' : ''}`}
                  onClick={handleShuffle}
                  title="Randomize builder class"
                  aria-label="Generate random builder class"
                >
                  <RefreshCw size={17} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                id="download-btn"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-display text-[0.95rem] font-bold tracking-wide cursor-pointer transition-all duration-300 relative overflow-hidden bg-gradient-to-br from-hh-gold to-[#d4a010] text-[#061a0b] shadow-[0_4px_20px_rgba(245,197,24,0.28)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(245,197,24,0.42)] active:translate-y-0 disabled:opacity-35 disabled:cursor-not-allowed"
                onClick={handleDownload}
                disabled={activeAction !== null}
              >
                {activeAction === 'download' ? (
                  <><div className="btn-spinner" /> Generating…</>
                ) : (
                  <><Download size={17} /> Download Badge</>
                )}
              </button>

              <button
                id="share-x-btn"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-display text-[0.95rem] font-bold tracking-wide cursor-pointer transition-all duration-300 relative overflow-hidden bg-gradient-to-br from-[#1d9bf0] to-[#0c7cd5] text-white shadow-[0_4px_20px_rgba(29,155,240,0.22)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(29,155,240,0.38)] active:translate-y-0 disabled:opacity-35 disabled:cursor-not-allowed"
                onClick={handleShareToX}
                disabled={activeAction !== null}
              >
                {activeAction === 'share' ? (
                  <><div className="btn-spinner" /> Preparing…</>
                ) : (
                  <>Share to X</>
                )}
              </button>
            </div>

            <p className="text-[0.68rem] text-[#fffef5]/38 text-center leading-relaxed">
              Share to X saves your badge first — just attach it to the tweet that opens 🐦
            </p>
          </div>
        </section>
      </main>

      {/* Success Modal */}
      {isModalOpen && previewUrl && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md modal-backdrop-anim">
          <div className="bg-[#061a0b] border border-hh-gold/30 rounded-3xl max-w-sm w-full p-6 flex flex-col items-center gap-5 text-center shadow-[0_24px_64px_rgba(0,0,0,0.8),0_0_40px_rgba(245,197,24,0.15)] modal-content-anim">
            <div>
              <h2 className="font-display text-2xl font-black text-[#fffef5] mb-1">Badge Ready! 🎉</h2>
              <p className="text-[0.78rem] text-[#fffef5]/70 leading-relaxed px-2">
                Your badge is downloaded and copied to your clipboard. Press <strong className="text-hh-gold">Ctrl+V / Paste</strong> on X to attach it!
              </p>
            </div>

            <div className="w-48 shadow-lg rounded-2xl overflow-hidden border border-hh-gold/20">
              <img src={previewUrl} alt="Badge Preview" className="w-full h-auto object-contain" />
            </div>

            <div className="flex flex-col gap-2.5 w-full">
              <button
                onClick={handleProceedToTwitter}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-display text-[0.95rem] font-bold tracking-wide cursor-pointer transition-all duration-300 bg-gradient-to-br from-[#1d9bf0] to-[#0c7cd5] text-white shadow-md hover:-translate-y-0.5"
              >
                Proceed to X (Twitter)
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full py-2.5 text-xs font-semibold text-[#fffef5]/50 hover:text-[#fffef5]/80 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`fixed bottom-7 left-1/2 -translate-x-1/2 bg-[#0a2812]/96 border border-hh-gold-dark rounded-xl px-5.5 py-3 text-[0.83rem] font-semibold text-[#fffef5] flex items-center gap-2 z-[999] backdrop-blur-md shadow-[0_16px_48px_rgba(0,0,0,0.55)] transition-transform duration-400 ease-out whitespace-nowrap ${toast.show ? 'toast-show' : 'translate-y-20 opacity-0'}`} role="status" aria-live="polite">
        <span>{toast.icon}</span>
        {toast.message}
      </div>
    </div>
  );
}
