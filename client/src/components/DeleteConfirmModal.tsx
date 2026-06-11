import { Modal, Text, Group, Button } from '@mantine/core';
import type { Note } from '../types';

interface DeleteConfirmModalProps {
  opened: boolean;
  note: Note | null;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  opened,
  note,
  loading,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Delete note"
      size="sm"
      centered
    >
      <Text size="sm" c="dimmed">
        Are you sure you want to delete{' '}
        <Text component="span" fw={600} c="dark">
          &ldquo;{note?.title}&rdquo;
        </Text>
        ? This action cannot be undone.
      </Text>
      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button color="red" loading={loading} onClick={onConfirm}>
          Delete
        </Button>
      </Group>
    </Modal>
  );
}
