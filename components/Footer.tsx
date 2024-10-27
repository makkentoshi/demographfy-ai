import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t  py-[2rem]">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="text-slate-400 text-lg font-mono">
          © 2024 Demographfy
        </div>

     
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link
            href="https://www.instagram.com/makkentosh1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-900"
          >
            <FaInstagram size={24} />
          </Link>

          <Link
            href="https://wa.me/+77007369302"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-900"
          >
            <FaWhatsapp size={24} />
          </Link>
        </div>

        {/* Contact Information */}
        <div className="mt-4 md:mt-0 text-slate-400 text-sm font-mono">
          <p>WhatsApp: +7 700 736 9302</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
