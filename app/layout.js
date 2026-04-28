import "./globals.css";

export const metadata = {
  title: "ThingsLog Monitoring Portal",
  description: "Partner monitoring portal template for ThingsLog"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

