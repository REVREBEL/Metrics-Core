"use client";

import { AlertCircle, CheckCircle2, FileText, Send, X } from "lucide-react";
import { useState } from "react";
import { createChangeRequestAction } from "./change-request-actions";

export interface SelectedDraftForSubmission {
  id: string;
  rowKey: string;
  originalPayload: Record<string, unknown> | null;
  draftPayload: Record<string, unknown>;
}

interface ChangeRequestModalProps {
  isOpen: boolean;
  tableKey: string;
  selectedDrafts: SelectedDraftForSubmission[];
  onClose: () => void;
  onSuccess: () => void;
}

export function ChangeRequestModal({
  isOpen,
  tableKey,
  selectedDrafts,
  onClose,
  onSuccess,
}: ChangeRequestModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const draftIds = selectedDrafts.map((d) => d.id);
    const res = await createChangeRequestAction({
      tableKey,
      draftIds,
      title,
      description,
    });

    setIsSubmitting(false);

    if (!res.success) {
      setErrorMsg(res.error.message);
      return;
    }

    setTitle("");
    setDescription("");
    onSuccess();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-xl dark:bg-slate-900">
        <div className="flex items-center justify-between border-b pb-3 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Submit Change Request
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 flex items-center space-x-2 rounded border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Target Table
            </span>
            <div className="mt-1 rounded bg-slate-100 px-3 py-2 text-sm font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-200">
              {tableKey} ({selectedDrafts.length} draft{" "}
              {selectedDrafts.length === 1 ? "row" : "rows"})
            </div>
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
            >
              Request Title <span className="text-rose-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              required
              minLength={3}
              maxLength={100}
              placeholder="e.g. Promote Luxury Hotel Segment Names"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
            >
              Business Justification / Reason
            </label>
            <textarea
              id="description"
              rows={3}
              maxLength={500}
              placeholder="Explain the reason for these proposed lookup data changes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div className="max-h-40 overflow-y-auto rounded border border-slate-200 p-2 dark:border-slate-800">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              Selected Draft Rows:
            </div>
            {selectedDrafts.map((d) => (
              <div
                key={d.id}
                className="flex items-center justify-between border-b py-1.5 text-xs last:border-b-0 dark:border-slate-800"
              >
                <span className="font-mono text-slate-700 dark:text-slate-300">
                  {d.rowKey}
                </span>
                <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Validated
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end space-x-3 pt-3 border-t dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || title.trim().length < 3}
              className="flex items-center space-x-2 rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              <Send className="h-4 w-4" />
              <span>{isSubmitting ? "Submitting..." : "Submit Request"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
