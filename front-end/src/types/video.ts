interface Content {
    type: string;
    video: Video;
}
interface Video {
    author: Author;
    descriptionSnippet: string;
    stats: Stats;
    thumbnails: Avatar[];
    title: string;
    videoId: string;
}
interface Stats {
    viewers: number;
}
interface Author {
    avatar: Avatar[];
    badges: Badge[];
    channelId: string;
    title: string;
}
interface Badge {
    text: string;
    type: string;
}
interface Avatar {
    url: string;
}
