import Link from "next/link";
import { toDataURL } from "qrcode";
import { getSiteSettings } from "@/services/siteSettingsService";

export const metadata = {
  title: "تحميل التطبيق",
  description: "حمّل تطبيق Usta على Android و iOS." 
};

export default async function DownloadPage() {
  const settings = await getSiteSettings();
  const androidUrl = settings.androidUrl || "https://play.google.com";
  const iosUrl = settings.iosUrl || "https://apple.com";
  const androidQr = await toDataURL(androidUrl);
  const iosQr = await toDataURL(iosUrl);

  return (
    <div className="section-padding">
      <div className="container-page space-y-10">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">حمّل التطبيق الآن</h1>
          <p className="mt-3 text-slate-600">ابدأ استخدام Usta على هاتفك الذكي خلال دقائق.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="card text-center">
            <img src={androidQr} alt="Android QR" className="mx-auto h-40 w-40" />
            <p className="mt-4 text-sm text-slate-600">نسخة Android</p>
            <Link href={androidUrl} className="btn-primary mt-4">تحميل Android</Link>
          </div>
          <div className="card text-center">
            <img src={iosQr} alt="iOS QR" className="mx-auto h-40 w-40" />
            <p className="mt-4 text-sm text-slate-600">نسخة iOS</p>
            <Link href={iosUrl} className="btn-primary mt-4">تحميل iOS</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
