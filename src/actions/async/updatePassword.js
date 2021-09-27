export function updatePassword(login, password) {
    return (dispatch) => {
        fetch(`http://localhost:5000/users`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({login, password}),
        });
    };
}
