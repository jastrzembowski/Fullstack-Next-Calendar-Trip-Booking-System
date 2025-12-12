import { cookies } from "next/headers";
import { MainPage } from "./MainPage";

export default async function Home() {


  const isLoggedIn = (await cookies()).get("auth") ? true : false;
  return (
    <>
      <MainPage isLoggedIn={isLoggedIn} />
    </>
  );
}
