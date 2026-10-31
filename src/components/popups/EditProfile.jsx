"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {Pencil, X, Save, LoaderCircle} from "lucide-react";

function dateValue(value) {
  if (!value) return "";

  if (typeof value === "string") {
    return value.slice(0, 10);
  }

  return new Date(value).toISOString().slice(0, 10);
}

export default function EditProfile({profile}) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    first_name: profile.first_name || "",
    middle_name: profile.middle_name || "",
    last_name: profile.last_name || "",
    phone: profile.phone || "",
    gender: profile.gender || "",
    date_of_birth: dateValue(profile.date_of_birth),
    employment_date: dateValue(profile.employment_date),
    retirement_date: dateValue(profile.retirement_date),
    division: profile.division || "",
    bank_category: profile.bank_category || "",
    bank_payment: profile.bank_payment || "",
    account_no: profile.account_no || "",
    current_password: "",
  });

  function handleChange(e) {
    const {name, value} = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  const bankDetailsChanged =
    formData.bank_category !== (profile.bank_category || "") ||
    formData.bank_payment !== (profile.bank_payment || "") ||
    formData.account_no !== (profile.account_no || "");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.first_name.trim() || !formData.last_name.trim()) {
      setError("First name and last name are required.");
      return;
    }

    if (bankDetailsChanged && !formData.current_password) {
      setError("Enter your password to change your bank details.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Unable to update your profile.");
        return;
      }

      setSuccess("Your profile has been updated successfully.");

      router.refresh();

      setTimeout(() => {
        setOpen(false);
      }, 800);
    } catch (error) {
      console.error("Profile update error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function closeModal() {
    if (loading) return;

    setOpen(false);
    setError("");
    setSuccess("");
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#0B1F4D] focus:ring-2 focus:ring-blue-100";

  const labelClass = "mb-2 block text-sm font-medium text-slate-600";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        <Pencil size={15} />
        <span>
          Edit <span className="hidden sm:inline-block">profile</span>
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-3 py-5 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 md:px-7">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Edit Profile
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update your personal and banking information.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={loading}
                aria-label="Close modal"
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="overflow-y-auto">
              <div className="flex flex-col gap-7 p-5 md:p-7">
                {/* Personal Information */}
                <section>
                  <h3 className="mb-4 font-semibold text-slate-900">
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>First Name *</label>
                      <input
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Middle Name</label>
                      <input
                        name="middle_name"
                        value={formData.middle_name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Last Name *</label>
                      <input
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>Date of Birth</label>
                      <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </section>

                {/* Contact Information */}
                <section>
                  <h3 className="mb-4 font-semibold text-slate-900">
                    Contact Information
                  </h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Email Address</label>
                      <input
                        type="email"
                        value={profile.email || ""}
                        disabled
                        className={`${inputClass} cursor-not-allowed bg-slate-50 text-slate-500`}
                      />
                      <p className="mt-1 text-xs text-slate-400">
                        Email changes require a separate verification process.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Employment Information */}
                <section>
                  <h3 className="mb-4 font-semibold text-slate-900">
                    Employment Information
                  </h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Division</label>
                      <input
                        name="division"
                        value={formData.division}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Employment Date</label>
                      <input
                        type="date"
                        name="employment_date"
                        value={formData.employment_date}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Retirement Date</label>
                      <input
                        type="date"
                        name="retirement_date"
                        value={formData.retirement_date}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </section>

                {/* Bank Information */}
                <section className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
                  <h3 className="mb-2 font-semibold text-slate-900">
                    Bank Information
                  </h3>

                  <p className="mb-4 text-xs leading-5 text-slate-600">
                    These details may be used for loan disbursements and
                    cooperative withdrawals. Please check them carefully before
                    saving.
                  </p>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Bank Category</label>
                      <input
                        name="bank_category"
                        value={formData.bank_category}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Bank Payment</label>
                      <input
                        name="bank_payment"
                        value={formData.bank_payment}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className={labelClass}>Account Number</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        name="account_no"
                        value={formData.account_no}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {bankDetailsChanged && (
                    <div className="mt-5">
                      <label className={labelClass}>Current Password *</label>
                      <input
                        type="password"
                        name="current_password"
                        value={formData.current_password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                        className={inputClass}
                        placeholder="Confirm your password"
                      />
                    </div>
                  )}
                </section>

                {/* Messages */}
                {error && (
                  <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </p>
                )}

                {success && (
                  <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                    {success}
                  </p>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end md:px-7">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={loading}
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-white disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1F4D] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <LoaderCircle size={17} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={17} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
