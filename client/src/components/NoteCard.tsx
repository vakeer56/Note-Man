import {
  Card,
  Text,
  Group,
  Badge,
  ActionIcon,
  Stack,
  Tooltip,
} from '@mantine/core';
import {
  IconEdit,
  IconTrash,
  IconArchive,
  IconArchiveOff,
  IconPin,
  IconPinnedOff,
  IconEye,
} from '@tabler/icons-react';
import type { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
  onArchive: (note: Note) => void;
  onPin: (note: Note) => void;
  onView: (note: Note) => void;
  onTagClick: (tag: string) => void;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function contentPreview(content: string, maxLength = 120): string {
  const stripped = content.replace(/[#*`_~>[\]!-]+/g, ' ').replace(/\s+/g, ' ').trim();
  return stripped.length > maxLength
    ? stripped.slice(0, maxLength).trimEnd() + '…'
    : stripped;
}

export default function NoteCard({
  note,
  onEdit,
  onDelete,
  onArchive,
  onPin,
  onView,
  onTagClick,
}: NoteCardProps) {
  return (
    <Card withBorder radius="sm" padding="md" style={{ cursor: 'default' }}>
      <Stack gap="xs">
        {/* Header row */}
        <Group justify="space-between" align="flex-start" wrap="nowrap">
          <Group gap={6} wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
            {note.isPinned && (
              <Tooltip label="Pinned" withArrow>
                <IconPin
                  size={12}
                  color="var(--mantine-color-yellow-6)"
                  style={{ flexShrink: 0 }}
                />
              </Tooltip>
            )}
            <Text
              fw={600}
              size="sm"
              lineClamp={1}
              style={{ cursor: 'pointer' }}
              onClick={() => onView(note)}
            >
              {note.title}
            </Text>
          </Group>

          <Group gap={4} wrap="nowrap" style={{ flexShrink: 0 }}>
            <Tooltip label="View" withArrow>
              <ActionIcon
                variant="subtle"
                color="gray"
                size="sm"
                onClick={() => onView(note)}
                aria-label="View note"
              >
                <IconEye size={14} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label={note.isPinned ? 'Unpin' : 'Pin'} withArrow>
              <ActionIcon
                variant="subtle"
                color="gray"
                size="sm"
                onClick={() => onPin(note)}
                aria-label={note.isPinned ? 'Unpin note' : 'Pin note'}
              >
                {note.isPinned ? <IconPinnedOff size={14} /> : <IconPin size={14} />}
              </ActionIcon>
            </Tooltip>
            <Tooltip label={note.isArchived ? 'Unarchive' : 'Archive'} withArrow>
              <ActionIcon
                variant="subtle"
                color="gray"
                size="sm"
                onClick={() => onArchive(note)}
                aria-label={note.isArchived ? 'Unarchive note' : 'Archive note'}
              >
                {note.isArchived ? <IconArchiveOff size={14} /> : <IconArchive size={14} />}
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Edit" withArrow>
              <ActionIcon
                variant="subtle"
                color="gray"
                size="sm"
                onClick={() => onEdit(note)}
                aria-label="Edit note"
              >
                <IconEdit size={14} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Delete" withArrow>
              <ActionIcon
                variant="subtle"
                color="red"
                size="sm"
                onClick={() => onDelete(note)}
                aria-label="Delete note"
              >
                <IconTrash size={14} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>

        {/* Content preview */}
        {note.content && (
          <Text size="xs" c="dimmed" style={{ lineHeight: 1.5 }}>
            {contentPreview(note.content)}
          </Text>
        )}

        {/* Clickable tags */}
        {note.tags.length > 0 && (
          <Group gap={4}>
            {note.tags.map((tag) => (
              <Badge
                key={tag}
                size="xs"
                variant="light"
                color="gray"
                radius="sm"
                style={{ cursor: 'pointer' }}
                onClick={() => onTagClick(tag)}
              >
                {tag}
              </Badge>
            ))}
          </Group>
        )}

        <Text size="xs" c="dimmed">
          {formatDate(note.modifiedAt)}
        </Text>
      </Stack>
    </Card>
  );
}