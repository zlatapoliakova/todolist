const manipulateData = async (url, method = "GET", body = null, headers = {}) => {
    const res = await fetch(url, {method, body, headers});

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}

export default manipulateData;