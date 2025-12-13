import { Footer, Navbar, UserProvider } from "@/components";
import { Lato } from "next/font/google";
import "./globals.scss";
import { handleLogout } from "./actions";
import { getCurrentUser } from "@/server/auth";

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
  const isLoggedIn = !!user;

  return (
    <html>
      <body className={lato.className}>
        <UserProvider user={user}>
          <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
