export const post = {
    async json(url: string, data = {}) {
        return await fetch(url, {
            method: "POST",
            body: JSON.stringify(data).replace(/'/g, `''`),
            headers: {
                "Content-Type": "application/json",
            },
        });
    },
};
