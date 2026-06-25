import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from "axios";

function CandidateDetails() {
    const { id } = useParams();
    const [candidate, setCandidate] = useState(null);
    const [notes, setNotes] = useState([]);
    const [noteText, setNoteText] = useState("");

    const fetchCandidate = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/candidates/${id}`);
            setCandidate(response.data);
        } catch (error) {
            console.error("Error fetching candidate details:", error);
        }
    };

    const fetchNotes = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/candidates/${id}/notes`
            );

            setNotes(response.data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const addNote = async () => {
        if (!noteText.trim()) return;

        try {
            await axios.post(
                `http://localhost:5000/candidates/${id}/notes`,
                {
                    content: noteText,
                }
            );

            setNoteText("");

            fetchNotes();
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    useEffect(() => {
        fetchCandidate();
        fetchNotes();
    }, []);

    return (
        <div>
            <h1>Candidate Details</h1>

            {candidate ? (
                <>
                    <h2>{candidate.name}</h2>
                    <p>{candidate.role}</p>

                    <h3>Notes</h3>

                    {notes.length === 0 ? (
                        <p>No notes yet.</p>
                    ) : (
                        notes.map((note) => (
                            <div key={note.id}>
                                <p>{note.content}</p>
                            </div>
                        ))
                    )}

                    <input
                        type="text"
                        placeholder="Write a note"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                    />

                    <button onClick={addNote}>
                        Add Note
                    </button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default CandidateDetails
