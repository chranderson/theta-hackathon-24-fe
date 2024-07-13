import VideoLoader from './videoLoader';

export default function VideoLoaderPage() {
  return (
    <main className="mt-16 sm:container flex flex-col">
      <h1 className="font-semibold text-3xl text-center mb-24">
        Video Processor
      </h1>
      <VideoLoader />
    </main>
  );
}
