export async function getMockContents() {
    const res = await fetch(`https://youtube138.p.rapidapi.com/search/?q=live&hl=en&gl=VN`, {
        method: "GET",
        headers: {
            "x-rapidapi-host": "youtube138.p.rapidapi.com",
            "x-rapidapi-key": "ab831ce861mshd08491a9042f0d6p14def1jsnf6a56bd43f78",
            "useQueryString": "true",
        },
    });

    const data = await res.json();
    return data;
}