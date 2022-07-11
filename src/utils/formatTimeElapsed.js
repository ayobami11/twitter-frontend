export const formatTimeElapsed = dateString => {
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

    const initialDate = new Date(dateString);
    const currentDate = new Date();

    // time difference in milliseconds
    let timeElapsed = currentDate.getTime() - initialDate.getTime();

    timeElapsed /= 1000;
    const seconds = Math.floor(timeElapsed % 60);

    timeElapsed = Math.floor(timeElapsed / 60);
    const minutes = timeElapsed % 60;

    timeElapsed = Math.floor(timeElapsed / 60);
    const hours = timeElapsed % 24;

    timeElapsed = Math.floor(timeElapsed / 24);
    const days = timeElapsed;

    if (days >= 7) return `${initialDate.getDate()} ${months[initialDate.getMonth()].substring(0, 3)}`;
    else if (days) return `${days}d`;
    else if (hours) return `${hours}h`;
    else if (minutes) return `${minutes}m`;
    else return `${seconds}s`;
};
