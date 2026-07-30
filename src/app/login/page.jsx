import Navbar from "@/components/layout/Navbar";
import LoginForm from "@/components/login/LoginForm";

export const metadata = {
  title: "Member Login",
};

export default function LoginPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 pt-36 pb-24">
        <LoginForm />
      </main>
    </>
  );
}
