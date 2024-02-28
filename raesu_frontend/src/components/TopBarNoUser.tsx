import { Button } from "react-bootstrap";

interface TopBarNoUserProps {
    onSignUpClick: () => void,
    onLoginClick: () => void
}

const TopBarNoUser = ({ onSignUpClick, onLoginClick }: TopBarNoUserProps) => {
    return (
        <>
            <Button onClick={onSignUpClick} variant="dark">Register</Button>
            <Button onClick={onLoginClick} variant="dark">Login</Button>
        </>
    );
}

export default TopBarNoUser;
