import Navbar from "@/components/layout/Navbar";
import LoginForm from "@/components/login/LoginForm";

export const metadata = {
  title: "Member Login",
};

export default function LoginPage() {
  return (
    <>
      <Navbar />

      <main className="h-dvh pt-18 w-full flex justify-center items-center">
        <LoginForm />
      </main>
    </>
  );
}
