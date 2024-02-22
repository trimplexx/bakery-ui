function handleApiError(error, errorNotify) {
    if (error.response && error.response.data && error.response.data.error) {
        errorNotify(error.response.data.error);
    } else {
        errorNotify('Wystąpił błąd połączenia!');
    }
}

export default handleApiError;