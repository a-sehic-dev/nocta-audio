import { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Toast() {
  const toast = useStore((s) => s.toast);
  const clearToast = useStore((s) => s.clearToast);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(clearToast, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, clearToast]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-400" />,
    error: <XCircle className="w-5 h-5 text-red-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />,
  };

  const bgColors = {
    success: 'bg-green-900/90 border-green-500/30',
    error: 'bg-red-900/90 border-red-500/30',
    info: 'bg-blue-900/90 border-blue-500/30',
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-slide-up">
      <div className={`flex items-center gap-3 px-5 py-4 rounded-xl border backdrop-blur-sm ${bgColors[toast.type]}`}>
        {icons[toast.type]}
        <p className="text-white text-sm font-medium">{toast.message}</p>
        <button onClick={clearToast} className="text-white/50 hover:text-white ml-2">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
