let url = '';

if (process.env.NODE_ENV === 'development') {
    url = 'http://127.0.0.1:8000';
    url = window.location.origin;
} else {
    url = window.location.origin;
}

const serverUrl = url;

const apiUrl = `${serverUrl}/api`;
const mediaUrl = `${serverUrl}/media`;

export { serverUrl, apiUrl, mediaUrl };
