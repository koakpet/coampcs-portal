"use client";

import {useRef, useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {Camera, LoaderCircle} from "lucide-react";

export default function ProfilePhoto({
  editable = false,
  hasPhoto = false,
  size = "h-24 w-24",
  className = "",
}) {
  const router = useRouter();
  const inputRef = useRef(null);

  const [photoSrc, setPhotoSrc] = useState(
    hasPhoto ? "/api/uploads/profile-photo" : "/user.jpg",
  );
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    function handlePhotoUpdate(event) {
      setPhotoSrc(event.detail.photoUrl);
    }

    window.addEventListener("profile-photo-updated", handlePhotoUpdate);

    return () => {
      window.removeEventListener("profile-photo-updated", handlePhotoUpdate);
    };
  }, []);

  async function handleUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setMessage("");
    setError(false);

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setMessage("Please select a JPEG, PNG or WebP image.");
      setError(true);
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image must not exceed 5 MB.");
      setError(true);
      event.target.value = "";
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("photo", file);

      const response = await fetch("/api/uploads/profile-photo", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Photo upload failed.");
      }

      const newPhotoUrl = `/api/uploads/profile-photo?v=${Date.now()}`;

      setPhotoSrc(newPhotoUrl);

      // Notify other instances, including the navbar.
      window.dispatchEvent(
        new CustomEvent("profile-photo-updated", {
          detail: {photoUrl: newPhotoUrl},
        }),
      );

      setMessage("Profile photo updated successfully.");
      router.refresh();
    } catch (err) {
      setMessage(err.message || "Unable to upload your photo.");
      setError(true);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div
        className={`shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100 ${size}`}
      >
        <img
          src={photoSrc}
          alt="Profile photo"
          className="h-full w-full object-cover"
          onError={() => {
            if (photoSrc !== "/user.jpg") {
              setPhotoSrc("/user.jpg");
            }
          }}
        />

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <LoaderCircle className="animate-spin text-white" size={24} />
          </div>
        )}
      </div>

      {editable && (
        <>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20 disabled:opacity-60"
          >
            {uploading ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <Camera size={16} />
            )}

            {uploading ? "Uploading..." : "Change Photo"}
          </button>

          <p className="text-xs text-blue-100">
            JPEG, PNG or WebP. Maximum 5 MB.
          </p>

          {message && (
            <p
              className={`text-xs ${error ? "text-red-200" : "text-emerald-200"}`}
            >
              {message}
            </p>
          )}
        </>
      )}
    </div>
  );
}
