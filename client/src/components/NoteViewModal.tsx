import { Modal, Text, Group, Badge, ScrollArea, Divider, ActionIcon, Tooltip } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Note } from '../types';

interface NoteViewModalProps {
  opened: boolean;
  note: Note | null;
  onClose: () => void;
  onEdit: (note: Note) => void;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function NoteViewModal({ opened, note, onClose, onEdit }: NoteViewModalProps) {
  if (!note) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group justify="space-between" align="center" style={{ flex: 1 }} pr="sm">
          <Text fw={600} size="sm" lineClamp={1}>
            {note.title}
          </Text>
          <Tooltip label="Edit" withArrow>
            <ActionIcon
              variant="subtle"
              color="gray"
              size="sm"
              onClick={() => {
                onClose();
                onEdit(note);
              }}
              aria-label="Edit note"
            >
              <IconEdit size={14} />
            </ActionIcon>
          </Tooltip>
        </Group>
      }
      size="xl"
      centered
      styles={{
        title: { flex: 1, marginRight: 0 },
        header: { paddingBottom: 'var(--mantine-spacing-xs)' },
      }}
    >
      {/* Meta */}
      <Group gap="xs" mb="sm">
        <Text size="xs" c="dimmed">
          Last updated {formatDate(note.modifiedAt)}
        </Text>
        {note.tags.length > 0 && (
          <>
            <Text size="xs" c="dimmed">·</Text>
            {note.tags.map((tag) => (
              <Badge key={tag} size="xs" variant="light" color="gray" radius="sm">
                {tag}
              </Badge>
            ))}
          </>
        )}
      </Group>

      <Divider mb="md" />

      {/* Rendered markdown */}
      <ScrollArea.Autosize mah="65vh">
        <div className="md-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {note.content}
          </ReactMarkdown>
        </div>
      </ScrollArea.Autosize>
    </Modal>
  );
}
