import RegisterForm from "@/components/modules/auth/register/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Ecomart",
};

const RegisterPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
