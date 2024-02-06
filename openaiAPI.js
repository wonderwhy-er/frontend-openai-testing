


export function headers(key) {
    return {
        "Content-Type": "application/json",
            "Authorization": `Bearer ${key}`
    };
}
export async function chatCompletion(data, key) {
    return (await fetch('https://api.openai.com/v1/chat/completions', {
        method: "POST",
        headers: headers(key),
        body: JSON.stringify(data)
    })).json();
}
