import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaNoteSticky } from "react-icons/fa6";
import * as NoteAPI from "../api/api";
import noteContStyle from "../css/NoteContainer.module.css";
import utilStyle from "../css/utils.module.css";
import NoteModel from "../models/note";
import NewEditNote from "./NewEditNote";
import Note from "./Note";

const NotesLoggedIn = () => {
    const [notes, setNotes] = useState<NoteModel[]>([]);
	const [loading, setLoading] = useState(false);
	const [loadError, setLoadError] = useState(false);
	const [showNewNote, setShowNewNote] = useState(false);
	const [showEditNote, setEditNote] = useState<NoteModel|null>(null);

    useEffect(() => {
		async function fetchNotes() {
			try {
				setLoadError(false);
				setLoading(true);
				const notes = await NoteAPI.fetchNotes();
				setNotes(notes);
			} catch (err) {
				console.error(err);
				alert(err);
				setLoadError(true);
			} finally {
				setLoading(false);
			}
		}
		fetchNotes();
	}, []);

	async function deleteNote(toDelNote: NoteModel) {
		try {
		await NoteAPI.delNote(toDelNote._id);
		setNotes(notes.filter(note => note._id !== toDelNote._id))
		} catch (err) {
		console.error(err);
		alert(err);
		}
	}

	const noteFront =
		<Row xs={1} md={2} xl={3} className={`g-4 ${noteContStyle.noteArray}`}>
			{notes.map(note => (
			<Col key={note._id}>
				<Note
				note={note}
				className={noteContStyle.note}
				onClickDelete={deleteNote}
				onNoteClick={setEditNote}/>
			</Col>
			))}
		</Row>

    return (
        <>
			<Button
				className={`mb-4
				${utilStyle.centerBlock}
				${utilStyle.newNoteButton}`}
				onClick={() => setShowNewNote(true)}>
					<FaNoteSticky className={utilStyle.newNoteIcon}/>
			</Button>

			{loading && <Spinner animation='border' variant='secondary' />}
			{loadError && <span>Something went wrong. Please try again.</span>}

			{!loading && !loadError &&
                <>
                { notes.length <= 0
                    ? <span>There's nothing here. Create some notes?</span>
                    : noteFront
                }
                </>
			}

			{showNewNote &&
				<NewEditNote onDismiss={() => setShowNewNote(false)}
				onNoteSaved={(newNote) => {
                    setNotes([...notes, newNote]);
                    setShowNewNote(false);
                }}/>
            }

            {showEditNote &&
                <NewEditNote
                noteToEdit={showEditNote}
                onDismiss={() => setEditNote(null)}
                onNoteSaved={(editedNote) => {
                    setNotes(notes.map(
						currNote => currNote._id === editedNote._id
						? editedNote
						: currNote))
                    setEditNote(null);
                }}/>
            }
        </>
    )
}

export default NotesLoggedIn;
