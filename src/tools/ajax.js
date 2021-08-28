const post = {
    async json(url, data = {}) {
        return await fetch(url, {
            method: "POST",
            body: JSON.stringify(data).replaceAll("'", "''"),
            headers: {
                "Content-Type": "application/json",
            },
        });
    },
};

export {
    post
};