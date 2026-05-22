"use client";

import { useMemo, useState } from "react";

type FormData = {
  service: string;
  propertyType: string;
  jobSize: string;
  location: string;
  timeframe: string;
  notes: string;
  name: string;
  phone: string;
  email: string;
  bestTime: string;
  website: string;
};

const initialData: FormData = {
  service: "",
  propertyType: "",
  jobSize: "",
  location: "",
  timeframe: "",
  notes: "",
  name: "",
  phone: "",
  email: "",
  bestTime: "",
  website: "",
};

const services = ["Tree Surgery", "Land Clearing", "Hedge Cutting", "Firewood & Logs", "Other / not sure"];
const propertyTypes = ["Home & garden", "Smallholding / paddock", "Farm / estate", "Commercial"];
const jobSizes = ["Small (a few hours)", "Medium (1–2 days)", "Large (3+ days)", "Not sure"];
const timeframes = ["ASAP", "Within a month", "Flexible", "Just pricing for now"];
const bestTimes = ["Morning", "Afternoon", "Evening", "Anytime"];

export function QuoteForm({ mode = "quote" }: { mode?: "quote" | "booking" }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [startedAt] = useState(Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const endpoint = useMemo(() => {
    const id = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    return id ? `https://formspree.io/f/${id}` : "";
  }, []);

  function update(field: keyof FormData, value: string) {
    setData((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: "" }));
    }
  }

  function validate(targetStep = step) {
    const nextErrors: Record<string, string> = {};
    if (targetStep === 1 && !data.service) nextErrors.service = "Choose the service you need.";
    if (targetStep === 2 && !data.location.trim()) nextErrors.location = "Tell us the town or postcode.";
    if (targetStep === 3) {
      if (!data.name.trim()) nextErrors.name = "Tell us your name.";
      if (!data.phone.trim()) nextErrors.phone = "Tell us the best phone number.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) nextErrors.email = "Enter a valid email address.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function next() {
    if (validate()) setStep((current) => Math.min(3, current + 1));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate(3)) return;
    if (data.website || Date.now() - startedAt < 3000) {
      setSubmitError("Please try again in a moment.");
      return;
    }
    if (!endpoint) {
      setSubmitError("The online form is not connected yet. Please call us or email hello@gbcontracting.co.uk.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Formspree submission failed");
      window.location.href = mode === "booking" ? "/book/thank-you" : "/quote/thank-you";
    } catch {
      setSubmitError("Something went wrong sending the enquiry. Please call us instead.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form-panel form-grid" onSubmit={submit}>
      <div className="stack">
        <p><strong>Step {step} of 3</strong></p>
        <div className="progress" aria-hidden="true"><span style={{ width: `${(step / 3) * 100}%` }} /></div>
      </div>

      <input
        aria-hidden="true"
        autoComplete="off"
        name="website"
        onChange={(event) => update("website", event.target.value)}
        style={{ display: "none" }}
        tabIndex={-1}
        value={data.website}
      />

      <input name="enquiryType" type="hidden" value={mode === "booking" ? "Book a site visit" : "Quote request"} />

      {step === 1 && (
        <div className="form-grid">
          <h2>{mode === "booking" ? "What should we assess?" : "What do you need?"}</h2>
          <SelectField error={errors.service} label="Service" name="service" onChange={(value) => update("service", value)} options={services} required value={data.service} />
          <button className="button button-primary" onClick={next} type="button">Next →</button>
        </div>
      )}

      {step === 2 && (
        <div className="form-grid">
          <h2>{mode === "booking" ? "Site details" : "The job"}</h2>
          <SelectField label="Property type" name="propertyType" onChange={(value) => update("propertyType", value)} options={propertyTypes} value={data.propertyType} />
          <SelectField label="Job size" name="jobSize" onChange={(value) => update("jobSize", value)} options={jobSizes} value={data.jobSize} />
          <TextField error={errors.location} label="Town or postcode" name="location" onChange={(value) => update("location", value)} required value={data.location} />
          <SelectField label="Preferred timeframe" name="timeframe" onChange={(value) => update("timeframe", value)} options={timeframes} value={data.timeframe} />
          <div className="field">
            <label htmlFor="photos">Photos (optional)</label>
            <input accept="image/*" id="photos" multiple name="photos" type="file" />
          </div>
          <div className="field">
            <label htmlFor="notes">Notes (optional)</label>
            <textarea id="notes" name="notes" onChange={(event) => update("notes", event.target.value)} value={data.notes} />
          </div>
          <div className="hero-actions">
            <button className="button button-secondary" onClick={() => setStep(1)} type="button">← Back</button>
            <button className="button button-primary" onClick={next} type="button">Next →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="form-grid">
          <h2>{mode === "booking" ? "Book the visit" : "Your details"}</h2>
          <TextField error={errors.name} label="Name" name="name" onChange={(value) => update("name", value)} required value={data.name} />
          <TextField error={errors.phone} inputMode="tel" label="Phone" name="phone" onChange={(value) => update("phone", value)} required type="tel" value={data.phone} />
          <TextField error={errors.email} label="Email" name="email" onChange={(value) => update("email", value)} required type="email" value={data.email} />
          <SelectField label="Best time to contact" name="bestTime" onChange={(value) => update("bestTime", value)} options={bestTimes} value={data.bestTime} />
          <p>We’ll only use your details to respond to this enquiry.</p>
          {submitError && <p className="error-text" role="alert">{submitError}</p>}
          <div className="hero-actions">
            <button className="button button-secondary" onClick={() => setStep(2)} type="button">← Back</button>
            <button className="button button-primary" disabled={submitting} type="submit">{submitting ? "Sending..." : mode === "booking" ? "Book my site visit →" : "Send my enquiry →"}</button>
          </div>
        </div>
      )}
    </form>
  );
}

function TextField({
  error,
  inputMode,
  label,
  name,
  onChange,
  required = false,
  type = "text",
  value,
}: {
  error?: string;
  inputMode?: "tel";
  label: string;
  name: keyof FormData;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  value: string;
}) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}{required ? "*" : ""}</label>
      <input
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        id={name}
        inputMode={inputMode}
        name={name}
        onBlur={() => undefined}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        type={type}
        value={value}
      />
      {error && <span className="error-text" id={`${name}-error`}>{error}</span>}
    </div>
  );
}

function SelectField({
  error,
  label,
  name,
  onChange,
  options,
  required = false,
  value,
}: {
  error?: string;
  label: string;
  name: keyof FormData;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
  value: string;
}) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}{required ? "*" : ""}</label>
      <select
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        id={name}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        value={value}
      >
        <option value="">Select...</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
      {error && <span className="error-text" id={`${name}-error`}>{error}</span>}
    </div>
  );
}
