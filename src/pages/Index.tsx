import { useState } from "react";
import { Hero } from "@/components/Hero";
import { LoginForm } from "@/components/LoginForm";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = (email: string) => {
    setUser(email);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (user) {
    return <Dashboard userEmail={user} onLogout={handleLogout} />;
  }

  return (
    <>
      <Hero onLoginClick={() => setShowLogin(true)} />
      {showLogin && (
        <LoginForm
          onLogin={handleLogin}
          onClose={() => setShowLogin(false)}
        />
      )}
    </>
  );
};

export default Index;
