import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  Send,
  Loader2,
  FileText,
  Info,
  Phone,
  CheckSquare,
  Building2,
} from "lucide-react";
import {
  chatMessage,
  type InferWithGuidanceResponse,
} from "@/lib/api";

// ── Types ───────────────────────────────────────────────────────────
interface ChatMsg {
  id: string;
  sender: "user" | "assistant";
  text: string;
}

// ── Component ───────────────────────────────────────────────────────
export default function Assessment() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as InferWithGuidanceResponse | null;

  useEffect(() => {
    if (!state) navigate("/get-started", { replace: true });
    else window.scrollTo(0, 0);
  }, [state, navigate]);

  if (!state) return null;

  const { inference, guidance, chat_handoff } = state;
  const isFrail = inference.frail === 1;
  const pct = (inference.frailty_probability * 100).toFixed(1);

  // ── Chat state ──────────────────────────────────────────────────
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: "init",
      sender: "assistant",
      text: chat_handoff.initial_message,
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;

    setMessages((m) => [
      ...m,
      { id: `u-${Date.now()}`, sender: "user", text },
    ]);
    setInput("");
    setSending(true);

    try {
      const res = await chatMessage(chat_handoff.session_id, text);
      setMessages((m) => [
        ...m,
        { id: `a-${Date.now()}`, sender: "assistant", text: res.answer },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: `e-${Date.now()}`,
          sender: "assistant",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Nav */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/get-started" className="flex items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-blue-600" />
              <span className="text-lg font-bold text-foreground">
                Centauri Health
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* ── Header badge + title ──────────────────────────────── */}
        <div className="mb-8">
          <Badge
            className={
              isFrail
                ? "bg-green-100 text-green-800 hover:bg-green-100 mb-4 text-sm px-2 py-0.5"
                : "bg-amber-100 text-amber-800 hover:bg-amber-100 mb-4 text-sm px-2 py-0.5"
            }
          >
            Assessment Complete
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {isFrail
              ? "You are likely eligible for a medical frailty exemption"
              : "You may not qualify for a medical frailty exemption"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {isFrail
              ? "Based on your assessment, you meet Indiana's medical frailty criteria."
              : "Based on your assessment, you may not meet Indiana's medical frailty criteria at this time."}
          </p>
        </div>

        {/* ── Assessment Summary card ───────────────────────────── */}
        <Card className="p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                isFrail ? "bg-green-100" : "bg-amber-100"
              }`}
            >
              {isFrail ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-2">Assessment Summary</h2>
              <p className="text-base text-muted-foreground mb-1">
                Frailty probability: <strong className="text-foreground">{pct}%</strong>
              </p>
              <p className="text-base text-muted-foreground">
                {isFrail
                  ? "Your health information indicates that you likely qualify for a medical frailty exemption under Indiana Medicaid rules."
                  : "Your health information does not currently indicate that you meet the threshold for medical frailty under Indiana Medicaid rules. This does not mean you cannot apply or that your circumstances won't change."}
              </p>
            </div>
          </div>

          {/* Guidance bullets from API */}
          {guidance.bullets.length > 0 && (
            <div className="bg-muted rounded-lg p-6 mb-6">
              <h3 className="text-base font-semibold mb-3">
                {isFrail ? "Factors Supporting Eligibility:" : "Assessment Details:"}
              </h3>
              <ul className="space-y-3">
                {guidance.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        isFrail ? "text-green-600" : "text-blue-600"
                      }`}
                    />
                    <span className="text-base">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>
                Last assessed: {new Date().toLocaleDateString()} — Based on
                Indiana policy v1.2 (effective Jan 2026)
              </span>
            </div>
          </div>
        </Card>

        {/* ── What this means ───────────────────────────────────── */}
        <Card className="p-6 sm:p-8 mb-6">
          <h3 className="text-lg font-semibold mb-4">What this means for you</h3>
          <div className="space-y-3 text-base text-muted-foreground">
            {isFrail ? (
              <>
                <p>
                  Based on your assessment, you may be able to apply for a
                  medical frailty exemption under Indiana Medicaid. This could
                  provide you with additional healthcare benefits and services.
                </p>
                <p>
                  <strong className="text-foreground">Important:</strong> This
                  assessment is a screening tool and does not guarantee approval.
                  You will need to complete an official application through
                  Indiana's Family and Social Services Administration (FSSA).
                </p>
              </>
            ) : (
              <>
                <p>
                  This assessment is a screening tool based on the information
                  provided. It does not prevent you from applying for a medical
                  frailty exemption through official channels.
                </p>
                <p>
                  <strong className="text-foreground">Remember:</strong> Your
                  health status may change, or there may be additional factors
                  not captured in this assessment. If you believe you should
                  qualify, we encourage you to speak with your healthcare
                  provider or case manager.
                </p>
              </>
            )}
          </div>
        </Card>

        {/* ── Next Steps / Still have questions ─────────────────── */}
        <Card className="p-6 sm:p-8 mb-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">
                {isFrail ? "Next Steps" : "Still have questions?"}
              </h3>
              <p className="text-base text-muted-foreground mb-4">
                {isFrail
                  ? "We recommend the following actions to move forward with your application:"
                  : "If you feel this assessment doesn't reflect your health situation, consider these options:"}
              </p>
              <ul className="space-y-3 text-base">
                {isFrail ? (
                  <>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-blue-600">1.</span>
                      <span>Download your assessment summary (PDF) for your records</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-blue-600">2.</span>
                      <span>Contact your Medicaid health plan or case manager</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-blue-600">3.</span>
                      <span>Gather documentation of your conditions and limitations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-blue-600">4.</span>
                      <span>Apply through Indiana FSSA for official determination</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-blue-600">&#8226;</span>
                      <span>Talk to your healthcare provider about your eligibility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-blue-600">&#8226;</span>
                      <span>Contact your Medicaid health plan or case manager directly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-blue-600">&#8226;</span>
                      <span>Retake this assessment if your health status changes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-blue-600">&#8226;</span>
                      <span>Apply through Indiana FSSA for official evaluation</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </Card>

        {/* ── Guidance: Apply + Contact + Checklist ─────────────── */}
        <Card className="p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">
                How to Apply for a Medical Frailty Exemption
              </h3>
              <p className="text-base text-muted-foreground">
                Official guidance from the Indiana Family and Social Services
                Administration on applying for medical frailty exemptions under
                Medicaid.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">
                Talk to Your Health Plan or Case Manager
              </h3>
              <p className="text-base text-muted-foreground mb-4">
                Your Medicaid health plan can help you with the application
                process. Contact them directly to discuss your medical frailty
                assessment and next steps.
              </p>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-base font-semibold mb-2">
                  Important Contact Information:
                </p>
                <ul className="text-base space-y-2 text-muted-foreground">
                  <li>&#8226; Indiana Medicaid Hotline: 1-800-403-0864</li>
                  <li>
                    &#8226; Member Services: Available Monday-Friday, 8am-5pm
                    EST
                  </li>
                  <li>&#8226; TTY for hearing impaired: 1-800-743-3333</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <CheckSquare className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">
                Prepare Documentation About Your Daily Limitations
              </h3>
              <p className="text-base text-muted-foreground mb-4">
                Having detailed documentation can strengthen your application.
                Use this checklist to prepare:
              </p>
              <div className="space-y-4">
                {[
                  "List of all chronic conditions and current medications",
                  "Documentation of hospitalizations or ER visits in the past 6 months",
                  "Notes on activities of daily living (ADLs) you need help with",
                  "Letters from healthcare providers documenting your functional limitations",
                  "Records of home health services or other care assistance you receive",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1.5 w-4 h-4"
                      id={`check-${i}`}
                    />
                    <label htmlFor={`check-${i}`} className="text-base">
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* ── Chat ──────────────────────────────────────────────── */}
        <Card className="p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            Questions? Ask our assistant
          </h2>

          <div className="overflow-y-auto space-y-4 mb-4 min-h-[200px] max-h-[400px]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 text-base ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-2">
                  <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question..."
              className="flex-1 h-11 rounded-md border border-input bg-background px-3 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              disabled={sending}
            />
            <Button
              type="submit"
              size="icon"
              disabled={sending || !input.trim()}
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </Card>

        {/* ── Bottom actions ─────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="flex-1 text-base h-11">
            <FileText className="w-4 h-4 mr-2" />
            Download Summary
          </Button>
          <Link to="/get-started" className="flex-1">
            <Button
              size="lg"
              variant="outline"
              className="w-full text-base h-11"
            >
              Start Over
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
