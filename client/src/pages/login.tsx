import { Container, Stack, Title, Text, Button, Divider, Box } from '@mantine/core';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--mantine-color-gray-0)',
      }}
    >
      <Container size={380} w="100%">
        <Stack gap="lg">
          <Stack gap={4}>
            <Title order={2} fw={700}>
              NoteMan
            </Title>
            <Text size="sm" c="dimmed">
              A straightforward place to write and organise your notes.
            </Text>
          </Stack>

          <Divider />

          <Button
            id="google-signin-btn"
            variant="default"
            size="md"
            leftSection={<FcGoogle size={18} />}
            onClick={handleLogin}
            fullWidth
          >
            Continue with Google
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
