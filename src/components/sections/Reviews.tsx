"use client";

import { motion } from "motion/react";
import useWidth from "../../../hooks/useWidth";
import images from "../../../constants/images";

const REVIEWS = [
  {
    name: "Sedanur Arslan",
    text: "The course is great! Teachers talks very interesting and accessible. Thank you very much!",
    avatar: images.person01,
  },
  {
    name: "Yasir Alrawi",
    text: "The course is clear enough. Well explained a lot of practice. I recommend to everyone!",
    avatar: images.person02,
  },
  {
    name: "Ahmed Ayhan",
    text: "The training was in one breath. Very accessible courses, everything is very clear and good.",
    avatar: images.person03,
  },
];

const Reviews = () => {
 const w = useWidth();

  
  if (w === null) return null;
  const isMobile = w > 0 && w < 768;
  const isTablet = w >= 768 && w < 1024;

  return (
    <section id="reviews" className="min-h-screen flex flex-col justify-center" style={{ background: "#f5ede0" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h4 className={isMobile ? "text-4xl text-center mb-14 font-medium text-[#222]" : "text-6xl text-center mb-24 font-medium text-[#222]"}>
          Students reviews
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr" }}>
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 }}
              className="relative flex flex-col items-center text-center px-12"
            >
              {idx !== 0 && !isMobile && (
                <div className="absolute left-0 top-0 h-full" style={{ borderLeft: "1.5px dashed #c5b8a8" }} />
              )}
              {idx !== 0 && isMobile && (
                <div style={{ borderTop: "1.5px dashed #c5b8a8", width: "100%", marginBottom: "32px" }} />
              )}

              <div className="relative w-56 h-56 mb-12 flex items-center justify-center">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="relative z-10 object-cover"
                  style={{ width: "155px" }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute rounded-full border border-[#555]"
                  style={{ width: "24px", height: "24px", top: idx === 1 ? "18px" : "10px", left: idx === 2 ? "8px" : idx === 1 ? "auto" : "10px", right: idx === 1 ? "18px" : "auto", opacity: 0.6 }}
                />
                <div className="absolute rounded-full bg-[#333]"
                  style={{ width: "8px", height: "8px", top: idx === 2 ? "30px" : "22px", right: idx === 0 ? "18px" : "auto", left: idx === 1 ? "14px" : idx === 2 ? "0px" : "auto", opacity: 0.55 }}
                />
                {idx !== 1 && (
                  <div className="absolute rounded-full border border-[#555]"
                    style={{ width: "18px", height: "18px", bottom: idx === 0 ? "14px" : "10px", right: idx === 2 ? "10px" : "auto", opacity: 0.45 }}
                  />
                )}
                {idx === 1 && (
                  <div className="absolute rounded-full bg-[#f2b8a0]"
                    style={{ width: "14px", height: "14px", bottom: "20px", right: "8px", opacity: 0.7 }}
                  />
                )}
              </div>
              <h4 className="font-bold text-2xl text-[#1a1a1a] mb-5">{review.name}</h4>
              <p className="text-[#555] text-lg leading-relaxed">{review.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;