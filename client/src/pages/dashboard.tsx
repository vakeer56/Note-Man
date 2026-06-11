import {
  AppShell,
  Group,
  Text,
  Button,
  Container,
  SimpleGrid,
  Stack,
  Loader,
  Center,
  Alert,
  Badge,
  Tabs,
  ActionIcon,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconPlus,
  IconAlertCircle,
  IconNote,
  IconArchive,
  IconX,
} from '@tabler/icons-react';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import NoteCard from '../components/NoteCard';
import NoteModal from '../components/NoteModal';
import NoteViewModal from '../components/NoteViewModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../hooks/useAuth';
import {
  getAllNotes,
  getArchivedNotes,
  createNote,
  updateNote,
  deleteNote,
  searchNotes,
  getNotesByTag,
  archiveNote,
  togglePin,
} from '../services/notes.service';
import { logout } from '../services/auth.service';
import type { Note, NoteFormValues } from '../types';

type ActiveTab = 'notes' | 'archived';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading: authLoading, error: authError } = useAuth();

  const [notes, setNotes] = useState<Note[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [notesError, setNotesError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<ActiveTab>('notes');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [noteModalOpened, { open: openNoteModal, close: closeNoteModal }] =
    useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
  const [viewModalOpened, { open: openViewModal, close: closeViewModal }] =
    useDisclosure(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchNotes = useCallback(async () => {
    setNotesLoading(true);
    setNotesError(null);
    try {
      const data =
        activeTab === 'archived' ? await getArchivedNotes() : await getAllNotes();
      setNotes(data);
    } catch {
      setNotesError('Failed to load notes. Is the server running?');
    } finally {
      setNotesLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    if (!authLoading && authError) {
      navigate('/');
    }
  }, [authLoading, authError, navigate]);

  useEffect(() => {
    if (!authLoading && user) {
      fetchNotes();
    }
  }, [authLoading, user, fetchNotes]);

  const handleSearch = useCallback(
    async (q: string) => {
      if (q.trim() === '') {
        fetchNotes();
        return;
      }
      setNotesLoading(true);
      setNotesError(null);
      setActiveTag(null);
      try {
        const data = await searchNotes(q);
        setNotes(data);
      } catch {
        setNotesError('Search failed.');
      } finally {
        setNotesLoading(false);
      }
    },
    [fetchNotes]
  );

  const handleTagFilter = useCallback(
    async (tag: string) => {
      if (activeTag === tag) {
        setActiveTag(null);
        fetchNotes();
        return;
      }
      setActiveTag(tag);
      setSearchQuery('');
      setNotesLoading(true);
      setNotesError(null);
      try {
        const data = await getNotesByTag(tag);
        setNotes(data);
      } catch {
        setNotesError('Failed to filter by tag.');
      } finally {
        setNotesLoading(false);
      }
    },
    [activeTag, fetchNotes]
  );

  const handleOpenCreate = () => {
    setSelectedNote(null);
    openNoteModal();
  };

  const handleOpenEdit = (note: Note) => {
    setSelectedNote(note);
    openNoteModal();
  };

  const handleOpenDelete = (note: Note) => {
    setSelectedNote(note);
    openDeleteModal();
  };

  const handleOpenView = (note: Note) => {
    setSelectedNote(note);
    openViewModal();
  };

  const handleNoteSubmit = async (values: NoteFormValues) => {
    setSubmitLoading(true);
    try {
      if (selectedNote) {
        await updateNote(selectedNote._id, values);
        notifications.show({ message: 'Note updated', color: 'green' });
      } else {
        await createNote(values);
        notifications.show({ message: 'Note created', color: 'green' });
      }
      closeNoteModal();
      fetchNotes();
    } catch {
      notifications.show({ message: 'Something went wrong', color: 'red' });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedNote) return;
    setDeleteLoading(true);
    try {
      await deleteNote(selectedNote._id);
      notifications.show({ message: 'Note deleted', color: 'green' });
      closeDeleteModal();
      fetchNotes();
    } catch {
      notifications.show({ message: 'Failed to delete note', color: 'red' });
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleArchive = async (note: Note) => {
    try {
      await archiveNote(note._id, !note.isArchived);
      notifications.show({
        message: note.isArchived ? 'Note unarchived' : 'Note archived',
        color: 'green',
      });
      fetchNotes();
    } catch {
      notifications.show({ message: 'Failed to update note', color: 'red' });
    }
  };

  const handlePin = async (note: Note) => {
    try {
      await togglePin(note._id, !note.isPinned);
      notifications.show({
        message: note.isPinned ? 'Note unpinned' : 'Note pinned',
        color: 'green',
      });
      fetchNotes();
    } catch {
      notifications.show({ message: 'Failed to update note', color: 'red' });
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate('/');
    }
  };

  const allTags = Array.from(new Set(notes.flatMap((n) => n.tags)));

  if (authLoading) {
    return (
      <Center h="100vh">
        <Loader size="sm" />
      </Center>
    );
  }

  return (
    <>
      <AppShell header={{ height: 52 }} padding={0}>
        <AppShell.Header>
          <Container size="xl" h="100%">
            <Group h="100%" justify="space-between">
              <Text fw={700} size="sm">
                NoteMan
              </Text>
              <Group gap="sm">
                <Text size="sm" c="dimmed">
                  {user?.firstName} {user?.lastName}
                </Text>
                <Button
                  variant="subtle"
                  size="xs"
                  color="gray"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Group>
            </Group>
          </Container>
        </AppShell.Header>

        <AppShell.Main>
          <Container size="xl" py="xl">
            <Stack gap="lg">
              {/* Toolbar */}
              <Group justify="space-between" align="center">
                <Tabs
                  value={activeTab}
                  onChange={(v) => {
                    setActiveTag(null);
                    setSearchQuery('');
                    setActiveTab(v as ActiveTab);
                  }}
                >
                  <Tabs.List>
                    <Tabs.Tab
                      value="notes"
                      leftSection={<IconNote size={14} />}
                    >
                      Notes
                    </Tabs.Tab>
                    <Tabs.Tab
                      value="archived"
                      leftSection={<IconArchive size={14} />}
                    >
                      Archived
                    </Tabs.Tab>
                  </Tabs.List>
                </Tabs>

                <Group gap="sm">
                  <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onSearch={handleSearch}
                  />
                  <Button
                    leftSection={<IconPlus size={14} />}
                    size="sm"
                    onClick={handleOpenCreate}
                  >
                    New note
                  </Button>
                </Group>
              </Group>

              {/* Tag filters */}
              {allTags.length > 0 && (
                <Group gap={6}>
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      size="sm"
                      variant={activeTag === tag ? 'filled' : 'light'}
                      color="gray"
                      radius="sm"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleTagFilter(tag)}
                      rightSection={
                        activeTag === tag ? (
                          <Tooltip label="Clear filter" withArrow>
                            <ActionIcon
                              size="xs"
                              color="white"
                              variant="transparent"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveTag(null);
                                fetchNotes();
                              }}
                            >
                              <IconX size={10} />
                            </ActionIcon>
                          </Tooltip>
                        ) : null
                      }
                    >
                      {tag}
                    </Badge>
                  ))}
                </Group>
              )}

              {/* Notes grid */}
              {notesError && (
                <Alert
                  icon={<IconAlertCircle size={16} />}
                  color="red"
                  variant="light"
                >
                  {notesError}
                </Alert>
              )}

              {notesLoading ? (
                <Center py={80}>
                  <Loader size="sm" />
                </Center>
              ) : notes.length === 0 ? (
                <Center py={80}>
                  <Stack align="center" gap="xs">
                    <Text size="sm" c="dimmed">
                      {activeTab === 'archived'
                        ? 'No archived notes.'
                        : searchQuery || activeTag
                        ? 'No notes match your search.'
                        : 'No notes yet. Create your first one.'}
                    </Text>
                    {!searchQuery && !activeTag && activeTab === 'notes' && (
                      <Button
                        variant="default"
                        size="xs"
                        onClick={handleOpenCreate}
                        leftSection={<IconPlus size={12} />}
                      >
                        New note
                      </Button>
                    )}
                  </Stack>
                </Center>
              ) : (
                <SimpleGrid
                  cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
                  spacing="sm"
                >
                  {notes.map((note) => (
                    <NoteCard
                      key={note._id}
                      note={note}
                      onEdit={handleOpenEdit}
                      onDelete={handleOpenDelete}
                      onArchive={handleArchive}
                      onPin={handlePin}
                      onView={handleOpenView}
                      onTagClick={handleTagFilter}
                    />
                  ))}
                </SimpleGrid>
              )}
            </Stack>
          </Container>
        </AppShell.Main>
      </AppShell>

      <NoteModal
        opened={noteModalOpened}
        note={selectedNote}
        loading={submitLoading}
        onClose={closeNoteModal}
        onSubmit={handleNoteSubmit}
      />

      <DeleteConfirmModal
        opened={deleteModalOpened}
        note={selectedNote}
        loading={deleteLoading}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
      />

      <NoteViewModal
        opened={viewModalOpened}
        note={selectedNote}
        onClose={closeViewModal}
        onEdit={(note) => {
          closeViewModal();
          handleOpenEdit(note);
        }}
      />
    </>
  );
}