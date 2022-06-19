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

    if (days === 0 && hours === 0 && minutes === 0) {
        return `${seconds}s`;
    } else if (days === 0 && hours === 0) {
        return `${minutes}m`;
    } else if (days === '0') {
        return `${hours}h`;
    } else {
        return `${initialDate.getDate()} ${months[
            initialDate.getMonth()
        ].substring(0, 3)}`;
    }
};
