const createImageFileFromImageUrl = async (imageUrl, name, errorNotify) => {
    try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error('Błąd pobierania obrazu');
        }
        const blob = await response.blob();
        const file = new File([blob], name + ".jpg", { type: blob.type });
        return file;
    } catch (error) {
        errorNotify(error.message);
        return null; // Return null or handle the error accordingly
    }
};

export default createImageFileFromImageUrl;
