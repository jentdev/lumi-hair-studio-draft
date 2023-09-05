const json = localStorage.getItem('form');
const obj = JSON.parse(json);

for (key in obj) {
    extractDate(key, obj);
    const markup = `
        <div><span><b>${key}:</b> ${obj[key]}</span></div>
    `;
    document.getElementById('data').innerHTML += markup;
}

function extractDate(key, obj) {
    if (obj[key] === '') {
        obj[key] = '(not specified)';
    }
    else if (key === 'Date') {
        const [date, time] = obj[key].split('T');
        const getDate = convertDate(date);
        const getTime = convertTime(time);
        obj[key] = `${getDate} at ${getTime}`;
    }
    return (obj);
}

function convertDate(date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [year, month, day] = date.split('-');
    const suffix = getSuffix(day);
    return `${months[month - 1]} ${parseInt(day)}${suffix}, ${year}`;
}

function convertTime (time) {
    let [hour, minute] = time.split(':');
    if (hour === '00') {
        hour = '12';
        minute += ' am';
    }
    else if (hour === '12') {
        minute += ' pm';
    }
    else if (hour > 12) {
        hour -= 12;
        minute += ' pm';
    }
    else {
        minute += ' am';
    }
    return `${hour}:${minute}`;
}

function getSuffix (day) {
    const numDay = Number(day);
    const suffix = ['<sup>st</sup>', '<sup>nd</sup>', '<sup>rd</sup>', '<sup>th</sup>'];
    if (numDay > 3 && day < 21) {
        return suffix[3];
    }
    switch (numDay % 10) {
        case 1:
            return suffix[0];
        case 2:
            return suffix[1];
        case 3:
            return suffix[2];
        default:
            return suffix[3];
    }
}