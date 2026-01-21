import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/services/siteSettingsService";

export default async function MarketingLayout({ children }) {
  const settings = await getSiteSettings();
  const navbarSettings = {
    ctaPrimaryText: settings.ctaPrimaryText,
    ctaPrimaryUrl: settings.ctaPrimaryUrl,
    ctaSecondaryText: settings.ctaSecondaryText,
    ctaSecondaryUrl: settings.ctaSecondaryUrl
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar settings={navbarSettings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
