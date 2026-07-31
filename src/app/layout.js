import {Inter} from "next/font/google";
import "./globals.css";
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
        <div>{children}</div>
      </body>
    </html>
  );
}
