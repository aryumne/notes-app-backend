import { nanoid } from "nanoid";
import { notes } from "./notes.js";

const getAllNotes = () => ({
    status: "success",
    data: { notes },
});

const addNoteHandler = (req, h) => {
    const { title, tags, body } = req.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const newNote = { title, tags, body, id, createdAt, updatedAt };
    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;
    if (isSuccess) {
        const response = h.response({
            status: "success",
            message: "Note added successfully",
            data: { noteId: id },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: "failure",
        message: "Note added failed",
    });
    response.code(500);
    return response;
};
const getOneNote = (req, h) => {
    const { id } = req.params;
    const note = notes.find((note) => note.id === id);
    if (note !== undefined) {
        return {
            status: "success",
            data: { note },
        };
    }
    const response = h.response({
        status: "failure",
        message: "Note not found",
    });
    response.code(404);
    return response;
};

const updateNote = (req, h) => {
    const { id } = req.params;
    const { title, tags, body } = req.payload;
    const updatedAt = new Date().toISOString();
    const noteIndex = notes.findIndex((note) => note && note.id === id);
    if (noteIndex !== -1) {
        notes[noteIndex] = {
            ...notes[noteIndex],
            title,
            tags,
            body,
            updatedAt,
        };
        const response = h.response({
            status: "success",
            message: "Note updated successfully",
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: "failure",
        message: "Failed to update note!",
    });
    response.code(404);
    return response;
};

const deleteNote = (req, h) => {
    const { id } = req.params;
    const noteIndex = notes.findIndex((note) => note && note.id === id);
    if (noteIndex !== -1) {
        notes.splice(noteIndex, 1);
        const response = h.response({
            status: "success",
            message: "Note deleted successfully",
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: "failure",
        message: "Failed to delete note!",
    });
    response.code(404);
    return response;
};

export { addNoteHandler, getAllNotes, getOneNote, updateNote, deleteNote };
