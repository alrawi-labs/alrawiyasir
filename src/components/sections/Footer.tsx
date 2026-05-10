"use client";

import SocialIcon from "@/components/ui/SocialIcon";
import FooterNavItem from "@/components/ui/FooterNavItem";
import useWidth from "../../../hooks/useWidth";
import useSmoothNav from "../../../hooks/useSmoothNav";
import images from "../../../constants/images";

const NAV_ITEMS = ["Home", "Projects", "Articles", "Contact"];

const SOCIAL_ICONS = [
  { src: images.icoSoc02, href: "https://github.com/yasir237" },
  { src: images.icoSoc03, href: "https://www.linkedin.com/in/yasir-alrawi/" },
  { src: images.icoSoc04, href: "https://www.instagram.com/yasir7_23/" },
];

const CONTACT_INFO = [
  {
    label: "Ankara, Türkiye",
    href: "https://maps.google.com/?q=Ankara,Türkiye",
  },
  {
    label: "yasir7alrawi23@gmail.com",
    href: "mailto:yasir7alrawi23@gmail.com",
  },
];
const Footer = () => {
 const w = useWidth();

 const handleNav = useSmoothNav();
  
  if (w === null) return null;
  const isMobile = w > 0 && w < 768;
  const isTablet = w >= 768 && w < 1024;

  return (
    <footer className="pt-12 pb-0" style={{ background: "#f5ede0" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={
            isMobile
              ? "flex flex-col gap-8 py-10"
              : "flex flex-wrap items-center justify-between gap-8 py-10"
          }
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={images.alrawiLogo}
              alt="Alrawi"
              className={isMobile ? "h-10" : "h-12 mr-12"}
              referrerPolicy="no-referrer"
            />
          </div>

          {!isMobile && (
            <img src={images.dahsedIlist} alt="" className="h-16" />
          )}

          {/* Nav links */}
          <div className="flex items-start gap-2">
            <div className="grid grid-cols-2 gap-x-10 gap-y-2">
              {NAV_ITEMS.map((item) => (
                <FooterNavItem
                  key={item}
                  item={item}
                  handleNav={handleNav}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>

          {!isMobile && (
            <img src={images.dahsedIlist} alt="" className="h-16" />
          )}

          {/* Contact info */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "6px" : "0 0",
            }}
          >
            {CONTACT_INFO.map(({ label, href }) => (
              <a key={label} href={href} target="_blank">
                <span
                  className="text-[#555] font-normal tracking-wide"
                  style={{ fontSize: isMobile ? "15px" : "18px" }}
                >
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{ borderTop: "1px solid #ddd4c4" }}
          className={
            isMobile
              ? "flex flex-col gap-4 py-6"
              : "flex flex-wrap items-center justify-between gap-6 py-6"
          }
        >
          <div className="flex items-center gap-3">
            <img
              src={images.alrawiikon}
              alt="Yasir Alrawi"
              className="h-7"
              referrerPolicy="no-referrer"
            />
            <span className="text-[#888] text-xs uppercase tracking-widest">
              2026 Alrawi. All rights reserved
            </span>
          </div>
          <div className="flex items-center gap-5 text-[rgba(16,16,16,.2)]">
            {SOCIAL_ICONS.map(({ src, href }, i) => (
              <SocialIcon key={i} src={src} href={href} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
