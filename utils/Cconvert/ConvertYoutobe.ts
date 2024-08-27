export const ConvertYouTubeUrlToEmbed = (url: string) => {
    const match = url?.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)(?:&list=([^&]+))?/
    );
    // const match = url?.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)(?:&list=([^&]+))?/);

    if (match && match[1]) {
        let embedUrl = `https://www.youtube.com/embed/${match[1]}`;

        // Nếu có cả list (danh sách phát), thêm nó vào URL nhúng
        if (match[2]) {
            embedUrl += `?list=${match[2]}`;
        }

        return embedUrl;
    }
    return null;
};
