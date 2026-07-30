import {Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL("https://coampcs-portal.vercel.app"),

  title: {
    default: "CoA-MPCS Portal",
    templatetemplate: "%s | CoA-MPCS Portal",
  },

  description:
    "Official portal for the Court of Appeal Calabar Staff Multi-Purpose Cooperative Society. Secure savings, affordable loans, and member services.",

  creator: "Kohly Akpet",

  openGraph: {
    title: "CoA-MPCS Portal",
    description: "Secure Savings. Smart Lending. Collective Growth.",
    type: "website",
    locale: "en_NG",
    siteName: "CoA-MPCS Portal",
  },
};

export default function RootLayout({children}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <Navbar />
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
