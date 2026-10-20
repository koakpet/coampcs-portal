import {getPortalContext} from "@/lib/auth/getPortalContext";
import Image from "next/image";
import {
  UserCircle2,
  UserRound,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  BriefcaseBusiness,
  ShieldCheck,
  Pencil,
  LockKeyhole,
  ChevronRight,
} from "lucide-react";

export default async function ProfilePage() {
  const {user, selectedCooperative} = await getPortalContext();

  const member = {
    firstName: "Kohly",
    middleName: "M.",
    lastName: "Akpet",
    email: "member@example.com",
    phone: "Not provided",
    dateOfBirth: "Not provided",
    gender: "Not provided",
    address: "Not provided",
    city: "Calabar",
    state: "Cross River",
    employmentDate: "Not provided",
    membershipNumber: "COA-MPCS-XXXX",
    status: "Active",
    role: "Member",
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 pt-27 pb-6 md:px-8 md:pb-8">
      {/* Profile header */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-green-800 px-6 py-8 md:px-8">
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-3">
              <div className="overflow-hidden h-24 w-24 rounded-full border border-[#0B1F4D]">
                <Image
                  src="/user.jpg"
                  width={240}
                  height={240}
                  alt="user_image"
                />
              </div>

              <div className="">
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                  <UserCircle2 size={15} />
                  <span className="font-semibold">
                    {selectedCooperative?.membership_no || "Not available"}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-white md:text-2xl">
                  {user.firstName} {user.middleName} {user.lastName}
                </h2>

                <p className="break-all text-sm text-blue-100">{user.email}</p>
              </div>
            </div>

            <div className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white">
              {selectedCooperative.status}
            </div>
          </div>
        </div>

        {/* Profile content */}
        <div className="space-y-8 p-5 md:p-8">
          {/* Personal information */}
          <section>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Your personal and contact details.
                </p>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <Pencil size={15} />
                Edit profile
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <ProfileField
                label="First name"
                value={user.firstName}
                icon={<UserRound size={17} />}
              />

              <ProfileField
                label="Middle name"
                value={user.middleName}
                icon={<UserRound size={17} />}
              />

              <ProfileField
                label="Last name"
                value={user.lastName}
                icon={<UserRound size={17} />}
              />

              <ProfileField
                label="Email address"
                value={user.email}
                icon={<Mail size={17} />}
              />

              <ProfileField
                label="Phone number"
                value={user.phone}
                icon={<Phone size={17} />}
              />

              <ProfileField
                label="Date of birth"
                value={user.dateOfBirth}
                icon={<CalendarDays size={17} />}
              />

              <ProfileField
                label="Gender"
                value={user.gender}
                icon={<UserRound size={17} />}
              />

              <ProfileField
                label="Residential address"
                value={member.address}
                icon={<MapPin size={17} />}
              />

              <ProfileField
                label="Division"
                value={member.division}
                icon={<MapPin size={17} />}
              />

              <ProfileField
                label="State"
                value={member.state}
                icon={<MapPin size={17} />}
              />
            </div>
          </section>

          <div className="border-t border-slate-100" />

          {/* Employment information */}
          <section>
            <div className="mb-5">
              <h3 className="font-semibold text-slate-900">
                Employment Information
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Employment details recorded on your account.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <ProfileField
                label="Employment date"
                value={member.employmentDate}
                icon={<BriefcaseBusiness size={17} />}
              />
            </div>
          </section>

          <div className="border-t border-slate-100" />

          {/* Membership information: read-only */}
          <section>
            <div className="mb-5">
              <h3 className="font-semibold text-slate-900">
                Membership Information
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                These details are managed by the cooperative.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <ProfileField
                label="Membership number"
                value={member.membershipNumber}
                icon={<ShieldCheck size={17} />}
              />

              <ProfileField
                label="Membership status"
                value={member.status}
                icon={<ShieldCheck size={17} />}
              />

              <ProfileField
                label="Member role"
                value={member.role}
                icon={<ShieldCheck size={17} />}
              />
            </div>
          </section>

          <div className="border-t border-slate-100" />

          {/* Account security */}
          <section>
            <div className="mb-4">
              <h3 className="font-semibold text-slate-900">
                Account & Security
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Protect access to your account.
              </p>
            </div>

            <button
              type="button"
              className="flex w-full items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition hover:bg-slate-50"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <LockKeyhole size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900">
                  Change password
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Update your password to help keep your account secure.
                </p>
              </div>

              <ChevronRight size={20} className="shrink-0 text-slate-400" />
            </button>
          </section>
        </div>
      </section>

      <p className="text-center text-xs text-slate-400">
        Court of Appeal Calabar Staff Multi-Purpose Cooperative Society
      </p>
    </main>
  );
}

function ProfileField({label, value, icon}) {
  return (
    <div className="min-w-0">
      <p className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
        <span className="text-slate-400">{icon}</span>
        {label}
      </p>

      <p className="break-words text-sm font-medium text-slate-800">
        {value || "Not provided"}
      </p>
    </div>
  );
}
