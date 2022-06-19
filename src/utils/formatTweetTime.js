export const formatTweetTime = dateString => {
    const date = new Date(dateString);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${String(minutes).padStart(2, '0')} ${
        hours <= 12 ? 'AM' : 'PM'
    }`;
};
