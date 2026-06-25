import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CandidatesPage() {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [candidates, setCandidates] = useState([]);
    const navigate = useNavigate();

    const addCandidate = async () => {
        if (!name.trim() || !role.trim()) {
            alert("Please fill in both Name and Role before adding.");
            return;
        }

        try {
            await axios.post("http://localhost:5000/candidates", {
                name,
                role,
            })
            alert("Candidate inserted successfully");
            setName("");
            setRole("");
            fetchCandidates();
        } catch (error) {
            console.error("Error adding candidate:", error);
            alert("Failed to insert candidate");
        }
    }

    const fetchCandidates = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/candidates"
            );

            setCandidates(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteCandidate = async (id) => {
        try {
            await axios.delete(
                `http://localhost:5000/candidates/${id}`
            );

            fetchCandidates();
        } catch (error) {
            console.error("Error deleting candidate:", error);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    return (
        <>
            <div>
                <h1>Add Candidate</h1>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <br />

                <input
                    type="text"
                    placeholder="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />

                <br />

                <button onClick={addCandidate} disabled={!name.trim() || !role.trim()}>
                    Add Candidate
                </button>
            </div>

            <h2>All Candidates</h2>

            {candidates.map((candidate) => (
                <div
                    key={candidate.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <span
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                            navigate(`/candidates/${candidate.id}`)
                        }
                    >
                        {candidate.name} - {candidate.role}
                    </span>

                    <button
                        onClick={() => deleteCandidate(candidate.id)}
                        style={{ marginLeft: "10px" }}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </>
    );
}

export default CandidatesPage;