export default function VideoCard({ video }) {
  const getEmbedUrl = (url) => {
    if (!url) return null;
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    return url;
  };

  const embedUrl = getEmbedUrl(video.url);

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
      {embedUrl && (
        <div className="aspect-video">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title}
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-white text-sm">{video.title}</h3>
        {video.description && (
          <p className="text-gray-500 text-xs mt-1">{video.description}</p>
        )}
      </div>
    </div>
  );
}
