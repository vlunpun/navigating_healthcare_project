import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Lock, FileText, Mail, Phone } from "lucide-react";

export default function Consent() {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = (location.state as any)?.phone || "";
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
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

      <main className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Privacy and Security Notice
          </h1>
          <p className="text-base text-muted-foreground">
            Please review and accept before we access your health records
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-5 text-sm text-muted-foreground">
            {/* ── How we use your data ─────────────────────────── */}
            <section>
              <h2 className="text-base font-semibold text-foreground mb-2">
                How we use your health information
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Centauri Health retrieves your health records through the
                  Trusted Exchange Framework and Common Agreement (TEFCA) solely
                  to assess your potential eligibility for a medical frailty
                  exemption under Indiana Medicaid.
                </li>
                <li>
                  Your health information is analyzed by a secure, automated
                  system that produces a frailty screening result and
                  personalized guidance.
                </li>
                <li>
                  Results are for <strong>informational purposes only</strong>{" "}
                  and do not constitute a medical diagnosis or guarantee of
                  eligibility.
                </li>
              </ul>
            </section>

            {/* ── No storage / retention ───────────────────────── */}
            <section>
              <h2 className="text-base font-semibold text-foreground mb-2">
                Data retention
              </h2>
              <p>
                Centauri Health does <strong>not</strong> store your health
                records or personally identifiable information in a database.
                Your data is processed in memory during your session and is not
                retained after you leave or close the application.
              </p>
            </section>

            {/* ── Sharing / sale ────────────────────────────────── */}
            <section>
              <h2 className="text-base font-semibold text-foreground mb-2">
                Sharing and disclosure
              </h2>
              <p>
                Your health information is <strong>not sold</strong>, shared
                with third parties, or used for advertising or marketing
                purposes.
              </p>
            </section>

            {/* ── Security ─────────────────────────────────────── */}
            <section>
              <h2 className="text-base font-semibold text-foreground mb-2">
                Security
              </h2>
              <p>
                Centauri Health is designed to operate in a HIPAA-compliant
                environment. If your information is reasonably believed to have
                been affected by a security incident, we will notify you
                promptly.
              </p>
            </section>

            {/* ── Your rights ──────────────────────────────────── */}
            <section>
              <h2 className="text-base font-semibold text-foreground mb-2">
                Your rights
              </h2>
              <p>
                You may <strong>revoke consent</strong> at any time by closing
                the application or contacting us. Because we do not retain your
                data, no further action is needed after you end your session.
              </p>
            </section>

            {/* ── Contact ──────────────────────────────────────── */}
            <section>
              <h2 className="text-base font-semibold text-foreground mb-2">
                Questions or complaints
              </h2>
              <p className="mb-2">
                If you have questions about this notice or a privacy-related
                concern, please contact us:
              </p>
              <div className="bg-muted rounded-lg p-3 space-y-1">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>privacy@centaurihealth.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>1-800-000-0000</span>
                </div>
              </div>
            </section>
          </div>

          {/* ── Consent checkbox ────────────────────────────────── */}
          <div className="mt-6 pt-6 border-t space-y-4">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 accent-blue-600"
              />
              <span className="text-sm text-foreground">
                I have read and understand this Privacy and Security Notice. I
                give my express consent for Centauri Health to access and use my
                health information as described above for the purpose of this
                assessment.
              </span>
            </label>

            <Button
              onClick={() => navigate("/loading", { state: { phone } })}
              disabled={!agreed}
              className="w-full h-11 text-base"
            >
              Accept &amp; Continue
            </Button>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border">
            <Lock className="w-5 h-5 text-green-600" />
            <span className="text-sm text-muted-foreground">
              HIPAA-compliant data handling
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
