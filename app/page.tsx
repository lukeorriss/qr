import { QRCodeGenerator } from "@/components/qr-generator";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="border-b-2 border-black bg-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-primary border-2 border-black text-black text-sm font-bold font-mono uppercase tracking-wider mb-4 shadow-[3px_3px_0_0_rgb(0,0,0)]">
              <Sparkles className="h-4 w-4" />
              <span>FREE & CUSTOMISABLE</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mono uppercase tracking-tighter text-balance leading-tight">
              CREATE BEAUTIFUL
              <br />
              QR CODES
            </h1>
            <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-bold leading-relaxed">
              GENERATE CUSTOM QR CODES WITH ADVANCED STYLING OPTIONS, CENTRE LOGOS, AND MULTIPLE DATA TYPES. PERFECT FOR MARKETING, BUSINESS CARDS, AND MORE.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <QRCodeGenerator />
      </div>
    </main>
  );
}
