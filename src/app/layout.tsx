import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xưởng Cắt Gạch Trần Nam Trung | Chuyên Cắt Gạch Tại Đà Nẵng",
  description:
    "Xưởng Cắt Gạch Trần Nam Trung chuyên cung cấp dịch vụ cắt gạch chuyên nghiệp, chính xác tại Đà Nẵng. Địa chỉ: 5 Trần Nam Trung, Phường Hòa Xuân. Hotline: 0936789363.",
  keywords: ["cắt gạch", "gạch đá", "Đà Nẵng", "Trần Nam Trung", "Hòa Xuân", "xưởng cắt gạch"],
  authors: [{ name: "Xưởng Cắt Gạch Trần Nam Trung" }],
  openGraph: {
    title: "Xưởng Cắt Gạch Trần Nam Trung",
    description: "Dịch vụ cắt gạch chuyên nghiệp tại Đà Nẵng",
    type: "website",
    locale: "vi_VN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0c0c0c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>{children}</body>
    </html>
  );
}
