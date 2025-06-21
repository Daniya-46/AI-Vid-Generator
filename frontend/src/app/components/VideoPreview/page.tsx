interface Props {
  videoUrl: string | null;
}

export default function VideoPreview({ videoUrl }: Props) {
  if (!videoUrl) return null;
  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-2">Video Preview</h3>
      <video
        src={videoUrl}
        controls
        className="w-full rounded-lg shadow mb-2"
      />
      <a
        href={videoUrl}
        download="generated-video.mp4"
        className="inline-block text-[#5c6ac4] hover:text-[#4a58b0] underline transition-colors"
      >
        Download Video
      </a>
    </div>
  );
}
