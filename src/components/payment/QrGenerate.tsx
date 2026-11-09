import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

interface QrGenerateProps {
  total: number;
}

const QrGenerate = ({ total }: QrGenerateProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const upiId = import.meta.env.VITE_SCHOOL_UPI_ID?.trim();
  const schoolName = import.meta.env.VITE_SCHOOL_UPI_NAME?.trim();

  if (!upiId || !schoolName) {
    return (
      <p role="alert" className="text-xs text-red-600">
        School UPI ID and name are not configured.
      </p>
    );
  }

  if (!Number.isFinite(total) || total < 0.01) {
    return (
      <p role="alert" className="text-xs text-red-600">
        Enter a valid payment amount of at least ₹0.01.
      </p>
    );
  }

  const upiUrl = `upi://pay?${new URLSearchParams({
    pa: upiId,
    pn: schoolName,
    am: total.toFixed(2),
    cu: "INR",
  }).toString()}`;

  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold text-slate-700">
        UPI payment: ₹{total.toFixed(2)}
      </p>

      <p className="text-xs text-slate-500">
        Payee: {schoolName} ({upiId})
      </p>

      <div className="relative mx-auto w-fit overflow-hidden rounded-xl border border-slate-200 bg-white p-3">
        <QRCodeSVG
          value={upiUrl}
          size={180}
          title="School UPI payment QR"
          className="opacity-25"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md transition hover:bg-blue-700"
          >
            Preview QR
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="qr-preview-title"
        onClick={(event) => event.stopPropagation()}
        className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-slate-800 shadow-xl backdrop:bg-slate-900/60"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 id="qr-preview-title" className="text-lg font-bold">
              Scan to pay
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Open a UPI app and scan this QR code.
            </p>
          </div>

          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close QR preview"
            className="rounded-lg px-2 py-1 text-lg text-slate-500 hover:bg-slate-100"
          >
            ×
          </button>
        </div>

        <div className="mt-5 flex flex-col items-center gap-3">
          <QRCodeSVG
            value={upiUrl}
            size={220}
            title="School UPI payment QR"
            className="max-w-full"
          />

          <p className="text-xl font-bold text-slate-900">
            ₹{total.toFixed(2)}
          </p>

          <p className="text-center text-xs text-slate-500">
            {schoolName}
            <br />
            {upiId}
          </p>
        </div>
      </dialog>
    </div>
  );
};

export default QrGenerate;
