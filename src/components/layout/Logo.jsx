import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-1">
      <div className="overflow-hidden h-15 w-15 rounded-full">
        <Image
          src="/logo.jpg"
          width={120}
          height={120}
          alt="Logo"
          className="object-cover"
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900">
          Court of Appeal Staff
        </p>
        <p className="text-xs text-slate-500">
          Multi-Purpose Cooperative Society
        </p>
      </div>
    </div>
  );
}
