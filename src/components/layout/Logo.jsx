import Image from "next/image";

export default function Logo({cooperative}) {
  const coopName = cooperative?.cooperative_name;

  function getSocietyName() {
    return text.slice(0, -30).trim();
  }

  return (
    <div className="flex items-center gap-1">
      <div className="overflow-hidden h-12 w-12 md:h-15 md:w-15 rounded-full">
        <Image
          src="/logo.jpg"
          width={120}
          height={120}
          alt="Logo"
          className="object-cover"
        />
      </div>
      <div>
        <p className="text-sm md:text-sm font-semibold text-slate-900">
          {coopName ? coopName.slice(0, -4).trim() : "Court of Appeal Staff"}
        </p>
        <p className="text-xs text-slate-500">
          Multi-Purpose Cooperative Society
        </p>
      </div>
    </div>
  );
}
