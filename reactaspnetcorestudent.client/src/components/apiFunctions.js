const BACKEND_URL = 'https://localhost:7129';

export async function populateStudentsData(setter, search = '') {
    try {
        const response = await fetch(`${BACKEND_URL}/api/students?search=${search}`, {
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            setter(data);
        } else {
            setter([]);
        }
    } catch {
        setter([]);
    }
}

export async function populateStudentData(id, setter) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/students/${id}`, {
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            setter(data);
        } else {
            setter(null);
        }
    } catch {
        setter(null);
    }
}

export async function sendStudentData(studentData) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/students/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(studentData),
        });

        const responseText = await response.text();

        if (!responseText) {
            throw new Error('Server returned empty response');
        }

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (parseError) {
            throw new Error(`Server returned invalid JSON: ${responseText.substring(0, 100)}`);
        }

        if (response.ok) {
            alert('Game created successfully!');
            return result;
        } else {
            throw new Error(result.error || 'Failed to create game');
        }
    } catch (error) {
        alert('Failed to create game: ' + error.message);
        throw error;
    }
}

export async function updateStudentData(formData) {
    try {
        const studentData = {
            id: parseInt(formData.get('Id')),
            name: formData.get('Name'),
            surname: formData.get('Surname'),
            age: parseInt(formData.get('Age')),
            gpa: parseFloat(formData.get('GPA')),
            photo: formData.get('Photo') || ''
        };

        const response = await fetch(`${BACKEND_URL}/api/students/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(studentData),
        });

        const responseText = await response.text();

        if (!responseText) {
            throw new Error('Server returned empty response');
        }

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (parseError) {
            throw new Error(`Server returned invalid JSON: ${responseText.substring(0, 100)}`);
        }

        if (response.ok) {
            alert('Game updated successfully!');
            return result;
        } else {
            throw new Error(result.error || 'Failed to update game');
        }
    } catch (error) {
        alert('Failed to update game: ' + error.message);
        throw error;
    }
}

export async function deleteStudentData(id) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/students/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        const responseText = await response.text();

        if (!responseText) {
            throw new Error('Server returned empty response');
        }

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (parseError) {
            throw new Error(`Server returned invalid JSON: ${responseText.substring(0, 100)}`);
        }

        if (response.ok) {
            alert('Game deleted successfully!');
            return result;
        } else {
            throw new Error(result.error || 'Failed to delete game');
        }
    } catch (error) {
        alert('Failed to delete game: ' + error.message);
        throw error;
    }
}

export async function debugGames() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/students/debug`, {
            credentials: 'include'
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Debug error:', error);
    }
}
export async function sendChatMessage(messageData) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(messageData),
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Send message error:', error);
        throw error;
    }
}

export async function getChatMessages() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/chat`, {
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Get messages error:', error);
        return [];
    }
}