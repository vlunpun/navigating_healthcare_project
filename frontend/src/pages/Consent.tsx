import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Lock, FileText, Mail, Phone } from "lucide-react";

export default function Consent() {
  const navigate = useNavigate();
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
          <p className="text-xs text-muted-foreground mt-1">
            Effective Date: March 17, 2026
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-5 text-sm text-muted-foreground">
            {/* ── How we use your data ─────────────────────────── */}
            <section>
              <h2 className="text-base font-semibold text-foreground mb-2">
                How we access and use your health information
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
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Your health information is <strong>not sold</strong>, shared
                  with third parties, or used for advertising or marketing
                  purposes.
                </li>
                <li>
                  Your health information will not be used to assert any type of
                  claim against you, except for the collection of applicable
                  fees.
                </li>
                <li>
                  All data exchanges through TEFCA are in accordance with the
                  permitted and required uses and disclosures specified in the
                  Common Agreement and applicable HHS guidance.
                </li>
                <li>
                  If we receive a civil or criminal subpoena, court order, or
                  other compulsory demand for your information, we will notify
                  you in writing within three (3) business days unless
                  prohibited by law.
                </li>
              </ul>
            </section>

            {/* ── Security ─────────────────────────────────────── */}
            <section>
              <h2 className="text-base font-semibold text-foreground mb-2">
                Security practices
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Centauri Health uses commercially reasonable efforts to protect
                  your information from unauthorized access, modification, use,
                  or destruction.
                </li>
                <li>
                  All health information is encrypted both in transit and at rest
                  during processing.
                </li>
                <li>
                  Centauri Health is designed to operate in a HIPAA-compliant
                  environment.
                </li>
                <li>
                  If your information is reasonably believed to have been
                  affected by a security incident, we will notify you promptly.
                </li>
              </ul>
            </section>

            {/* ── Your rights ──────────────────────────────────── */}
            <section>
              <h2 className="text-base font-semibold text-foreground mb-2">
                Your rights
              </h2>
              <p className="mb-2">You have the right to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Revoke consent</strong> at any time by closing the
                  application or contacting us. Because we do not retain your
                  data, no further action is needed after you end your session.
                </li>
                <li>
                  <strong>Be notified</strong> if your information is reasonably
                  believed to have been affected by a security incident.
                </li>
              </ul>
            </section>

            {/* ── IAS Provider type ────────────────────────────── */}
            <section>
              <h2 className="text-base font-semibold text-foreground mb-2">
                TEFCA Individual Access Services
              </h2>
              <p className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                Centauri Health provides <strong>request-only</strong>{" "}
                Individual Access Services. You will have the ability to request
                access to your health information via TEFCA Exchange. You will
                not be able to use Centauri Health to share your health
                information with other participants in TEFCA.
              </p>
            </section>

            {/* ── Fees ─────────────────────────────────────────── */}
            <section>
              <h2 className="text-base font-semibold text-foreground mb-2">
                Fees
              </h2>
              <p>
                There is no fee to use Centauri Health's frailty assessment
                service.
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
              onClick={() => navigate("/loading")}
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
              HIPAA-compliant &middot; TEFCA Individual Access Services
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
