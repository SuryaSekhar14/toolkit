import AppCard from "./components/AppCard";
import { MdOutlineDns } from "react-icons/md";
import { SiPypi } from "react-icons/si";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="p-10 dark:bg-gray-900 dark:text-white">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
        <AppCard
          title="PyPi Stats - Total Downloads"
          description="Get the total download count for a PyPi package."
          link="/pypi-stats"
          icon={<SiPypi size={32} />}
        />
        <AppCard
          title="Dig"
          description={
            <>
              Fetch DNS records for a domain. <br /> <br />
              Supported record types: <br /> <br /> A, AAAA, ANY, CAA, CNAME,
              DNSKEY, DS, MX, NS, PTR, TXT, SOA, SPF, SRV, TLSA, TSIG.
            </>
          }
          link="/dig"
          icon={<MdOutlineDns size={32} />}
        />
        <AppCard
          title="Online Image to PDF Converter!"
          description={
            <>Convert multiple images and PDFs to a single PDF file online.</>
          }
          link="/image-to-pdf"
        />
        <AppCard
          title="Clipboard image download"
          description="Download your clipboard images as a file."
          link="/clipboard-image-download" 
        />
      </div>

      <Footer />
    </div>
  );
}
