export const generateSKUCode = (name: string) => {
    const code = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s/g, '').slice(0, 3).toUpperCase();
    const randomNumber = (Math.floor(Math.random() * 900) + 100).toString();
    return `${code}${randomNumber}`;
}