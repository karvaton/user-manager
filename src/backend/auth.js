const login = async (login, password) => {
    const response = await fetch("http://localhost:3001/auth", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
    });
    return response.text();
}

export {
    login
}