export const formatTweetDate = (dateString, profileDateJoined = false) => {
    const date = new Date(dateString);

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    const dateValue = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    if (profileDateJoined) {
        return `${months[month]} ${year}`;

    } else {
        return `${months[month].substring(0, 3)} ${dateValue}, ${year}`;
    }

};
