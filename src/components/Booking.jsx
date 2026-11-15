import { useState } from "react";
import { clinic, serviceOptions } from "../data.js";
import { Button, Tag } from "./ui.jsx";

const empty = { name: "", phone: "", email: "", date: "", message: "" };
const today = () => new Date().toISOString().split("T")[0];

export default function Booking({ service, setService }) {
  const [form, setForm] = useState(empty);
  const [invalid, setInvalid] = useState({});
  const [status, setStatus] = useState(null); // { ok: boolean, text: string }

  const update = (e) => {
    const { name, value } = e.target;
    if (name === "service") setService(value);
    else setForm((f) => ({ ...f, [name]: value }));
    setInvalid((v) => ({ ...v, [name]: false }));
  };

  const submit = (e) => {
    e.preventDefault();
    const values = { ...form, service };
    const bad = {};
    ["name", "phone", "email", "service", "date"].forEach((k) => {
      if (!String(values[k]).trim()) bad[k] = true;
    });
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) bad.email = true;
    setInvalid(bad);
    if (Object.keys(bad).length) {
      setStatus({ ok: false, text: "Please fill in all required fields." });
      return;
    }

    // TODO: connect to a form service (e.g. Formspree) to receive requests directly.
    const body = [
      `Name: ${values.name}`, `Phone: ${values.phone}`, `Email: ${values.email}`,
      `Service: ${values.service}`, `Preferred date: ${values.date}`, `Message: ${values.message || "-"}`,
    ].join("\n");
    window.location.href = `mailto:${clinic.email}?subject=${encodeURIComponent("Appointment request: " + values.service)}&body=${encodeURIComponent(body)}`;

    setStatus({ ok: true, text: "Thank you! Your email app should open to send the request. We'll confirm within one business day." });
    setForm(empty);
    setService("");
  };

  const field = (name) => ({ name, value: form[name], onChange: update, className: invalid[name] ? "is-invalid" : undefined, "aria-invalid": invalid[name] || undefined });

  return (
    <section className="section section--grey" id="book">
      <div className="wrap book">
        <div>
          <Tag>Book an appointment</Tag>
          <h2 className="h-lg">Ready for a healthier smile?</h2>
          <p className="muted">Send your preferred date and we'll confirm within one business day. In pain? Call or WhatsApp us directly.</p>
          <ul className="contact">
            <li><small>Phone</small><span className="contact__phones">{clinic.phones.map((ph) => <a key={ph.href} href={ph.href}>{ph.display}</a>)}</span></li>
            <li><small>WhatsApp</small><a href={clinic.whatsapp} target="_blank" rel="noopener noreferrer">Chat with us on WhatsApp</a></li>
            <li><small>Email</small><a href={`mailto:${clinic.email}`}>{clinic.email}</a></li>
            <li><small>Address</small><span>{clinic.addressLines.join(", ")} · <a href={clinic.mapUrl} target="_blank" rel="noopener noreferrer">Directions</a></span></li>
            <li><small>Hours</small><span>{clinic.hoursShort}</span></li>
          </ul>
        </div>

        <form className="form" onSubmit={submit} noValidate>
          <div className="form__row">
            <label>Full name<input type="text" autoComplete="name" required {...field("name")} /></label>
            <label>Phone<input type="tel" autoComplete="tel" required {...field("phone")} /></label>
          </div>
          <label>Email<input type="email" autoComplete="email" required {...field("email")} /></label>
          <div className="form__row">
            <label>Service
              <select name="service" value={service} onChange={update} required className={invalid.service ? "is-invalid" : undefined}>
                <option value="">Choose a service</option>
                {serviceOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>
            <label>Preferred date<input type="date" min={today()} required {...field("date")} /></label>
          </div>
          <label>Message <span className="muted">(optional)</span><textarea rows={3} {...field("message")} /></label>
          <Button type="submit" block>Request appointment</Button>
          <p className={status ? `form__status ${status.ok ? "is-ok" : "is-err"}` : "form__status"} role="status" aria-live="polite">
            {status?.text}
          </p>
        </form>
      </div>
    </section>
  );
}
