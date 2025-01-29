import AppCard from "./components/AppCard";
import { MdOutlineDns } from "react-icons/md";

export default function Home() {
  return (
    <div className="p-5">
      <header className="mb-5">
        <h1 className="p-4 text-2xl font-bold text-center">
          Welcome to Surya's Toolkit! 🧰
        </h1>
        <h3 className="text-center">
          This is a collection of tools that I've built to help me with various
          tasks. Feel free to use them and let me know if you have any feedback
          or suggestions.
        </h3>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
        <AppCard
          title="Dig"
          description={
            <>
              Fetch DNS records for a domain. <br /> <br />
              Supported record types: <br /> <br /> A, AAAA, ANY, CAA, CNAME, DNSKEY, DS, MX, NS, PTR, TXT, SOA, SPF, SRV, TLSA, TSIG.
            </>      
          }    
          link="/dig"
          icon={<MdOutlineDns size={32} />}
        />
        <AppCard
          title="Tool 2"
          description="lorem ipsum dolor sit amet consectetur. lorem ipsum dolor sit amet consectetur. lorem ipsum dolor sit amet consectetur. lorem ipsum dolor sit amet consectetur. orem ipsum dolor sit amet consectetur. lorem ipsum dolor sit amet consectetur. lorem ipsum dolor sit amet consectetur. lorem ipsum dolor sit amet consectetur."
          link="/tool2"
        />
        <AppCard
          title="Tool 3"
          description="lorem ipsum dolor sit amet consectetur. lorem ipsum dolor sit amet consectetur. lorem ipsum dolor sit amet consectetur. lorem ipsum dolor sit amet consectetur."
          link="/tool3"
        />
        <AppCard
          title="Tool 4"
          description="Description for tool 4."
          link="/tool4"
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
    </div>
  );
}
