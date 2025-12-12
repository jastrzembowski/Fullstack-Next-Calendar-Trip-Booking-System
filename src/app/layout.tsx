import { Footer, Navbar } from "@/components";
import { Lato } from "next/font/google";
import "./globals.scss";
import { cookies } from "next/headers";
import { handleLogout } from "./actions";

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
  const isLoggedIn = (await cookies()).get("auth") ? true : false;

  return (
    <html>
      <body className={lato.className}>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
