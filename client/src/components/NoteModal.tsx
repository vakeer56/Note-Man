import { Modal, TextInput, Button, Stack, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import type { Note, NoteFormValues } from '../types';

interface NoteModalProps {
  opened: boolean;
  note: Note | null;
  loading: boolean;
  onClose: () => void;
  onSubmit: (values: NoteFormValues) => void;
}

export default function NoteModal({
  opened,
  note,
  loading,
  onClose,
  onSubmit,
}: NoteModalProps) {
  const form = useForm<NoteFormValues>({
    initialValues: {
      title: '',
      content: '',
      tags: '',
    },
    validate: {
      title: (v) => (v.trim().length === 0 ? 'Title is required' : null),
      content: (v) => (v.trim().length === 0 ? 'Content is required' : null),
    },
  });

  useEffect(() => {
    if (opened) {
      if (note) {
        form.setValues({
          title: note.title,
          content: note.content,
          tags: note.tags.join(', '),
        });
      } else {
        form.reset();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, note]);

  const handleSubmit = form.onSubmit((values) => {
    onSubmit(values);
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={note ? 'Edit note' : 'New note'}
      size="xl"
      centered
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="sm">
          <TextInput
            label="Title"
            placeholder="Note title"
            required
            maxLength={100}
            {...form.getInputProps('title')}
          />

          <Stack gap={4}>
            <Text size="sm" fw={500}>
              Content{' '}
              <Text component="span" c="red">
                *
              </Text>
            </Text>
            <div data-color-mode="light">
              <MDEditor
                value={form.values.content}
                onChange={(val) => form.setFieldValue('content', val ?? '')}
                height={320}
                preview="live"
                visibleDragbar={false}
              />
            </div>
            {form.errors.content && (
              <Text size="xs" c="red">
                {form.errors.content}
              </Text>
            )}
          </Stack>

          <TextInput
            label="Tags"
            placeholder="react, typescript, notes"
            description="Comma-separated list of tags"
            {...form.getInputProps('tags')}
          />

          <Group justify="flex-end" mt="xs">
            <Button variant="default" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              {note ? 'Save changes' : 'Create note'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
