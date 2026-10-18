import type { ReactNode } from 'react';
import { X } from 'lucide-react';

export function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return <button className="icon-btn" aria-label={label} title={label} onClick={onClick}>{children}</button>;
}

export function Modal({ title, close, children }: { title: string; close: () => void; children: ReactNode }) {
  return (
    <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) close(); }}>
      <section className="modal">
        <div className="modal-head">
          <h2>{title}</h2>
          <IconButton label="Close dialog" onClick={close}><X size={18}/></IconButton>
        </div>
        {children}
      </section>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="field"><span>{label}</span>{children}</label>;
}
