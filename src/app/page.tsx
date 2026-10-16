
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import {
  Leaf,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  LockKeyhole,
  X,
  TrendingUp,
  Wallet,
  UserRound,
} from "lucide-react";

type KycStatus = "success" | "failed" | null;
type Screen = "signup" | "registration" | "dashboard";

const funds = [
  {
    name: "SIPFUND Bluechip Growth Fund",
    category: "Large Cap · Equity",
    risk: "Very High",
    returns: "14.2%",
    description: "A sample large-cap equity fund for this demo.",
  },
  {
    name: "SIPFUND Flexi Cap Fund",
    category: "Flexi Cap · Equity",
    risk: "Very High",
    returns: "16.8%",
    description: "A sample flexi-cap fund for this demo.",
  },
  {
    name: "SIPFUND Balanced Advantage Fund",
    category: "Hybrid · Dynamic Allocation",
    risk: "Moderately High",
    returns: "10.6%",
    description: "A sample hybrid fund for this demo.",
  },
  {
    name: "SIPFUND Short Duration Fund",
    category: "Debt · Short Duration",
    risk: "Moderate",
    returns: "7.4%",
    description: "A sample debt fund for this demo.",
  },
];

export default function SignupPage() {
  const [screen, setScreen] = useState<Screen>("signup");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [mobileOwner, setMobileOwner] = useState("");
  const [emailOwner, setEmailOwner] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [pan, setPan] = useState("");
  const [kycStatus, setKycStatus] = useState<KycStatus>(null);
  const [registrationStep, setRegistrationStep] = useState<3 | 4>(3);
  const [nseRegistered, setNseRegistered] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [buyFundName, setBuyFundName] = useState<string | null>(null);

  const [occupation, setOccupation] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [pep, setPep] = useState("");
  const [nomineeType, setNomineeType] = useState<"major" | "minor">("major");
  const [nomineeName, setNomineeName] = useState("");
  const [nomineeDob, setNomineeDob] = useState("");
  const [nomineeEmail, setNomineeEmail] = useState("");
  const [nomineePhone, setNomineePhone] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [nomineeAddress, setNomineeAddress] = useState("");
  const [relationship, setRelationship] = useState("");
  const [useUserAddress, setUseUserAddress] = useState(true);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [kycEntryMode, setKycEntryMode] = useState<"digilocker" | "manual">(
    "digilocker"
  );
  const [showKycComplete, setShowKycComplete] = useState(false);

  const [guardianName, setGuardianName] = useState("Ravi Kumar");
  const [guardianRelationship, setGuardianRelationship] = useState("Father");
  const [guardianPan, setGuardianPan] = useState("FGHIJ5678K");

  const inputClass =
    "h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100";

  const labelClass = "mb-1.5 block text-xs font-semibold text-slate-700";

  function requestOtp() {
    setError("");
    setInfo("");

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (!mobileOwner || !emailOwner) {
      setError("Please select mobile and email ownership.");
      return;
    }

    setOtpRequested(true);
    setOtp("");
    setInfo("Demo OTP generated. Use 123456 to continue.");
  }

  function verifyOtp() {
    setError("");
    setInfo("");

    if (otp !== "123456") {
      setError("Incorrect OTP. For this demo, enter 123456.");
      return;
    }

    setOtpVerified(true);
    setInfo("OTP verification successful.");
  }

  function checkPan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setInfo("");

    const enteredPan = pan.trim().toUpperCase();

    if (enteredPan === "ABCDE1234S") {
      setKycStatus("success");
    } else if (enteredPan === "ABCDE1234F") {
      setKycStatus("failed");
    } else {
      setKycStatus(null);
      setError(
        "For this demo, use ABCDE1234S for KYC success or ABCDE1234F for KYC failure."
      );
    }
  }

  function openRegistration(step: 3 | 4) {
    setRegistrationStep(step);
    setScreen("registration");
    setBuyFundName(null);
    setError("");
    setInfo("");
  }

  function exploreFunds() {
    setScreen("dashboard");
    setBuyFundName(null);
    setError("");
    setInfo("");
  }

  function buyFund(name: string) {
    setBuyFundName(name);
  }

  function continueFromBuyPopup() {
    setBuyFundName(null);

    if (kycStatus !== "success") {
      openRegistration(3);
    } else if (!nseRegistered) {
      openRegistration(4);
    } else {
      setInfo(
        "Demo only: your onboarding is complete. A real purchase flow would continue here."
      );
    }
  }

  function saveKyc(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setInfo("");
    setKycStatus("success");
    setShowKycComplete(true);
  }

  function saveNseRegistration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!accountNumber.trim() || !accountType || !ifsc.trim()) {
      setError("Please enter your account number, account type and IFSC.");
      return;
    }



    if (!occupation || !annualIncome || !pep) {
      setError("Please complete occupation, annual income and PEP details.");
      return;
    }

    // No actual NSE submission or bank verification is performed.
    setNseRegistered(true);
    setScreen("dashboard");
    setError("");
    setInfo("Demo registration completed. You can now explore the funds.");
  }

  function resetDemo() {
    setScreen("signup");
    setMobile("");
    setEmail("");
    setMobileOwner("");
    setEmailOwner("");
    setOtpRequested(false);
    setOtp("");
    setOtpVerified(false);
    setPan("");
    setKycStatus(null);
    setRegistrationStep(3);
    setNseRegistered(false);
    setError("");
    setInfo("");
    setBuyFundName(null);
    setOccupation("");
    setAnnualIncome("");
    setPep("");
    setNomineeType("major");
    setNomineeName("");
    setNomineeDob("");
    setNomineeEmail("");
    setNomineePhone("");
    setIdType("");
    setIdNumber("");
    setNomineeAddress("");
    setRelationship("");
    setUseUserAddress(true);
    setAccountNumber("");
    setAccountType("");
    setIfsc("");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={exploreFunds}
            className="flex items-center gap-2"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
              <Leaf className="h-6 w-6 fill-teal-100 text-white" />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-blue-950">
              SIPFUND
            </span>
          </button>

          {screen === "dashboard" && (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-slate-500 sm:inline">
                Investor dashboard
              </span>
              <button
                type="button"
                onClick={resetDemo}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Restart demo
              </button>
            </div>
          )}
        </header>

        {screen === "signup" && (
          <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-blue-100 bg-blue-50 px-5 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                {otpVerified ? "2" : "1"}
              </span>
              <div>
                <h1 className="font-bold text-blue-950">
                  {otpVerified ? "PAN & KYC Validation" : "Signup – Basic Details"}
                </h1>
                <p className="mt-1 text-xs text-blue-700">
                  SIPFUND · Investor onboarding
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <h2 className="text-lg font-bold text-slate-900">
                {otpVerified ? "Verify your PAN" : "Create your account"}
              </h2>
              <p className="mt-1 mb-5 text-sm leading-6 text-slate-500">
                {otpVerified
                  ? "Enter your PAN number to check your existing KYC status."
                  : "Enter your contact details to begin registration."}
              </p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="mobile" className={labelClass}>
                    Mobile number *
                  </label>
                  <input
                    id="mobile"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    disabled={otpVerified}
                    className={inputClass}
                    placeholder="Enter 10-digit mobile number"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value.replace(/\D/g, ""));
                      setOtpRequested(false);
                      setOtpVerified(false);
                      setOtp("");
                      setError("");
                      setInfo("");
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="mobileOwner" className={labelClass}>
                    Mobile number belongs to *
                  </label>
                  <select
                    id="mobileOwner"
                    className={inputClass}
                    value={mobileOwner}
                    disabled={otpVerified}
                    onChange={(e) => setMobileOwner(e.target.value)}
                  >
                    <option value="">Select ownership</option>
                    <option value="me">Me</option>
                    <option value="father">Father</option>
                    <option value="mother">Mother</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    disabled={otpVerified}
                    className={inputClass}
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setOtpRequested(false);
                      setOtpVerified(false);
                      setOtp("");
                      setError("");
                      setInfo("");
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="emailOwner" className={labelClass}>
                    Email address belongs to *
                  </label>
                  <select
                    id="emailOwner"
                    className={inputClass}
                    value={emailOwner}
                    disabled={otpVerified}
                    onChange={(e) => setEmailOwner(e.target.value)}
                  >
                    <option value="">Select ownership</option>
                    <option value="me">Me</option>
                    <option value="father">Father</option>
                    <option value="mother">Mother</option>
                  </select>
                </div>

                {!otpRequested && !otpVerified && (
                  <button
                    type="button"
                    onClick={requestOtp}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Request OTP <ArrowRight size={17} />
                  </button>
                )}

                {otpRequested && !otpVerified && (
                  <div className="space-y-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-blue-600" />
                      <h3 className="font-bold text-blue-950">Verify OTP</h3>
                    </div>
                    <p className="text-xs text-slate-600">
                      For this demo, enter 123456.
                    </p>
                    <input
                      aria-label="OTP"
                      inputMode="numeric"
                      maxLength={6}
                      className={inputClass}
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    />
                    <button
                      type="button"
                      onClick={verifyOtp}
                      className="h-11 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      Verify OTP
                    </button>
                    <button
                      type="button"
                      onClick={requestOtp}
                      className="w-full py-1 text-xs font-medium text-blue-700 hover:underline"
                    >
                      Request OTP again
                    </button>
                  </div>
                )}

                {otpVerified && (
                  <form onSubmit={checkPan} className="space-y-4">
                    <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <p className="text-sm font-medium text-emerald-800">
                        OTP verified successfully
                      </p>
                    </div>

                    <div>
                      <label htmlFor="pan" className={labelClass}>
                        PAN number *
                      </label>
                      <input
                        id="pan"
                        maxLength={10}
                        autoComplete="off"
                        className={inputClass}
                        placeholder="Enter PAN number"
                        value={pan}
                        onChange={(e) => {
                          setPan(
                            e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "")
                          );
                          setKycStatus(null);
                          setError("");
                          setInfo("");
                        }}
                      />
                      <p className="mt-2 text-xs text-slate-500">
                        Demo PANs: ABCDE1234S = KYC success; ABCDE1234F = KYC incomplete.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      Validate PAN & Check KYC <ArrowRight size={17} />
                    </button>
                  </form>
                )}

                {kycStatus && (
                  <div
                    className={`rounded-xl border p-4 ${kycStatus === "success"
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-amber-200 bg-amber-50"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      {kycStatus === "success" ? (
                        <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                      ) : (
                        <AlertCircle className="h-6 w-6 text-amber-600" />
                      )}
                      <h3 className="font-bold text-slate-900">
                        {kycStatus === "success"
                          ? "KYC Validated Successfully"
                          : "KYC Not Completed"}
                      </h3>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {kycStatus === "success"
                        ? "Your KYC is complete. Continue to NSE registration, or explore funds now."
                        : "Your KYC is incomplete. Complete your KYC, or explore funds now."}
                    </p>

                    <div className="mt-4 grid gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          openRegistration(kycStatus === "success" ? 4 : 3)
                        }
                        className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        {kycStatus === "success"
                          ? "Complete Your NSE Registration"
                          : "Complete Your KYC"}
                        <ArrowRight size={17} />
                      </button>
                      <button
                        type="button"
                        onClick={exploreFunds}
                        className="min-h-11 rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                      >
                        Skip for Now & Explore Funds
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}


        {screen === "registration" && (
          <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-blue-100 bg-blue-50 px-5 py-4">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-white ${registrationStep === 3 ? "bg-violet-600" : "bg-blue-600"
                  }`}
              >
                {registrationStep}
              </span>

              <div>
                <h1 className="font-bold text-blue-950">
                  {registrationStep === 3
                    ? "New KYC Registration"
                    : "NSE Registration Details"}
                </h1>
                <p className="mt-1 text-xs text-blue-700">
                  {registrationStep === 3
                    ? "Use DigiLocker or enter your details manually"
                    : "Additional information for NSE account registration"}
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <button
                type="button"
                onClick={() => {
                  if (registrationStep === 4 && kycStatus !== "success") {
                    setRegistrationStep(3);
                  } else if (registrationStep === 4) {
                    setScreen("signup");
                  } else {
                    setScreen("signup");
                  }
                  setError("");
                  setInfo("");
                }}
                className="mb-5 flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline"
              >
                <ArrowLeft size={16} /> Back
              </button>

              {registrationStep === 3 ? (
                showKycComplete ? (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                    <CheckCircle2 className="mb-3 h-10 w-10 text-emerald-600" />

                    <h2 className="text-xl font-bold text-emerald-900">
                      Your KYC is Complete!
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-emerald-800">
                      Your demo KYC submission was successful. You can now register with
                      NSE or skip NSE registration and explore mutual funds.
                    </p>

                    <div className="mt-5 grid gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setRegistrationStep(4);
                          setError("");
                          setInfo("");
                        }}
                        className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        Register with NSE <ArrowRight size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={exploreFunds}
                        className="min-h-11 rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                      >
                        Skip NSE & Explore Funds
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Keep your existing Step 3 content here:
          DigiLocker / Manual Entry tabs and their forms */}
                  </>
                )
              ) : (
                <>

                  <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <h2 className="font-bold text-blue-950">
                      NSE Registration Details
                    </h2>
                    <p className="mt-1 text-sm leading-5 text-slate-600">
                      Enter occupation, nominee and bank account details to continue.
                    </p>
                  </div>

                  <form onSubmit={saveNseRegistration} className="space-y-5">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className={labelClass}>Occupation *</label>
                        <select
                          className={inputClass}
                          value={occupation}
                          onChange={(e) => setOccupation(e.target.value)}
                          required
                        >
                          <option value="">Select occupation</option>
                          <option>Salaried</option>
                          <option>Self-employed</option>
                          <option>Business</option>
                          <option>Retired</option>
                          <option>Student</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div>
                        <label className={labelClass}>Annual income *</label>
                        <select
                          className={inputClass}
                          value={annualIncome}
                          onChange={(e) => setAnnualIncome(e.target.value)}
                          required
                        >
                          <option value="">Select income</option>
                          <option>Below ₹1 lakh</option>
                          <option>₹1–5 lakh</option>
                          <option>₹5–10 lakh</option>
                          <option>₹10–25 lakh</option>
                          <option>Above ₹25 lakh</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>
                        PEP (Politically Exposed Person) *
                      </label>
                      <div className="flex gap-5 text-sm text-slate-700">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="pep"
                            value="yes"
                            checked={pep === "yes"}
                            onChange={(e) => setPep(e.target.value)}
                            required
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="pep"
                            value="no"
                            checked={pep === "no"}
                            onChange={(e) => setPep(e.target.value)}
                          />
                          No
                        </label>
                      </div>
                    </div>


                    {/* Nominee Details */}
                    <section className="border-t border-slate-100 pt-5">
                      <h3 className="mb-3 font-bold text-slate-900">
                        Nominee Details
                      </h3>

                      {/* Major / Minor switch */}
                      <div className="mb-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
                        <button
                          type="button"
                          onClick={() => setNomineeType("major")}
                          className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${nomineeType === "major"
                              ? "bg-white text-blue-700 shadow-sm"
                              : "text-slate-600 hover:bg-slate-200"
                            }`}
                        >
                          Major
                        </button>

                        <button
                          type="button"
                          onClick={() => setNomineeType("minor")}
                          className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${nomineeType === "minor"
                              ? "bg-white text-blue-700 shadow-sm"
                              : "text-slate-600 hover:bg-slate-200"
                            }`}
                        >
                          Minor
                        </button>
                      </div>

                      {/* MAJOR NOMINEE FIELDS */}
                      {nomineeType === "major" && (
                        <div className="space-y-4 rounded-xl border border-blue-100 p-4">
                          <h4 className="font-semibold text-blue-950">
                            Nominee Information
                          </h4>

                          <div>
                            <label className={labelClass}>Nominee Name *</label>
                            <input
                              className={inputClass}
                              value={nomineeName}
                              onChange={(e) => setNomineeName(e.target.value)}
                              required
                              placeholder="Enter nominee full name"
                            />
                          </div>

                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className={labelClass}>Date of Birth *</label>
                              <input
                                type="date"
                                className={inputClass}
                                value={nomineeDob}
                                onChange={(e) => setNomineeDob(e.target.value)}
                                required
                              />
                            </div>

                            <div>
                              <label className={labelClass}>Relationship *</label>
                              <select
                                className={inputClass}
                                value={relationship}
                                onChange={(e) => setRelationship(e.target.value)}
                                required
                              >
                                <option value="">Select relationship</option>
                                <option>Spouse</option>
                                <option>Father</option>
                                <option>Mother</option>
                                <option>Son</option>
                                <option>Daughter</option>
                                <option>Brother</option>
                                <option>Sister</option>
                                <option>Other</option>
                              </select>
                            </div>

                            <div>
                              <label className={labelClass}>Email *</label>
                              <input
                                type="email"
                                className={inputClass}
                                value={nomineeEmail}
                                onChange={(e) => setNomineeEmail(e.target.value)}
                                required
                                placeholder="Nominee email"
                              />
                            </div>

                            <div>
                              <label className={labelClass}>Phone Number *</label>
                              <input
                                type="tel"
                                inputMode="numeric"
                                maxLength={10}
                                className={inputClass}
                                value={nomineePhone}
                                onChange={(e) =>
                                  setNomineePhone(e.target.value.replace(/\D/g, ""))
                                }
                                required
                                placeholder="10-digit mobile number"
                              />
                            </div>
                          </div>

                          <div>
                            <label className={labelClass}>Nominee ID Type *</label>
                            <select
                              className={inputClass}
                              value={idType}
                              onChange={(e) => setIdType(e.target.value)}
                              required
                            >
                              <option value="">Select ID type</option>
                              <option value="PAN">PAN</option>
                              <option value="Aadhaar">Aadhaar</option>
                            </select>
                          </div>

                          <div>
                            <label className={labelClass}>
                              Last 4 Digits of {idType || "ID"} *
                            </label>
                            <input
                              className={inputClass}
                              value={idNumber}
                              onChange={(e) =>
                                setIdNumber(
                                  idType === "Aadhaar"
                                    ? e.target.value.replace(/\D/g, "").slice(0, 4)
                                    : e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4)
                                )
                              }
                              maxLength={4}
                              minLength={4}
                              required
                              placeholder="Enter last 4 digits"
                            />
                          </div>

                          <div>
                            <label className={labelClass}>Nominee Address *</label>
                            <textarea
                              className={`${inputClass} h-20 py-3`}
                              value={nomineeAddress}
                              onChange={(e) => setNomineeAddress(e.target.value)}
                              required
                              placeholder="Enter nominee address"
                            />
                          </div>
                        </div>
                      )}

                      {/* MINOR NOMINEE FIELDS */}
                      {nomineeType === "minor" && (
                        <div className="space-y-4 rounded-xl border border-violet-200 bg-violet-50/50 p-4">
                          <h4 className="font-semibold text-violet-950">
                            Guardian Information
                          </h4>

                          <p className="text-sm text-slate-600">
                            Enter the guardian details for the minor nominee.
                          </p>

                          <div>
                            <label className={labelClass}>Guardian Name *</label>
                            <input
                              className={inputClass}
                              value={guardianName}
                              onChange={(e) => setGuardianName(e.target.value)}
                              required
                              placeholder="Enter guardian full name"
                            />
                          </div>

                          <div>
                            <label className={labelClass}>Relationship to Minor *</label>
                            <select
                              className={inputClass}
                              value={guardianRelationship}
                              onChange={(e) => setGuardianRelationship(e.target.value)}
                              required
                            >
                              <option value="">Select relationship</option>
                              <option>Father</option>
                              <option>Mother</option>
                              <option>Legal Guardian</option>
                              <option>Other</option>
                            </select>
                          </div>

                          <div>
                            <label className={labelClass}>Guardian PAN Number *</label>
                            <input
                              className={inputClass}
                              value={guardianPan}
                              onChange={(e) => setGuardianPan(e.target.value.toUpperCase())}
                              maxLength={10}
                              minLength={10}
                              required
                              placeholder="Enter guardian PAN"
                            />
                          </div>
                        </div>
                      )}
                    </section>


                    <div className="border-t border-slate-100 pt-4">
                      <h3 className="mb-3 font-bold text-slate-900">Bank Account Details</h3>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                          <label className={labelClass}>Account No. *</label>
                          <input className={inputClass} inputMode="numeric" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))} required placeholder="Account number" />
                        </div>
                        <div>
                          <label className={labelClass}>Account Type *</label>
                          <select className={inputClass} value={accountType} onChange={(e) => setAccountType(e.target.value)} required>
                            <option value="">Select type</option>
                            <option>Savings</option>
                            <option>Current</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className={labelClass}>IFSC *</label>
                          <input className={inputClass} maxLength={11} value={ifsc} onChange={(e) => setIfsc(e.target.value.toUpperCase())} required placeholder="Enter any demo IFSC value" />
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-slate-500">
                        Demo only: the IFSC format is not validated and no bank verification is performed.
                      </p>
                    </div>

                    <div className="flex flex-wrap justify-between gap-3 border-t border-slate-100 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setRegistrationStep(3);
                          setError("");
                        }}
                        className="flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline"
                      >
                        <ArrowLeft size={16} /> Back to KYC
                      </button>

                      <button
                        type="submit"
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        Review & Submit <ArrowRight size={17} />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}


        {screen === "dashboard" && (
          <div>
            <div className="mb-6 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 p-6 text-white sm:p-8">
              <p className="text-sm text-blue-100">Welcome to SIPFUND</p>
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                Make your money work for you.
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100">
                Explore mutual funds and discover investment options. You can browse funds before completing registration.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-lg bg-white/15 px-3 py-2 text-sm">
                  <Wallet size={17} /> Explore funds
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white/15 px-3 py-2 text-sm">
                  <TrendingUp size={17} /> Start your SIP journey
                </div>
              </div>
            </div>

            <div className="mb-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2">
                  {kycStatus === "success" ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                  )}
                  <h2 className="font-bold text-slate-900">KYC status</h2>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {kycStatus === "success" ? "Completed" : "Not completed"}
                </p>
                {kycStatus !== "success" && (
                  <button
                    type="button"
                    onClick={() => openRegistration(3)}
                    className="mt-3 text-sm font-semibold text-blue-700 hover:underline"
                  >
                    Complete KYC <ArrowRight className="inline h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2">
                  {nseRegistered ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                  )}
                  <h2 className="font-bold text-slate-900">NSE registration</h2>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {nseRegistered ? "Completed" : "Not completed"}
                </p>
                {!nseRegistered && (
                  <button
                    type="button"
                    onClick={() => openRegistration(kycStatus === "success" ? 4 : 3)}
                    className="mt-3 text-sm font-semibold text-blue-700 hover:underline"
                  >
                    {kycStatus === "success" ? "Register with NSE" : "Complete KYC first"}{" "}
                    <ArrowRight className="inline h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Explore mutual funds</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Sample funds for demonstration only.
                </p>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {funds.length} sample funds
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {funds.map((fund) => (
                <article
                  key={fund.name}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <TrendingUp size={22} />
                    </div>
                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                      {fund.risk} risk
                    </span>
                  </div>
                  <h3 className="mt-4 font-bold text-slate-900">{fund.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{fund.category}</p>
                  <p className="mt-4 text-xs text-slate-500">Illustrative 3-year return</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">{fund.returns}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{fund.description}</p>
                  <button
                    type="button"
                    onClick={() => buyFund(fund.name)}
                    className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Buy this fund <ArrowRight size={17} />
                  </button>
                </article>
              ))}
            </div>

            <p className="mt-6 text-center text-xs leading-5 text-slate-400">
              Presentation demo only. Funds, returns, OTP, KYC and registration results are simulated. This is not an investment recommendation.
            </p>
          </div>
        )}

        {error && screen !== "signup" && screen !== "registration" && (
          <div role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {info && (
          <div role="status" className="mt-4 flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{info}</span>
            <button type="button" onClick={() => setInfo("")} className="ml-auto" aria-label="Dismiss message">
              <X size={16} />
            </button>
          </div>
        )}

        {screen === "signup" && error && (
          <div role="alert" className="mx-auto mt-4 max-w-lg rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {screen === "registration" && error && (
          <div role="alert" className="mx-auto mt-4 max-w-3xl rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {buyFundName && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
            onClick={() => setBuyFundName(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="buy-modal-title"
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                  <LockKeyhole size={22} />
                </div>
                <button
                  type="button"
                  onClick={() => setBuyFundName(null)}
                  aria-label="Close popup"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <h2 id="buy-modal-title" className="text-xl font-bold text-slate-900">
                Complete your registration
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                You selected <strong>{buyFundName}</strong>.
              </p>

              {kycStatus !== "success" ? (
                <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <h3 className="font-bold text-amber-900">KYC is not complete</h3>
                  <p className="mt-1 text-sm leading-5 text-amber-800">
                    Please complete your KYC before proceeding with a fund purchase.
                  </p>
                </div>
              ) : !nseRegistered ? (
                <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <h3 className="font-bold text-amber-900">NSE registration is not complete</h3>
                  <p className="mt-1 text-sm leading-5 text-amber-800">
                    Your KYC is complete. Please finish NSE registration to continue.
                  </p>
                </div>
              ) : (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <h3 className="font-bold text-emerald-900">Registration complete</h3>
                  <p className="mt-1 text-sm leading-5 text-emerald-800">
                    This demo does not place actual investment orders.
                  </p>
                </div>
              )}

              <div className="mt-5 grid gap-3">
                {(kycStatus !== "success" || !nseRegistered) && (
                  <button
                    type="button"
                    onClick={continueFromBuyPopup}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Continue to {kycStatus !== "success" ? "KYC Registration" : "NSE Registration"}
                    <ArrowRight size={17} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setBuyFundName(null)}
                  className="min-h-11 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Back to funds
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
