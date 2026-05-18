import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bridge — Client Onboarding",
  description: "A guided strategy session, not a form. Powered by Digital Native Agency.",
  icons: { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%234f46e5'/><line x1='8' y1='12' x2='24' y2='12' stroke='white' stroke-width='3' stroke-linecap='round'/><line x1='8' y1='20' x2='24' y2='20' stroke='white' stroke-width='3' stroke-linecap='round'/></svg>" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, height: "100dvh", display: "flex", flexDirection: "column" }}>
        {children}
      </body>
    </html>
  );
}
