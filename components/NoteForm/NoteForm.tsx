'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import { createNote } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';

interface NoteFormProps {
  onCancel?: () => void;
}

export default function NoteForm({ onCancel }: NoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteStore(state => state.draft);
  const setDraft = useNoteStore(state => state.setDraft);
  const clearDraft = useNoteStore(state => state.clearDraft);

  const [title, setTitle] = useState(draft.title);
  const [content, setContent] = useState(draft.content);
  const [tag, setTag] = useState(draft.tag);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(draft.title);
    setContent(draft.content);
    setTag(draft.tag);
  }, [draft]);

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;

    setTitle(value);

    setDraft({
      title: value,
      content,
      tag,
    });
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;

    setContent(value);

    setDraft({
      title,
      content: value,
      tag,
    });
  };

  const handleTagChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
) => {
  const value = event.target.value as typeof draft.tag;

  setTag(value);

  setDraft({
    title,
    content,
    tag: value,
  });
};

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError('');

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }

    setIsLoading(true);

    try {
      await createNote({
        title: title.trim(),
        content: content.trim(),
        tag,
      });

      clearDraft();

      await queryClient.invalidateQueries({
        queryKey: ['notes'],
      });

      router.push('/notes/filter/all');
      router.refresh();
    } catch {
      setError('Failed to create note.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      return;
    }

    router.back();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>

        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="content">Content</label>

        <textarea
          id="content"
          name="content"
          value={content}
          onChange={handleContentChange}
          required
        />
      </div>

      <div>
        <label htmlFor="tag">Tag</label>

        <select
          id="tag"
          name="tag"
          value={tag}
          onChange={handleTagChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      {error && <p>{error}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create note'}
      </button>

      <button
        type="button"
        onClick={handleCancel}
        disabled={isLoading}
      >
        Cancel
      </button>
    </form>
  );
}