import { LoginBox } from "@/components";

export default function Register() {
  return (
    <div>
      <LoginBox error={""} isLoading={false} type="register" />
    </div>
  );
}