import { Button, Navbar } from "react-bootstrap";
import * as NotesAPI from "../api/api";
import User from "../models/user";

interface TopBarUserProps {
    user: User,
    onLogoutSuccess: () => void
}

const greetings = [
    "Hello",
    "Good to see you",
    "Glad you're back",
    "Time for another note",
    "It's been lonely without you",
];

const userGreeting = greetings[Math.floor(Math.random() * greetings.length)];

const TopBarUser = ({ user, onLogoutSuccess }: TopBarUserProps) => {
    async function logout() {
        try {
            await NotesAPI.logout();
            onLogoutSuccess();
        } catch (err) {
            console.error(err);
            alert(err);
        }
    }

    return (
        <>
            <Navbar.Text className="me-2">
                {userGreeting}, "{user.username}"!
            </Navbar.Text>
            <Button onClick={logout} variant="dark">Logout</Button>
        </>
    );
}

export default TopBarUser;
