import React from 'react';
import { MessageSquare } from 'lucide-react';

interface JobCardNotesProps {
  jobId: string;
  notes: string | undefined;
  onAddNote: (jobId: string, note: string) => void;
}

const JobCardNotes: React.FC<JobCardNotesProps> = ({ jobId, notes, onAddNote }) => {
  const handleNoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const note = formData.get('note') as string;
    if (note.trim()) {
      onAddNote(jobId, note);
      e.currentTarget.reset();
    }
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-text-primary mb-2">Notes</h3>
      {notes && (
        <div className="bg-yellow-900/50 border border-yellow-700 rounded-lg p-3 mb-3">
          <p className="text-sm text-yellow-200">{notes}</p>
        </div>
      )}
      <form onSubmit={handleNoteSubmit} className="flex space-x-2">
        <input
          type="text"
          name="note"
          placeholder="Add a note..."
          className="flex-1 px-3 py-2 bg-bg-primary border border-border-primary text-text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default JobCardNotes;
