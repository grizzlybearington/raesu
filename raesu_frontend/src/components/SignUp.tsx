import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as NotesAPI from "../api/api";
import { UserData } from "../api/api";
import User from "../models/user";
import FormInput from "./FormInput";

interface SignUpProps {
    onDismiss: () => void,
    onSignUpSuccess: (user: User) => void,
}

const SignUp = ({ onDismiss, onSignUpSuccess }: SignUpProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } }
    = useForm<UserData>();

    const [alertText, setAlertText] = useState<string | null>(null);

    async function onSubmit(authData: UserData) {
        try {
            const newUser = await NotesAPI.signUp(authData);
            onSignUpSuccess(newUser);
        } catch (err) {
            let errMsg = "Unknown error";
            if (err instanceof Error) {
                errMsg = err.message;
            }
            setAlertText(errMsg);
        }
    }

    return (
        <Modal show onHide={() => onDismiss()}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Register
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {alertText &&
                    <Alert variant="danger">
                        {alertText}
                    </Alert>
                }

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormInput
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="Username"
                    register={register}
                    registerOptions={{ required: "Required" }}
                    error={errors.username} />

                    <FormInput
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Password"
                    register={register}
                    registerOptions={{ required: "Required" }}
                    error={errors.username} />

                    <Button
                    type="submit"
                    disabled={isSubmitting}
                    >Submit</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default SignUp;
