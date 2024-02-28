import { Card } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import noteStyle from "../css/Note.module.css";
import utilStyle from "../css/utils.module.css";
import NoteModel from "../models/note";
import formatDate from "../utils/formatDate";

interface NoteProps {
    note: NoteModel,
    className?: string,
    onClickDelete: (note: NoteModel) => void,
    onNoteClick: (note: NoteModel) => void
}

const Note = ({ note, className, onClickDelete, onNoteClick } : NoteProps) => {
    const {
        title,
        body,
        createdAt,
        updatedAt
    } = note;

    let newerDate: string;
    if (updatedAt > createdAt) {
        newerDate = "Upd. - " + formatDate(updatedAt);
    } else {
        newerDate = "Made - " + formatDate(createdAt);
    }

    return (
        <Card
        className={`${noteStyle.noteCard} ${className}`}
        onClick={() => onNoteClick(note)}
        >
            <Card.Body className={noteStyle.cardBody}>
                <Card.Title>
                    {title}
                </Card.Title>
                <Card.Text className={noteStyle.cardText}>
                    {body}
                </Card.Text>
            </Card.Body>
            <Card.Footer className={`text-muted ${utilStyle.centerFlex}`}>
                {newerDate}
                <RxCross2
                className="ms-auto"
                onClick={(e) => {
                    onClickDelete(note);
                    e.stopPropagation();
                }}/>
            </Card.Footer>
        </Card>
    )
}

export default Note;
