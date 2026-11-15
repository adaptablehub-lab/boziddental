import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { clinic, serviceOptions, waLink } from "../data.js";
import { WhatsAppIcon } from "./ui.jsx";

const empty = { name: "", phone: "", email: "", service: "", date: "", time: "", message: "" };
const today = () => new Date().toISOString().split("T")[0];
const required = ["name", "phone", "service", "date"];

/**
 * Appointment request form. Per the client: "website form followed by confirmation from Bozid".
 * Without a server, the request is sent through the patient's WhatsApp (preferred) or email app.
 * To receive requests directly, connect a form service (e.g. Formspree) in `send()`.
 */
export default function BookingForm() {
  const [params] = useSearchParams();
  const [form, setForm] = useState(empty);
  const [invalid, setInvalid] = useState({});
  const [status, setStatus] = useState(null);
  const [minDate, setMinDate] = useState(undefined);
  useEffect(() => setMinDate(today()), []);

  // Pre-select the service when arriving from a "Book this treatment" link
  useEffect(() => {
    const s = params.get("service");
    if (s && serviceOptions.includes(s)) setForm((f) => ({ ...f, service: s }));
  }, [params]);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setInvalid((v) => ({ ...v, [name]: false }));
  };

  const validate = () => {
    const bad = {};
    required.forEach((k) => { if (!form[k].trim()) bad[k] = true; });
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) bad.email = true;
    // Nigerian numbers: 11 digits starting 0 (e.g. 0803…), or +234 / 234 followed by 10 digits
    const digits = form.phone.replace(/[^\d+]/g, "");
    if (form.phone.trim() && !/^(0\d{10}|\+?234\d{10})$/.test(digits)) bad.phone = true;
    setInvalid(bad);
    return bad; // empty object = valid
  };

  const summary = () => [
    "Hello Bozid Dental, I'd like to request an appointment.",
    "",
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    form.email ? `Email: ${form.email}` : null,
    `Service: ${form.service}`,
    `Preferred date: ${form.date}${form.time ? `, ${form.time}` : ""}`,
    form.message ? `Message: ${form.message}` : null,
  ].filter((l) => l !== null).join("\n");

  const send = (via) => {
    const bad = validate();
    if (Object.keys(bad).length) {
      setStatus({ ok: false, text: bad.phone && form.phone.trim() ? "Please enter a valid Nigerian phone number, e.g. 0803 000 0000." : "Please fill in the highlighted fields." });
      return;
    }
    const text = summary();
    if (via === "whatsapp") {
      window.open(waLink(text), "_blank", "noopener");
    } else {
      window.location.href = `mailto:${clinic.email}?subject=${encodeURIComponent("Appointment request: " + form.service)}&body=${encodeURIComponent(text)}`;
    }
    setStatus({ ok: true, text: "Thank you! Please send the message that just opened. Our team will call or message you to confirm your appointment." });
  };

  const field = (name) => ({
    name, value: form[name], onChange: update,
    className: invalid[name] ? "is-invalid" : undefined,
    "aria-invalid": invalid[name] || undefined,
  });

  return (
    <form className="form" onSubmit={(e) => { e.preventDefault(); send("whatsapp"); }} noValidate>
      <div className="form__row">
        <label>Full name *<input type="text" autoComplete="name" required {...field("name")} /></label>
        <label>Phone number *<input type="tel" autoComplete="tel" inputMode="tel" placeholder="e.g. 0803 000 0000" required {...field("phone")} /></label>
      </div>
      <label>Email <span className="muted">(optional)</span><input type="email" autoComplete="email" {...field("email")} /></label>
      <label>Service *
        <select required {...field("service")}>
          <option value="">Choose a service</option>
          {serviceOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <div className="form__row">
        <label>Preferred date *<input type="date" min={minDate} required {...field("date")} /></label>
        <label>Preferred time
          <select {...field("time")}>
            <option value="">Any time</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening (weekdays)</option>
          </select>
        </label>
      </div>
      <label>Message <span className="muted">(optional)</span><textarea rows={3} {...field("message")} /></label>
      <div className="form__actions">
        <button type="submit" className="btn btn--wa btn--block"><WhatsAppIcon />Send request via WhatsApp</button>
        <button type="button" className="btn btn--outline btn--block" onClick={() => send("email")}>Send by email instead</button>
      </div>
      <p className="form__hint">We'll call or message you to confirm your appointment.</p>
      <p className={status ? `form__status ${status.ok ? "is-ok" : "is-err"}` : "form__status"} role="status" aria-live="polite">{status?.text}</p>
    </form>
  );
}
