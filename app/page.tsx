import AppCard from "./components/AppCard";
import { MdOutlineDns } from "react-icons/md";
import { SiPypi } from "react-icons/si";
import Header from "./components/Header";
import Footer from './components/Footer';

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
          title="Tool 3"
          description="lorem ipsum dolor sit amet consectetur. lorem ipsum dolor sit amet consectetur. lorem ipsum dolor sit amet consectetur. lorem ipsum dolor sit amet consectetur. orem ipsum dolor sit amet consectetur. lorem ipsum dolor sit amet consectetur. lorem ipsum dolor sit amet consectetur. lorem ipsum dolor sit amet consectetur."
          link="/tool2"
        />
        <AppCard
          title="Tool 4"
          description="lorem ipsum dolor sit amet consectetur. lorem ipsum dolor sit amet consectetur. lorem ipsum dolor sit amet consectetur. lorem ipsum dolor sit amet consectetur."
          link="/tool3"
        />
        <AppCard
          title="Tool 5"
          description="Description for tool 5."
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
