"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Container from "../components/Container";
import emailjs from '@emailjs/browser';

// Define contact items
const contactItems = [
  {
    id: "CNT 0.1",
    title: "General inquiries",
    description:
      "Reach out for project-related questions, or general information about the system.",
    href: "mailto:russapaypal@gmail.com", 
    tone: "gold",
    image: "/images/cont_2.png", 
  },
];

// Define motion animations
const headerMotion = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut" as const, 
    },
  },
};

const containerMotion = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const itemMotion = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const, // Use valid Framer Motion easing
    },
  },
};

// Helper function to get tone classes
function getToneClasses(tone: string) {
  switch (tone) {
    case "gold":
      return {
        card: "bg-[linear-gradient(180deg,#F1C66F_0%,#EDC980_45%,#F3D79D_100%)]",
        badge: "bg-white/42 border-white/28 text-black/65",
        title: "text-black/88",
        desc: "text-black/62",
        button: "border-black/10 text-black/72 hover:bg-white/20",
      };

    case "blue":
      return {
        card: "bg-[linear-gradient(180deg,#BFE0FF_0%,#CBE4FF_45%,#D9ECFF_100%)]",
        badge: "bg-white/48 border-white/28 text-black/65",
        title: "text-black/88",
        desc: "text-black/62",
        button: "border-black/10 text-black/72 hover:bg-white/20",
      };

    case "violet":
      return {
        card: "bg-[linear-gradient(180deg,#CFC8FF_0%,#D9D2FF_45%,#E6DFFF_100%)]",
        badge: "bg-white/48 border-white/28 text-black/65",
        title: "text-black/88",
        desc: "text-black/62",
        button: "border-black/10 text-black/72 hover:bg-white/20",
      };

    case "lilac":
    default:
      return {
        card: "bg-[linear-gradient(180deg,#E7C8F7_0%,#EDD8FA_48%,#F5EAFD_100%)]",
        badge: "bg-white/52 border-white/28 text-black/65",
        title: "text-black/88",
        desc: "text-black/62",
        button: "border-black/10 text-black/72 hover:bg-white/22",
      };
  }
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Additional validation for name field
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(formData.name)) {
      alert('Name should only contain letters and spaces.');
      setIsSubmitting(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    try {
      // EmailJS configuration - Replace these with your actual EmailJS credentials
      const serviceId = 'service_a2hjo65'; // Replace with your EmailJS service ID
      const templateId = 'template_dcitamj'; // Replace with your EmailJS template ID
      const publicKey = 'S_00bS2Wxjibxg5Gx'; // Replace with your EmailJS public key

      // Initialize EmailJS
      emailjs.init(publicKey);

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'russapaypal@gmail.com', // The email that receives the form data
      };

      // Send email
      await emailjs.send(serviceId, templateId, templateParams);

      alert('Thank you for your message! We will get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Email sending failed:', error);
      alert('Sorry, there was an error sending your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="pb-20 sm:pb-24 lg:pb-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="w-full"
        >
          <motion.div variants={headerMotion} className="w-full max-w-4xl">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-black/45">
              Contact us
            </p>

            <h2 className="max-w-3xl text-[34px] font-semibold leading-[1.02] tracking-[-0.045em] text-black sm:text-[42px] lg:text-[56px]">
              How can we help?
            </h2>

            <p className="mt-4 max-w-2xl text-[14px] leading-6 text-black/56">
              Get in touch for project questions, presentation requests, document
              access, or general academic communication.
            </p>
          </motion.div>

          <div className="mt-10 flex w-full flex-col gap-8 lg:flex-row lg:gap-12">
            {/* Left side: Contact Form */}
            <div className="flex-1">
              <motion.div
                variants={itemMotion}
                className="w-full"
              >
                <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-black/90 mb-4">
                  Send us a message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-[14px] font-medium text-black/70 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      pattern="[A-Za-z\s]+"
                      title="Name should only contain letters and spaces"
                      className="w-full px-3 py-2 border border-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-black/30"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[14px] font-medium text-black/70 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-black/30"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-[14px] font-medium text-black/70 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-black/30"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-[14px] font-medium text-black/70 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-black/30"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Right side: Illustration */}
            <div className="flex-1">
              <motion.div
                variants={itemMotion}
                className="w-full"
              >
                <div className="w-full">
                  <div className="mb-4 text-[10px] uppercase tracking-[0.16em] text-black/35">
                    {contactItems[0].id}
                  </div>

                  <div className="flex items-center justify-center rounded-[14px]">
                    <div className="text-center">
                      <img
                        src={contactItems[0].image}
                        alt={contactItems[0].title}
                        className="h-full w-full object-contain rounded-[14px]"
                      />
                    </div>
                  </div>

                  <div className="mt-5 w-full">
                    <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-black/90">
                      {contactItems[0].title}
                    </h3>

                    <p className="mt-1 text-[13px] text-black/45">
                      {contactItems[0].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}