import Image from "next/image";
import {getPortalContext} from "@/lib/auth/getPortalContext";
import {UserCircle, Pencil} from "lucide-react";

export default async function ProfilePage() {
  const {user, selectedCooperative} = await getPortalContext();

  console.log(user);

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Profile header */}
        <div className="bg-green-800 px-6 py-8 md:px-8 ">
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
                <UserCircle size={15} />
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
        </div>

        <div>
          {/* Personal Info */}
          <div className="flex items-center justify-between p-3">
            <div>
              <h3 className="font-semibold text-slate-900">
                Personal Information
              </h3>
              <p className="text-sm text-slate-500">
                Your personal and contact details.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <Pencil size={15} />
              <span className="hidden md:inline-block">Edit profile</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <p className="text-sm text-slate-500">First Name</p>
              <p className="font-medium text-slate-900">
                {user.firstName || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Middle Name</p>
              <p className="font-medium text-slate-900">
                {user.middleName || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Last Name</p>
              <p className="font-medium text-slate-900">
                {user.lastName || "Not provided"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
