import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
}

export default function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  const [debounced] = useDebouncedValue(value, 350);

  useEffect(() => {
    onSearch(debounced);
  }, [debounced, onSearch]);

  return (
    <TextInput
      placeholder="Search notes…"
      leftSection={<IconSearch size={14} />}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      style={{ flex: 1 }}
    />
  );
}