"use client";

import {useState} from "react";
import {Megaphone, Send, Trash2} from "lucide-react";

const initialNotices = [
  {
    id: 1,
    title: "AGM Scheduled for August 22",
    body: "All members are required to attend the Annual General Meeting at the Court of Appeal Calabar Division hall.",
    date: "Aug 3, 2026",
  },
  {
    id: 2,
    title: "Thrift Contribution Deadline Reminder",
    body: "Monthly thrift contributions for August are due by the 10th. Late submissions may affect loan eligibility.",
    date: "Aug 1, 2026",
  },
];

export default function NoticesManager() {
  const [notices, setNotices] = useState(initialNotices);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function handlePost(e) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const newNotice = {
      id: Date.now(),
      title,
      body,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    setNotices([newNotice, ...notices]);
    setTitle("");
    setBody("");
  }

  function handleDelete(id) {
    setNotices(notices.filter((n) => n.id !== id));
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
        <div className="mb-6 flex items-center gap-2">
          <Megaphone size={20} className="text-[#0B1F4D]" />
          <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
            Post a Notice
          </h2>
        </div>

        <form onSubmit={handlePost} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Notice title"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#0B1F4D]"
          />

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write the notice details for members..."
            rows={4}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#0B1F4D]"
          />

          <button
            type="submit"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#0B1F4D] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <Send size={16} /> Publish Notice
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
        <h2 className="mb-6 text-xl font-bold text-slate-900 md:text-2xl">
          Published Notices
        </h2>

        <div className="flex flex-col divide-y divide-slate-100">
          {notices.map((n) => (
            <div
              key={n.id}
              className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div>
                <p className="font-semibold text-slate-900">{n.title}</p>
                <p className="mt-1 text-sm text-slate-600">{n.body}</p>
                <p className="mt-2 text-xs text-slate-400">{n.date}</p>
              </div>

              <button
                onClick={() => handleDelete(n.id)}
                className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                title="Delete notice"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          {notices.length === 0 && (
            <p className="py-10 text-center text-slate-400">
              No notices published yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
