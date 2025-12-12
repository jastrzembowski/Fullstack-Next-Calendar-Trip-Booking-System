import { LoginBox } from "@/components";

export default function Login() {
  return (
    <div>
      <LoginBox  error={""} isLoading={false} type="login" />
    </div>
  );
}