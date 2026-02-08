import Link from "next/link";
import { Suspense } from "react";
import { toDataURL } from "qrcode";
import { getSiteSettings } from "@/services/siteSettingsService";

export const metadata = {
  title: "تحميل التطبيق",
  description: "حمّل تطبيق Usta على Android و iOS وابدأ خلال دقائق." 
};

function DownloadSkeleton() {
  return (
    <div className="section-padding">
      <div className="container-page grid gap-6 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="skeleton shimmer h-56 rounded-3xl" />
        ))}
      </div>
    </div>
  );
}

async function DownloadContent({ settingsPromise }) {
  const settings = await settingsPromise;
  const androidUrl = settings.androidUrl || "https://play.google.com";
  const iosUrl = settings.iosUrl || "https://apple.com";
  const androidQr = await toDataURL(androidUrl);
  const iosQr = await toDataURL(iosUrl);
  const perks = settings.downloadPerks || [];
  const bullets = settings.downloadBullets || [];
  const androidLabel = settings.downloadAndroidLabel;
  const iosLabel = settings.downloadIosLabel;

  return (
    <div>
      <section className="section-padding">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="section-kicker">{settings.downloadKicker}</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-900 md:text-5xl">{settings.downloadTitle}</h1>
            <p className="mt-4 text-lg text-slate-600">{settings.downloadSubtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {perks.map((perk) => (
                <span key={perk} className="chip">{perk}</span>
              ))}
              {!perks.length && (
                <span className="text-sm text-slate-600">أضف مزايا التحميل من لوحة التحكم.</span>
              )}
            </div>
          </div>

          <div className="card card-muted">
            <h2 className="text-lg font-semibold text-slate-900">{settings.downloadCardTitle}</h2>
            <p className="mt-3 text-sm text-slate-600">{settings.downloadCardBody}</p>
            <div className="mt-6 flex flex-col gap-3 text-sm text-slate-600">
              {bullets.map((bullet) => (
                <span key={bullet}>• {bullet}</span>
              ))}
              {!bullets.length && (
                <span>أضف نقاط بطاقة التحميل من لوحة التحكم.</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-surface">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <div className="card text-center">
            <img src={androidQr} alt="Android QR" className="mx-auto h-40 w-40" />
            <p className="mt-4 text-sm text-slate-600">{androidLabel}</p>
            <Link href={androidUrl} className="btn-primary mt-4">{androidLabel}</Link>
          </div>
          <div className="card text-center">
            <img src={iosQr} alt="iOS QR" className="mx-auto h-40 w-40" />
            <p className="mt-4 text-sm text-slate-600">{iosLabel}</p>
            <Link href={iosUrl} className="btn-primary mt-4">{iosLabel}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function DownloadPage() {
  const settingsPromise = getSiteSettings();

  return (
    <Suspense fallback={<DownloadSkeleton />}>
      <DownloadContent settingsPromise={settingsPromise} />
    </Suspense>
  );
}


