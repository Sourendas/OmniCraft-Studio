import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Lock, ShieldCheck } from 'lucide-react';
import { downloadBlob } from '../../lib/utils';

const MIN_LENGTH = 6;

export const ProtectPdfPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    e.target.value = '';
    if (!picked) return;
    if (picked.type !== 'application/pdf' && !picked.name.toLowerCase().endsWith('.pdf')) {
      setStatus('Please choose a PDF file.');
      return;
    }
    setFile(picked);
    setStatus(`${picked.name} selected. Set a password, then protect it.`);
  };

  const tooShort = password.length > 0 && password.length < MIN_LENGTH;
  const mismatch = confirm.length > 0 && confirm !== password;
  const ready = !!file && password.length >= MIN_LENGTH && confirm === password && !busy;

  const onProtect = async () => {
    if (!file || !ready) return;
    setBusy(true);
    setStatus('Encrypting with AES-256 in this tab...');
    try {
      // Loaded on demand: this pdf-lib fork adds encryption and is only needed on this page.
      const { PDFDocument } = await import('@cantoo/pdf-lib');
      const source = await file.arrayBuffer();
      const probe = await PDFDocument.load(source, { ignoreEncryption: true });
      if (probe.isEncrypted) {
        setStatus('This PDF already has a password. Remove it in your PDF reader first, then protect it again.');
        return;
      }
      const doc = await PDFDocument.load(source);
      doc.encrypt({ userPassword: password, ownerPassword: password });
      const bytes = await doc.save();
      const base = file.name.replace(/\.pdf$/i, '') || 'document';
      downloadBlob(new Blob([bytes as BlobPart], { type: 'application/pdf' }), `${base}-protected.pdf`);
      setStatus(`Downloaded ${base}-protected.pdf. It opens only with the password you set. Keep a copy of the original.`);
    } catch (err) {
      console.error(err);
      setStatus('Could not protect this PDF. It may be damaged, or this browser may not support Web Crypto.');
    } finally {
      setBusy(false);
    }
  };

  const inputClass = 'mt-1 w-full px-3.5 py-2 rounded-xl bg-[#FFF7ED] border border-slate-200';

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-[#EA580C] mb-4">
        <ArrowLeft className="w-3.5 h-3.5" /> All tools
      </Link>
      <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540]">Password protect a PDF</h1>
      <p className="mt-2 text-sm text-slate-600 font-medium">
        Encrypt a PDF with AES-256 so it opens only with your password. Encryption runs in this tab with Web Crypto; the file and the password
        are not sent to FileTools Kit.
      </p>
      <p className="mt-2 text-xs text-slate-500">
        Related: <Link className="text-[#C2410C] font-bold underline" to="/pdf-suite">PDF Suite</Link>
        {' · '}
        <Link className="text-[#C2410C] font-bold underline" to="/guides/password-protect-pdf-in-browser">Guide</Link>
      </p>
      {status && (
        <div role="status" className="mt-4 p-3.5 rounded-2xl bg-[#FFEDD5] border border-[#FDBA74] text-xs text-[#C2410C] font-bold">
          {status}
        </div>
      )}
      <div className="mt-6 rounded-3xl bg-white border border-slate-200 p-6 space-y-4">
        <label className="block cursor-pointer">
          <span className="flex items-center justify-center w-full py-3 rounded-full bg-gradient-to-r from-[#EA580C] to-[#C2410C] text-white text-xs font-black">
            {file ? 'Choose a different PDF' : 'Choose a PDF'}
          </span>
          <input type="file" accept="application/pdf,.pdf" className="hidden" disabled={busy} onChange={onPick} data-testid="pdf-input" />
        </label>

        <label className="block text-xs font-bold text-slate-700">
          Password (at least {MIN_LENGTH} characters)
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className={inputClass}
              data-testid="password"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-slate-500"
              aria-label={show ? 'Hide password' : 'Show password'}
            >
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </label>
        {tooShort && <p className="text-[11px] text-rose-700 font-bold">Use at least {MIN_LENGTH} characters.</p>}

        <label className="block text-xs font-bold text-slate-700">
          Confirm password
          <input
            type={show ? 'text' : 'password'}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
            className={inputClass}
            data-testid="password-confirm"
          />
        </label>
        {mismatch && <p className="text-[11px] text-rose-700 font-bold">The passwords do not match.</p>}

        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3.5 text-[11px] text-amber-900 font-medium space-y-1">
          <p>
            <strong>There is no password recovery.</strong> If you forget it, FileTools Kit cannot open the file for you. Keep the unprotected
            original somewhere safe.
          </p>
          <p>AES-256 needs a reasonably modern PDF reader, such as current Adobe Acrobat Reader or the viewer built into Chrome, Edge, or Firefox. Very old readers may not open it.</p>
        </div>

        <button
          type="button"
          onClick={onProtect}
          disabled={!ready}
          className="w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-black text-emerald-800 disabled:opacity-50"
        >
          <Lock className="w-3.5 h-3.5" /> {busy ? 'Working...' : 'Protect PDF'}
        </button>

        <p className="text-[11px] text-slate-600 flex items-start gap-2 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          Files and passwords stay in this tab. FileTools Kit does not run an upload API for these documents.
        </p>
      </div>
    </div>
  );
};
