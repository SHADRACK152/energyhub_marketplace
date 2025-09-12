import React, { useState } from 'react';
import Icon from './AppIcon';
import { useTranslation } from '../utils/i18n.jsx';

const suggestions = [
  { id: 1, textKey: 'ena.greet' },
  { id: 2, textKey: 'ena.howToBuy' },
  { id: 3, textKey: 'ena.howToSell' },
  { id: 4, textKey: 'ena.contactSupport' }
];

export default function EnaChatbot() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'ena', text: t('ena.welcome') }
  ]);
  const [input, setInput] = useState('');

  const send = (text) => {
    if (!text) return;
    setMessages((m) => [...m, { from: 'user', text }]);
    // Simulate a quick canned response
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'ena', text: t('ena.cannedResponse') }]);
    }, 600);
    setInput('');
  };

  // Expose global helpers so external UI (headers, dashboards) can open/close the chat
  React.useEffect(() => {
    // eslint-disable-next-line no-undef
    window.toggleEnaChat = () => setOpen((s) => !s);
    // eslint-disable-next-line no-undef
    window.openEnaChat = () => setOpen(true);
    // eslint-disable-next-line no-undef
    window.closeEnaChat = () => setOpen(false);

    return () => {
      // eslint-disable-next-line no-undef
      try { delete window.toggleEnaChat; } catch (e) {}
      try { delete window.openEnaChat; } catch (e) {}
      try { delete window.closeEnaChat; } catch (e) {}
    };
  }, []);

  return (
    <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 60 }}>
      <div className="bg-primary-foreground text-primary rounded-full shadow-lg w-14 h-14 flex items-center justify-center cursor-pointer" onClick={() => setOpen(!open)} title={t('ena.open')}>
        <Icon name="MessageCircle" size={20} className="text-primary" />
      </div>

      {open && (
        <div className="w-80 h-96 bg-background rounded-lg shadow-xl mt-3 overflow-hidden flex flex-col">
          <div className="p-3 border-b"> <strong>{t('ena.title')}</strong></div>
          <div className="p-3 flex-1 overflow-auto space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={m.from === 'ena' ? 'text-sm text-left' : 'text-sm text-right'}>
                <div className={m.from === 'ena' ? 'inline-block bg-primary-foreground/5 rounded px-3 py-1' : 'inline-block bg-primary-foreground/10 rounded px-3 py-1'}>{m.text}</div>
              </div>
            ))}

            <div className="mt-2 border-t pt-2 space-y-2">
              {suggestions.map((s) => (
                <button key={s.id} onClick={() => send(t(s.textKey))} className="text-xs text-primary-foreground/80 hover:underline">
                  {t(s.textKey)}
                </button>
              ))}
            </div>
          </div>

          <div className="p-2 border-t">
            <div className="flex items-center space-x-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 border rounded px-2 py-1 text-sm bg-transparent" placeholder={t('ena.placeholder')} />
              <button onClick={() => send(input)} className="bg-primary text-primary-foreground rounded px-3 py-1 text-sm">{t('ena.send')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
