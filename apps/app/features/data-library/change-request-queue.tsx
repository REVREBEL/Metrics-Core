'use client';

import {
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Filter,
  RefreshCw,
  RotateCcw,
  Send,
  XCircle,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  getChangeRequestAction,
  listChangeRequestsAction,
  reviewChangeRequestAction,
  withdrawChangeRequestAction,
} from './change-request-actions';

export interface QueueItem {
  id: string;
  tableKey: string;
  title: string;
  description: string | null;
  submitterId: string;
  reviewerId: string | null;
  status: 'submitted' | 'approved' | 'rejected' | 'withdrawn' | 'published' | 'conflict';
  reviewNotes: string | null;
  submittedAt: string | Date;
  reviewedAt: string | Date | null;
}

export function ChangeRequestQueue() {
  const [requests, setRequests] = useState<QueueItem[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('submitted');
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [submitterFilter, setSubmitterFilter] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [publicationResult, setPublicationResult] = useState<any | null>(null);
  // biome-ignore lint/suspicious/noExplicitAny: Details have dynamically resolved nested properties.
  const [selectedReqDetail, setSelectedReqDetail] = useState<any | null>(null);

  // Review modal state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewDecision, setReviewDecision] = useState<'approve' | 'reject'>('approve');
  const [reviewNotes, setReviewNotes] = useState('');
  const [actionError, setActionError] = useState<string | null>(null);

  async function loadQueue() {
    setIsLoading(true);
    setActionError(null);
    const res = await listChangeRequestsAction(
      selectedTable || undefined,
      selectedStatus || undefined
    );
    setIsLoading(false);
    if (res.success) {
      let data = res.data as QueueItem[];
      if (submitterFilter.trim()) {
        data = data.filter((r) =>
          r.submitterId.toLowerCase().includes(submitterFilter.trim().toLowerCase())
        );
      }
      setRequests(data);
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only fetch when explicit status or table selection changes.
  useEffect(() => {
    loadQueue();
  }, [selectedStatus, selectedTable]);

  async function handleInspect(id: string) {
    setPublicationResult(null);
    const res = await getChangeRequestAction(id);
    if (res.success) {
      setSelectedReqDetail(res.data);
    }
  }

  async function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedReqDetail) return;
    setActionError(null);

    const res = await reviewChangeRequestAction({
      changeRequestId: selectedReqDetail.id,
      decision: reviewDecision,
      notes: reviewNotes,
    });

    if (!res.success) {
      setActionError(res.error.message);
      return;
    }

    setReviewModalOpen(false);
    setReviewNotes('');
    setSelectedReqDetail(null);
    loadQueue();
  }

  async function handleWithdraw(id: string) {
    setActionError(null);
    const res = await withdrawChangeRequestAction(id);
    if (!res.success) {
      setActionError(res.error.message);
      return;
    }
    setSelectedReqDetail(null);
    loadQueue();
  }

  async function handlePublish(id: string) {
    setIsPublishing(true);
    setPublicationResult(null);
    setActionError(null);

    try {
      const response = await fetch('/api/data-library/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ changeRequestId: id }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Publication failed');
      }

      setPublicationResult(result);
      // Refresh the queue to show the new status
      loadQueue();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred.';
      setActionError(message);
    } finally {
      setIsPublishing(false);
    }
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4 dark:border-slate-800'>
        <div>
          <h2 className='text-xl font-bold text-slate-900 dark:text-slate-100'>
            Change Requests Queue
          </h2>
          <p className='text-sm text-slate-500 dark:text-slate-400'>
            Review, approve, reject, or withdraw governed Data Library edit requests.
          </p>
        </div>
        <button
          type='button'
          onClick={loadQueue}
          className='inline-flex items-center space-x-2 rounded border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
        >
          <RefreshCw className='h-4 w-4' />
          <span>Refresh</span>
        </button>
      </div>

      {actionError && (
        <div className='flex items-center space-x-2 rounded border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-400'>
          <AlertCircle className='h-4 w-4 shrink-0' />
          <span>{actionError}</span>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className='flex flex-wrap items-center gap-3 bg-slate-50 p-3 rounded-lg dark:bg-slate-900/50 border dark:border-slate-800'>
        <Filter className='h-4 w-4 text-slate-400' />
        <div className='flex items-center space-x-2'>
          <label
            htmlFor='status-select'
            className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase'
          >
            Status:
          </label>
          <select
            id='status-select'
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className='rounded border border-slate-300 bg-white px-2.5 py-1 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
          >
            <option value='submitted'>Submitted (Pending)</option>
            <option value='approved'>Approved</option>
            <option value='published'>Published</option>
            <option value='conflict'>Conflict</option>
            <option value='rejected'>Rejected</option>
            <option value='withdrawn'>Withdrawn</option>
            <option value=''>All Statuses</option>
          </select>
        </div>

        <div className='flex items-center space-x-2'>
          <label
            htmlFor='table-filter'
            className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase'
          >
            Table:
          </label>
          <input
            id='table-filter'
            type='text'
            placeholder='Filter table key...'
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            className='rounded border border-slate-300 bg-white px-2 py-1 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
          />
        </div>

        <div className='flex items-center space-x-2'>
          <label
            htmlFor='submitter-filter'
            className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase'
          >
            Submitter:
          </label>
          <input
            id='submitter-filter'
            type='text'
            placeholder='Filter submitter ID...'
            value={submitterFilter}
            onChange={(e) => setSubmitterFilter(e.target.value)}
            className='rounded border border-slate-300 bg-white px-2 py-1 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
          />
        </div>
      </div>

      {/* Queue Table */}
      <div className='overflow-x-auto rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950'>
        <table className='w-full text-left text-sm'>
          <thead className='bg-slate-50 text-xs font-semibold uppercase text-slate-500 dark:bg-slate-900 dark:text-slate-400'>
            <tr>
              <th className='px-4 py-3'>Title / Key</th>
              <th className='px-4 py-3'>Table</th>
              <th className='px-4 py-3'>Submitter</th>
              <th className='px-4 py-3'>Submitted At</th>
              <th className='px-4 py-3'>Status</th>
              <th className='px-4 py-3 text-right'>Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-100 dark:divide-slate-800'>
            {isLoading ? (
              <tr>
                <td colSpan={6} className='px-4 py-8 text-center text-slate-400'>
                  Loading change requests...
                </td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan={6} className='px-4 py-8 text-center text-slate-400'>
                  No change requests found matching filter criteria.
                </td>
              </tr>
            ) : (
              requests.map((r) => (
                <tr key={r.id} className='hover:bg-slate-50 dark:hover:bg-slate-900/50'>
                  <td className='px-4 py-3 font-medium text-slate-900 dark:text-slate-100'>
                    <div>{r.title}</div>
                    <div className='text-xs text-slate-400 font-normal'>{r.id}</div>
                  </td>
                  <td className='px-4 py-3 font-mono text-xs text-slate-600 dark:text-slate-300'>
                    {r.tableKey}
                  </td>
                  <td className='px-4 py-3 text-xs text-slate-600 dark:text-slate-400 font-mono'>
                    {r.submitterId.substring(0, 8)}...
                  </td>
                  <td className='px-4 py-3 text-xs text-slate-500'>
                    {new Date(r.submittedAt).toLocaleDateString()}
                  </td>
                  <td className='px-4 py-3'>
                    <StatusBadge status={r.status} />
                  </td>
                  <td className='px-4 py-3 text-right'>
                    <button
                      type='button'
                      onClick={() => handleInspect(r.id)}
                      className='inline-flex items-center space-x-1 rounded bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                    >
                      <Eye className='h-3.5 w-3.5' />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Drawer */}
      {selectedReqDetail && (
        <div className='rounded-lg border border-indigo-200 bg-indigo-50/30 p-6 dark:border-indigo-900/50 dark:bg-slate-900'>
          <div className='flex items-center justify-between border-b pb-3 dark:border-slate-800'>
            <div>
              <div className='flex items-center space-x-2'>
                <h3 className='text-lg font-bold text-slate-900 dark:text-slate-100'>
                  {selectedReqDetail.title}
                </h3>
                <StatusBadge status={selectedReqDetail.status} />
              </div>
              <p className='text-xs text-slate-500 font-mono mt-0.5'>
                ID: {selectedReqDetail.id} | Table: {selectedReqDetail.tableKey} | Submitter:{' '}
                {selectedReqDetail.submitterId}
              </p>
            </div>
            <button
              type='button'
              onClick={() => setSelectedReqDetail(null)}
              className='text-slate-400 hover:text-slate-600'
            >
              Close
            </button>
          </div>

          {selectedReqDetail.description && (
            <p className='mt-3 text-sm text-slate-700 dark:text-slate-300 italic'>
              &quot;{selectedReqDetail.description}&quot;
            </p>
          )}

          {/* Immutable Item Snapshots */}
          <div className='mt-4 space-y-3'>
            <h4 className='text-xs font-semibold uppercase tracking-wider text-slate-500'>
              Immutable Item Snapshots ({selectedReqDetail.items.length}):
            </h4>
            {/* biome-ignore lint/suspicious/noExplicitAny: Item payloads contain heterogeneous, dynamic table records. */}
            {selectedReqDetail.items.map((item: any) => (
              <div
                key={item.id}
                className='rounded border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950 text-xs'
              >
                <div className='font-mono font-semibold text-slate-800 dark:text-slate-200 mb-2'>
                  Row Key: {item.rowKey}
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <span className='font-semibold text-slate-500'>Original Payload:</span>
                    <pre className='mt-1 rounded bg-slate-50 p-2 font-mono text-[11px] text-slate-700 dark:bg-slate-900 dark:text-slate-300 overflow-x-auto'>
                      {JSON.stringify(item.originalPayload, null, 2) || 'null'}
                    </pre>
                  </div>
                  <div>
                    <span className='font-semibold text-indigo-600 dark:text-indigo-400'>
                      Proposed Payload:
                    </span>
                    <pre className='mt-1 rounded bg-indigo-50/50 p-2 font-mono text-[11px] text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200 overflow-x-auto'>
                      {JSON.stringify(item.submittedPayload, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {publicationResult && (
            <div className='mt-4 p-4 rounded-lg border bg-white dark:bg-slate-950 dark:border-slate-800'>
              <h4 className='text-sm font-semibold mb-2'>Publication Result</h4>
              {publicationResult.success ? (
                <div className='text-sm text-emerald-600 dark:text-emerald-400 space-y-2'>
                  <p>{publicationResult.message}</p>
                </div>
              ) : (
                <div className='text-sm text-rose-600 dark:text-rose-400 space-y-2'>
                  <p>{publicationResult.message}</p>
                  {publicationResult.conflicts?.length > 0 && (
                    <div>
                      <h5 className='font-semibold'>Conflicts:</h5>
                      <ul className='list-disc list-inside space-y-1 mt-1'>
                        {publicationResult.conflicts.map((c: any) => (
                          <li key={c.rowKey}>
                            <strong>Row {c.rowKey}:</strong> {c.message}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {selectedReqDetail.status === 'approved' && (
            <div className='mt-6 flex items-center justify-end space-x-3 pt-4 border-t dark:border-slate-800'>
              <button
                type='button'
                onClick={() => handlePublish(selectedReqDetail.id)}
                disabled={isPublishing}
                className='inline-flex items-center space-x-2 rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-900'
              >
                <Send className='h-3.5 w-3.5' />
                <span>{isPublishing ? 'Publishing...' : 'Publish to Warehouse'}</span>
              </button>
            </div>
          )}

          {selectedReqDetail.status === 'submitted' && (
            <div className='mt-6 flex items-center justify-end space-x-3 pt-4 border-t dark:border-slate-800'>
              <button
                type='button'
                onClick={() => handleWithdraw(selectedReqDetail.id)}
                className='inline-flex items-center space-x-1 rounded border border-rose-200 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-50 dark:border-rose-900/50 dark:text-rose-400'
              >
                <RotateCcw className='h-3.5 w-3.5' />
                <span>Withdraw Request</span>
              </button>
              <button
                type='button'
                onClick={() => {
                  setReviewDecision('approve');
                  setReviewModalOpen(true);
                }}
                className='inline-flex items-center space-x-1 rounded bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700'
              >
                <CheckCircle className='h-3.5 w-3.5' />
                <span>Approve Request</span>
              </button>
              <button
                type='button'
                onClick={() => {
                  setReviewDecision('reject');
                  setReviewModalOpen(true);
                }}
                className='inline-flex items-center space-x-1 rounded bg-rose-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-rose-700'
              >
                <XCircle className='h-3.5 w-3.5' />
                <span>Reject Request</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Review Modal */}
      {reviewModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
          <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-slate-900'>
            <h3 className='text-lg font-bold text-slate-900 dark:text-slate-100'>
              {reviewDecision === 'approve' ? 'Approve Change Request' : 'Reject Change Request'}
            </h3>
            <p className='text-xs text-slate-500 mt-1'>
              {reviewDecision === 'approve'
                ? 'Approval confirms governance review. Note: warehouse publication remains explicitly deferred.'
                : 'Rejection will transition the request to rejected and restore drafts to editable draft state.'}
            </p>

            <form onSubmit={handleReviewSubmit} className='mt-4 space-y-4'>
              <div>
                <label
                  htmlFor='review-notes'
                  className='block text-xs font-semibold uppercase text-slate-500'
                >
                  Review Notes{' '}
                  {reviewDecision === 'reject' && <span className='text-rose-500'>*</span>}
                </label>
                <textarea
                  id='review-notes'
                  rows={3}
                  required={reviewDecision === 'reject'}
                  placeholder={
                    reviewDecision === 'reject'
                      ? 'Explain the reason for rejecting this request...'
                      : 'Optional approval remarks...'
                  }
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  className='mt-1 w-full rounded border border-slate-300 bg-white p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100'
                />
              </div>

              <div className='flex justify-end space-x-2 pt-2'>
                <button
                  type='button'
                  onClick={() => setReviewModalOpen(false)}
                  className='rounded px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className={`rounded px-3 py-1.5 text-xs font-medium text-white ${
                    reviewDecision === 'approve'
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-rose-600 hover:bg-rose-700'
                  }`}
                >
                  Confirm {reviewDecision === 'approve' ? 'Approval' : 'Rejection'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'submitted':
      return (
        <span className='inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'>
          <Clock className='mr-1 h-3 w-3' /> Pending Review
        </span>
      );
    case 'approved':
      return (
        <span className='inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'>
          <CheckCircle className='mr-1 h-3 w-3' /> Approved
        </span>
      );
    case 'rejected':
      return (
        <span className='inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-medium text-rose-700 dark:bg-rose-950/40 dark:text-rose-400'>
          <XCircle className='mr-1 h-3 w-3' /> Rejected
        </span>
      );
    case 'withdrawn':
      return (
        <span className='inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400'>
          <RotateCcw className='mr-1 h-3 w-3' /> Withdrawn
        </span>
      );
    case 'published':
      return (
        <span className='inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-400'>
          <Send className='mr-1 h-3 w-3' /> Published
        </span>
      );
    case 'conflict':
      return (
        <span className='inline-flex items-center rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-950/40 dark:text-orange-400'>
          <AlertCircle className='mr-1 h-3 w-3' /> Conflict
        </span>
      );
    default:
      return <span className='text-xs text-slate-500'>{status}</span>;
  }
}
