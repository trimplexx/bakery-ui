function handleApiError(error, errorNotify) {
    if (error.response && error.response.data && error.response.data.error) {
        errorNotify(error.response.data.error);
    } else {
        errorNotify('Błąd połączenia serwera');
    }
}

export default handleApiError;