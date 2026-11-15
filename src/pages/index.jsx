import { useEffect } from "react";
import Hero from "../components/Hero.jsx";
import BookingForm from "../components/Booking.jsx";
import {
  ContactList, Cta, FaqList, FirstVisit, HoursTable, Intro,
  ReviewsGrid, ReviewsSlider, ServicesList, ServicesPreview, TeamGrid, WhyUs,
} from "../components/Sections.jsx";
import { Button, PageHero, Tag, WhatsAppIcon } from "../components/ui.jsx";
import { clinic, faqs, waLink } from "../data.js";

function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Bozid Dental Clinic, Ibadan` : "Bozid Dental Clinic, Ibadan | Your smile, our priority";
  }, [title]);
}

export function Home() {
  useTitle();
  return (
    <>
      <Hero />
      <ServicesPreview />
      <WhyUs />
      <FirstVisit />
      <ReviewsSlider />
      <FaqList items={faqs.slice(0, 4)} />
      <Cta />
    </>
  );
}

export function About() {
  useTitle("About us");
  return (
    <>
      <PageHero tag="About us" title="Your smile, our priority">
        A trusted dental clinic in Ibadan providing quality, affordable dental care in a friendly and comfortable environment.
      </PageHero>
      <Intro more={false} />
      <WhyUs />
      <section className="section section--grey">
        <div className="wrap visit">
          <div>
            <Tag>Visit us</Tag>
            <h2 className="h-lg">Find us on Ring Road, Ibadan</h2>
            <p className="lead">{clinic.address}</p>
            <HoursTable />
            <div className="btn-row">
              <Button href={clinic.mapUrl} target="_blank" rel="noopener noreferrer">Get directions</Button>
              <Button outline to="/contact">Contact us</Button>
            </div>
          </div>
          <iframe className="map" title="Map showing Bozid Dental Clinic, Ring Road, Ibadan" src={clinic.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
      <Cta />
    </>
  );
}

export function Services() {
  useTitle("Services");
  return (
    <>
      <PageHero tag="Our services" title="Dental services">
        Preventive, restorative and cosmetic dental care for the whole family, all in one place.
      </PageHero>
      <ServicesList />
      <FirstVisit />
      <Cta />
    </>
  );
}

export function Team() {
  useTitle("Meet the team");
  return (
    <>
      <PageHero tag="Our team" title="Meet the team">
        Caring, experienced dental professionals dedicated to your comfort and your smile.
      </PageHero>
      <TeamGrid />
      <Cta />
    </>
  );
}

export function Reviews() {
  useTitle("Reviews");
  return (
    <>
      <PageHero tag="Testimonials" title="What our patients say">
        Kind words from the people who trust us with their smiles.
      </PageHero>
      <ReviewsGrid />
      <Cta />
    </>
  );
}

export function Faqs() {
  useTitle("FAQs");
  return (
    <>
      <PageHero tag="FAQs" title="Frequently asked questions">
        Quick answers about booking, opening hours and your visit.
      </PageHero>
      <FaqList withIntro={false} />
      <Cta />
    </>
  );
}

export function Contact() {
  useTitle("Contact");
  return (
    <>
      <PageHero tag="Contact" title="Get in touch">
        Call, WhatsApp or visit us. We're happy to answer your questions and help you book.
      </PageHero>
      <section className="section">
        <div className="wrap contact-page">
          <div>
            <h2 className="h-md">Contact details</h2>
            <ContactList />
            <div className="btn-row">
              <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />Chat on WhatsApp</a>
              <Button outline to="/book">Request an appointment</Button>
            </div>
          </div>
          <div>
            <h2 className="h-md">Opening hours</h2>
            <HoursTable />
            <iframe className="map" title="Map showing Bozid Dental Clinic, Ring Road, Ibadan" src={clinic.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>
    </>
  );
}

export function Book() {
  useTitle("Book an appointment");
  return (
    <>
      <PageHero tag="Book an appointment" title="Request an appointment">
        Tell us when suits you and our team will call or message you to confirm.
      </PageHero>
      <section className="section section--grey">
        <div className="wrap book">
          <div>
            <h2 className="h-md">How it works</h2>
            <ol className="steps steps--compact">
              <li><h3>Send your request</h3><p>Fill in the form and send it via WhatsApp or email.</p></li>
              <li><h3>We confirm</h3><p>Our team will call or message you to confirm a time.</p></li>
              <li><h3>Visit us</h3><p>{clinic.address}.</p></li>
            </ol>
            <h2 className="h-md">Prefer to call?</h2>
            <ContactList />
          </div>
          <BookingForm />
        </div>
      </section>
    </>
  );
}

export function NotFound() {
  useTitle("Page not found");
  return (
    <>
      <PageHero title="Page not found" crumb="Not found">
        Sorry, we couldn't find that page.
      </PageHero>
      <section className="section">
        <div className="wrap btn-row">
          <Button to="/">Back to home</Button>
          <Button outline to="/book">Book an appointment</Button>
        </div>
      </section>
    </>
  );
}
