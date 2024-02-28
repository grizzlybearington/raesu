import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as NotesAPI from "../api/api";
import { NoteInput } from "../api/api";
import Note from "../models/note";
import FormInput from "./FormInput";

interface NewEditNoteProps {
    onDismiss: () => void,
    onNoteSaved:  (note: Note) => void,
    noteToEdit?: Note
}

const NewEditNote = ({ onDismiss, onNoteSaved, noteToEdit }:
    NewEditNoteProps) => {

    const { register, handleSubmit, formState : { errors, isSubmitting } }
    = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            body: noteToEdit?.body || ""
        }
    });

    async function onSubmit(input: NoteInput) {
        try {
            let noteRes: Note;
            if (!noteToEdit) {
                noteRes = await NotesAPI.postNote(input);
            } else {
                noteRes = await NotesAPI.editNote(noteToEdit._id, input);
            }
            onNoteSaved(noteRes);
        } catch (err) {
            console.error(err);
            alert(err);
        }
    }

    return (
        <Modal show onHide={() => onDismiss()}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {noteToEdit ? "Edit Note" : "Add Note"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="newNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <FormInput
                    name="title"
                    label="Title"
                    type="text"
                    placeholder="(Required)"
                    register={register}
                    registerOptions={{ required: "Required" }}
                    error={errors.title}
                    />

                    <FormInput
                    name="body"
                    label="Body"
                    as="textarea"
                    rows={5}
                    placeholder="A lovely note..."
                    register={register}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit"
                form="newNoteForm"
                disabled={isSubmitting}>Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewEditNote;
