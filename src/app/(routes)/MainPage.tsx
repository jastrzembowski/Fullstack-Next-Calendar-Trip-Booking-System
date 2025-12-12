import { FormContainer, Header } from "@/components";

interface MainPageProps {
  isLoggedIn: boolean;
}
export const MainPage = ( { isLoggedIn }: MainPageProps ) => {
  return (
    <div>
      <Header>
        <FormContainer isLoggedIn={isLoggedIn} />
      </Header>
    </div>
  );
};