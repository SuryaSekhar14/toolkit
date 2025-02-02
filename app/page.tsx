import AppCard from "./components/AppCard";
import { MdOutlineDns } from "react-icons/md";
import { SiPypi } from "react-icons/si";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="p-5 dark:bg-gray-900 dark:text-white">
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
          title="Image to PDF Converter"
          description={
            <>Convert multiple images and PDFs to a single PDF file online.</>
          }
          link="/img2pdf"
        />
        <AppCard
          title="Tool 4"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          link="/tool4"
        />
        <AppCard
          title="Tool 5"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          link="/tool5"
        />
        <AppCard
          title="Tool 6"
          description="Description for tool 6."
          link="/tool6"
        />
      </div>

      <Footer />
    </div>
  );
}
