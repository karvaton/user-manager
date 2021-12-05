async function json(url, data = {}) {
    return await fetch(url, {
        method: this.method,
        body: JSON.stringify(data).replace(/'/g, "''"),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const post = {
    method: "POST",
    json,
};

export const put = {
    method: "PUT",
    json,
};
