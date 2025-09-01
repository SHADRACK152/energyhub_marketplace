import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, options = {}) => {
    setToast({ message, ...options });
    setTimeout(() => setToast(null), options.duration || 2500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-primary text-white rounded-lg shadow-lg animate-fade-in-up">
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}
