import LoginForm from "@/components/modules/auth/Login/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Ecomart",
};

const LoginPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
