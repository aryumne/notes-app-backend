import {
    getAllNotes,
    addNoteHandler,
    getOneNote,
    updateNote,
    deleteNote,
} from "./handlers.js";

export const routes = [
    {
        method: "GET",
        path: "/notes",
        handler: getAllNotes,
    },
    {
        method: "POST",
        path: "/notes",
        handler: addNoteHandler,
    },
    {
        method: "GET",
        path: "/notes/{id}",
        handler: getOneNote,
    },
    {
        method: "PUT",
        path: "/notes/{id}",
        handler: updateNote,
    },
    {
        method: "DELETE",
        path: "/notes/{id}",
        handler: deleteNote,
    },
];
