import Note from "../models/note";
import User from "../models/user";

export interface NoteInput {
    title: string,
    body?: string
}

export interface UserData {
    username: string,
    password: string
}

async function fetchData(info: RequestInfo, init?: RequestInit) {
    const res = await fetch(info, init);
    if (res.ok) {
        return res;
    } else {
        const err = await res.json();
        const errMsg = err.err;
        console.log(err.err);
        throw Error(errMsg);
    }
}

export async function fetchNotes(): Promise<Note[]> {
    const res = await fetchData("/api/notes", { method: "GET" });
    return res.json();
}


export async function postNote(note: NoteInput): Promise<Note> {
    const res = await fetchData("/api/notes",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    });
    return res.json();
}

export async function delNote(noteID: string) {
    await fetchData("/api/notes/" + noteID, { method: "DELETE" });
}

export async function editNote(noteID: string, note: NoteInput):
Promise<Note> {
    const res = await fetchData("/api/notes/" + noteID,
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    });
    return res.json();
}

export async function retrieveCurrentUser(): Promise<User> {
    console.log('Trying to retrieve...');
    const res = await fetchData("/api/users", { method: "GET" } );
    console.log(res);
    return res.json();
}

export async function signUp(authData: UserData): Promise<User> {
    const res = await fetchData("/api/users/signup",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
    });
    return res.json();
}

export async function login(authData: UserData): Promise<User> {
    const res = await fetchData("/api/users/login",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
    });
    return res.json();
}

export async function logout() {
    await fetchData("/api/users/logout", { method: "POST" });
}
