import { Suspense } from "react";
import ConsultationContent from "./ConsultationContent";

export default function ConsultationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
      <p className="text-stone-400 font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        Loading consultation...
      </p>
    </div>}>
      <ConsultationContent />
    </Suspense>
  );
}