import { Container } from "react-bootstrap";
import NotesLoggedIn from "../components/NotesLoggedIn";
import NotesLoggedOut from "../components/NotesLoggedOut";
import noteContStyle from "../css/NoteContainer.module.css";
import User from "../models/user";

interface MainPageProps {
    currUser: User | null
}

const MainPage = ({ currUser } : MainPageProps) => {
    return (
        <Container className={noteContStyle.main}>
            <>
                { currUser
                    ? <NotesLoggedIn />
                    : <NotesLoggedOut />
                }
            </>
		</Container>
    );
}

export default MainPage;
