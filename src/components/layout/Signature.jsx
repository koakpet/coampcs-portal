import Link from "next/link";
import {Building2, Mail, Phone} from "lucide-react";

export default function Signature() {
  return (
    <div className="border-t border-slate-300 bg-slate-200 px-6 py-3">
      <p className="text-sm text-right">
        Designed & Developed by{" "}
        <a
          href="https://linkedin.com/in/kohly-akpet"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#0B1F4D] hover:text-[#6d93ed]"
        >
          Kohly Akpet
        </a>
        .
      </p>
    </div>
  );
}
