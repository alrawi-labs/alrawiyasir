"use client";

import ScrollProgressBar        from "@/components/ui/ScrollProgressBar";
import Navbar                   from "@/components/sections/Navbar";
import Hero                     from "@/components/sections/Hero";
import Education                from "@/components/sections/Education";
import FeaturedProjects         from "@/components/sections/FeaturedProjects";
import Experience               from "@/components/sections/Experience";
import Articles                 from "@/components/sections/Articles";
import Skills                   from "@/components/sections/Skills";
import Volunteering             from "@/components/sections/Volunteering";
import Certificates             from "@/components/sections/Certificates";
import ContactForm              from "@/components/sections/ContactForm";
import Footer                   from "@/components/sections/Footer";
import ChatBot                  from "@/components/sections/ChatBot";
import { useState } from "react";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);

  
  return (
    <div className="min-h-screen">
      <ScrollProgressBar />
      <Navbar onAskAI={() => setChatOpen(true)}/>
      <main>
        <Hero />
        <Education />
        <FeaturedProjects />
        <Experience />
        <Articles />
        <Skills />
        <Volunteering />
        <Certificates />
        <ContactForm />
      </main>
      <Footer />
      <ChatBot isOpen={chatOpen} setIsOpen={setChatOpen} />
    </div>
  );
}