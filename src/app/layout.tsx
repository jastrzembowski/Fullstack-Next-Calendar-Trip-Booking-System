import { Lato } from "next/font/google";

import { Footer, Navbar, UserProvider } from "@/components";

import "./globals.scss";

import { getCurrentUser } from "@/server/auth";
import { handleLogout } from "@/utils";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html>
      <body className={lato.className}>
        <UserProvider user={user}>
          <Navbar user={user} handleLogout={handleLogout} />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
