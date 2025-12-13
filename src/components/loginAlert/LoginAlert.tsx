import { Button, InfoBox } from "@/components";
import { PATHS } from "@/utils";

export const LoginAlert = () => {
  return (
    <InfoBox>
      <h1>Zaloguj się aby zobaczyć dostępne terminy i dokonaj rezerwacji!</h1>
      <Button href={PATHS.LOGIN} variant="secondary">
        Zaloguj się
      </Button>
      <Button href={PATHS.REGISTER} variant="secondary">
        Zarejestruj się
      </Button>
    </InfoBox>
  );
};
