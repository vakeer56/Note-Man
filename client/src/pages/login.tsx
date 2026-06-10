import { MantineProvider ,Button, Container,Title } from "@mantine/core"


export default function Login() {

    const handleLogin: any = () => {
        window.location.href = "http://localhost:3000/auth/google";
    };
    return <>

    <MantineProvider>
        <Container>
            <Title>
                Login NoteMan
            </Title>

            <Button onClick={handleLogin}>
                continue with google
            </Button>
        </Container>
    </MantineProvider>

    </>
}