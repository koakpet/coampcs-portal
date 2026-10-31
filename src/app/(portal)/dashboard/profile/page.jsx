import Image from "next/image";
import {getPortalContext} from "@/lib/auth/getPortalContext";
import {getProfileByUserId} from "@/lib/queries/profile";
import {
  UserCircle,
  User,
  Phone,
  Mail,
  BriefcaseBusiness,
  MapPin,
  Landmark,
  Users,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

function formatDate(value) {
  if (!value) return "Not provided";

  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function ProfileItem({label, value, icon: Icon}) {
  return (
    <div className="min-w-0">
      <div className="mb-1 flex items-center gap-2 text-slate-500">
        {Icon && <Icon size={15} />}
        <p className="text-sm">{label}</p>
      </div>

      <p className="break-words font-medium text-slate-900">
        {value || "Not provided"}
      </p>
    </div>
  );
}

export default async function ProfilePage() {
  const {user, selectedCooperative} = await getPortalContext();

  // Retrieve the profile using the users table ID
  const profile = await getProfileByUserId(user.userId);

  if (!profile) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <UserCircle size={40} className="mx-auto mb-3 text-slate-400" />
        <h2 className="font-semibold text-slate-900">Profile not found</h2>
        <p className="mt-1 text-sm text-slate-500">
          We could not retrieve your profile information.
        </p>
      </div>
    );
  }

  const fullName = [profile.first_name, profile.middle_name, profile.last_name]
    .filter(Boolean)
    .join(" ");

  const memberships = profile.memberships || [];

  return (
    <div className="flex flex-col gap-6">
      {/* PROFILE HEADER */}

      <div className="bg-green-800 px-5 py-8 md:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-white/40 bg-white">
            <Image
              src={profile.photo || "/user.jpg"}
              width={120}
              height={120}
              alt={`${fullName}'s profile photo`}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
              <UserCircle size={15} />
              <span>{selectedCooperative?.membership_no || "Membership"}</span>
            </div>

            <h2 className="text-xl font-semibold text-white md:text-2xl">
              {fullName}
            </h2>

            <p className="mt-1 break-all text-sm text-blue-100">
              {profile.email}
            </p>
          </div>
        </div>
      </div>

      {/* PERSONAL INFORMATION */}
      <section clsName="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-5 md:px-7">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-2.5 text-[#0B1F4D]">
              <User size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Personal Information
              </h3>
              <p className="text-sm text-slate-500">
                Your personal identification details.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-6 p-5 md:grid-cols-3 md:p-7">
          <ProfileItem label="First Name" value={profile.first_name} />

          <ProfileItem label="Middle Name" value={profile.middle_name} />

          <ProfileItem label="Last Name" value={profile.last_name} />

          <ProfileItem label="Gender" value={profile.gender} />

          <ProfileItem
            label="Date of Birth"
            value={formatDate(profile.date_of_birth)}
            icon={CalendarDays}
          />

          <ProfileItem
            label="Employment Date"
            value={formatDate(profile.employment_date)}
            icon={BriefcaseBusiness}
          />
        </div>
      </section>

      {/* CONTACT INFORMATION */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-5 md:px-7">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-2.5 text-[#0B1F4D]">
              <Phone size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Contact Information
              </h3>
              <p className="text-sm text-slate-500">
                Your contact and residential details.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 p-5 sm:grid-cols-2 lg:grid-cols-3 md:p-7">
          <ProfileItem
            label="Email Address"
            value={profile.email}
            icon={Mail}
          />

          <ProfileItem
            label="Phone Number"
            value={profile.phone}
            icon={Phone}
          />

          <ProfileItem
            label="Residential Address"
            value={profile.address}
            icon={MapPin}
          />

          <ProfileItem label="City" value={profile.city} />

          <ProfileItem label="State" value={profile.state_addr} />
        </div>
      </section>

      {/* BANK INFORMATION */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-5 md:px-7">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-2.5 text-[#0B1F4D]">
              <Landmark size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">Bank Information</h3>
              <p className="text-sm text-slate-500">
                Your registered banking details.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 p-5 sm:grid-cols-2 md:p-7">
          <ProfileItem label="Bank Name" value={profile.bank} icon={Landmark} />

          <ProfileItem label="Account Number" value={profile.account_no} />
        </div>
      </section>

      {/* COOPERATIVE MEMBERSHIPS */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-5 md:px-7">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-2.5 text-[#0B1F4D]">
              <Users size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Cooperative Memberships
              </h3>
              <p className="text-sm text-slate-500">
                Your registered cooperative societies and membership details.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-5 md:p-7">
          {memberships.length === 0 ? (
            <p className="text-sm text-slate-500">
              No cooperative memberships found.
            </p>
          ) : (
            memberships.map((membership) => {
              const isSelected = membership.id === selectedCooperative?.id;

              return (
                <div
                  key={membership.id}
                  className={`rounded-xl border p-5 ${
                    isSelected
                      ? "border-green-200 bg-green-50/50"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {membership.cooperative_name}
                      </h4>

                      <p className="mt-1 text-sm text-slate-500">
                        {membership.cooperative_code}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {isSelected && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          Currently Selected
                        </span>
                      )}

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {membership.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-5 border-t border-slate-200/70 pt-5 sm:grid-cols-3">
                    <ProfileItem
                      label="Membership Number"
                      value={membership.membership_no}
                      icon={UserCircle}
                    />

                    <ProfileItem
                      label="Membership Role"
                      value={membership.role}
                      icon={ShieldCheck}
                    />

                    <ProfileItem
                      label="Date Joined"
                      value={formatDate(membership.joined_date)}
                      icon={CalendarDays}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
