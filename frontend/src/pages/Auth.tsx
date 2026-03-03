import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Lock } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/consent");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/get-started" className="flex items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-blue-600" />
              <span className="text-lg font-bold text-foreground">Centauri Health</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-md mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Secure Authentication
          </h1>
          <p className="text-base text-muted-foreground">
            Authenticate securely with Clear to access your health records
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-base">Email or Phone</Label>
              <Input
                id="email"
                type="text"
                placeholder="you@example.com or +1 (555) 123-4567"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 text-base h-11"
              />
            </div>

            <Button
              onClick={handleContinue}
              disabled={!email || isLoading}
              className="w-full h-11 text-base"
            >
              {isLoading ? "Authenticating..." : "Continue with Clear"}
            </Button>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground text-center">
                By continuing, you agree to our{" "}
                <a href="#" className="underline hover:text-foreground">
                  Privacy Policy
                </a>{" "}
                and authorize us to access your health records through Clear API.
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <span className="text-sm text-muted-foreground">
              Secure HIPAA-compliant authentication
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
