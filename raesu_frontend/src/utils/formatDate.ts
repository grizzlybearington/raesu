function formatDate(dateTime: string): string {
    return new Date(dateTime).toLocaleString("en-US",
    {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    });
}

export default formatDate;
