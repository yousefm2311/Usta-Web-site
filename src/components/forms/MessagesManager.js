"use client";

import { useEffect, useState } from "react";

export default function MessagesManager() {
  const [messages, setMessages] = useState([]);

  const loadMessages = () => {
    fetch("/api/admin/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data.items || []));
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    loadMessages();
  };

  return (
    <div className="card">
      <h2 className="text-lg font-semibold">رسائل التواصل</h2>
      <div className="mt-4 space-y-4">
        {messages.map((message) => (
          <div key={message._id} className="rounded-2xl border border-blue-100 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-slate-900">{message.name}</p>
                <p className="text-xs text-slate-500">{message.email}</p>
              </div>
              <span className="badge">{message.status}</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">{message.message}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" className="btn-outline" onClick={() => updateStatus(message._id, "read")}>تمت القراءة</button>
              <button type="button" className="btn-outline" onClick={() => updateStatus(message._id, "archived")}>أرشفة</button>
            </div>
          </div>
        ))}
        {!messages.length && <p className="text-sm text-slate-500">لا توجد رسائل بعد.</p>}
      </div>
    </div>
  );
}
