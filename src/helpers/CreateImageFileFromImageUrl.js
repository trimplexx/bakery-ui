const createImageFileFromImageUrl = async (imageUrl, name, errorNotify) => {
    try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            return new Error('Błąd pobierania obrazu');
        }
        const blob = await response.blob();
        return new File([blob], name + ".jpg", {type: blob.type});
    } catch (error) {
        errorNotify(error.message);
        return null;
    }
};

export default createImageFileFromImageUrl;
