"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import ContactFormSubmitButton from "@/components/ui/ContactFormSubmitButton";
import useWidth from "../../../hooks/useWidth";
import images from "../../../constants/images";

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const w = useWidth();
  const isMobile = w < 768;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className={
        isMobile
          ? "rounded-b-[64px]"
          : "min-h-screen flex flex-col justify-center rounded-b-[128px]"
      }
      style={{
        backgroundImage: `url(${images.footerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: isMobile ? "auto" : "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        paddingTop: isMobile ? "80px" : "280px",
        paddingBottom: "80px",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div
          className={
            isMobile
              ? "flex flex-col gap-10"
              : "grid lg:grid-cols-2 gap-16 items-center"
          }
        >
          {/* Left */}
          <div>
            <h4
              className={
                isMobile
                  ? "text-4xl font-medium text-white leading-tight"
                  : "text-6xl w-2xl font-medium text-white leading-tight"
              }
            >
              Let's connect
            </h4>
            <p
              className={
                isMobile
                  ? "text-lg font-normal my-6"
                  : "text-2xl font-normal my-10"
              }
              style={{ color: "rgb(255 255 255 / 65%)" }}
            >
              Open to AI, machine learning, data-driven and full-stack web
              development opportunities. Feel free to reach out.
            </p>

            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "stretch" : "center",
                  gap: "12px",
                  maxWidth: isMobile ? "100%" : "500px",
                }}
              >
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  className="flex-1 border border-[#b1afaf] rounded-full text-white placeholder:text-[#ffffffbd] focus:outline-none focus:border-[#fff] hover:border-white transition-colors bg-transparent"
                  style={{
                    padding: isMobile ? "14px 24px" : "20px 64px",
                    fontSize: isMobile ? "16px" : "20px",
                  }}
                />
                <ContactFormSubmitButton isMobile={isMobile} />
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-4 text-emerald-700 bg-emerald-50 p-6 rounded-2xl border border-emerald-200 max-w-md"
              >
                <CheckCircle2 size={32} />
                <div>
                  <p className="font-bold text-lg">Thank you!</p>
                  <p className="text-sm opacity-80">
                    Your submission has been received!
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right — illustration (desktop only) */}
          <div className="relative hidden lg:flex items-end justify-center border-b-2 border-[#777]">
            <img
              src={images.footerCom}
              className="absolute w-[90%]"
              referrerPolicy="no-referrer"
            />
            <img
              src={images.footerYasir}
              alt="Questions Illustration"
              className="relative z-10 w-full"
              referrerPolicy="no-referrer"
            />
            <motion.img
              animate={{ x: [0, 18, 0], y: [0, -18, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              src={images.paperAirplane}
              className="absolute top-4 right-4 w-20 z-20"
              referrerPolicy="no-referrer"
            />
            <div
              className="absolute bottom-8 left-8 rounded-full border-2 border-[#aaa] opacity-40"
              style={{ width: "40px", height: "40px" }}
            />
            <div
              className="absolute top-12 left-12 rounded-full bg-[#f2b8a0] opacity-60"
              style={{ width: "16px", height: "16px" }}
            />
            <div
              className="absolute bottom-16 right-12 rounded-full bg-[#333] opacity-30"
              style={{ width: "8px", height: "8px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
