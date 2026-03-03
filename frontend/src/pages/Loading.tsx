import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { inferWithGuidance } from "@/lib/api";
import { Button } from "@/components/ui/button";

type Step = "identity" | "network" | "records" | "analyzing";

export default function Loading() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("identity");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      // animate steps, then call API
      await delay(600);
      if (cancelled) return;
      setStep("network");

      await delay(600);
      if (cancelled) return;
      setStep("records");

      await delay(600);
      if (cancelled) return;
      setStep("analyzing");

      try {
        const data = await inferWithGuidance("3"); // Dog Beaker
        if (cancelled) return;
        navigate("/assessment", { state: data, replace: true });
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const done = (s: Step) => {
    const order: Step[] = ["identity", "network", "records", "analyzing"];
    return order.indexOf(s) < order.indexOf(step);
  };

  const active = (s: Step) => s === step;

  const Icon = ({ s }: { s: Step }) =>
    done(s) ? (
      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
    ) : active(s) ? (
      <Loader2 className="w-5 h-5 text-blue-600 flex-shrink-0 animate-spin" />
    ) : (
      <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0" />
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-blue-600" />
              <span className="text-lg font-bold text-foreground">
                Centauri Health
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-20">
        <div className="text-center">
          {!error && (
            <Loader2 className="w-14 h-14 text-blue-600 animate-spin mx-auto mb-6" />
          )}
          {error && (
            <AlertCircle className="w-14 h-14 text-red-500 mx-auto mb-6" />
          )}

          <h1 className="text-2xl font-bold text-foreground mb-4">
            {error ? "Unable to complete assessment" : "Analyzing your health records..."}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {error
              ? error
              : "Securely retrieving and analyzing your information"}
          </p>

          {error && (
            <Button
              onClick={() => window.location.reload()}
              className="mb-8"
            >
              Try Again
            </Button>
          )}

          <div className="max-w-md mx-auto bg-white rounded-lg p-6 border">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-base">
                <Icon s="identity" />
                <span className="text-left">Identity verified</span>
              </div>
              <div className="flex items-center gap-3 text-base">
                <Icon s="network" />
                <span className="text-left">Connecting to Centauri network</span>
              </div>
              <div className="flex items-center gap-3 text-base">
                <Icon s="records" />
                <span className="text-left">Retrieving medical records</span>
              </div>
              <div className="flex items-center gap-3 text-base">
                <Icon s="analyzing" />
                <span className="text-left">Running frailty analysis</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
