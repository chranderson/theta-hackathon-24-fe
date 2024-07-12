import VideoLoader from './videoLoader';

export default function VideoLoaderPage() {
  return (
    <main className="h-inherit mt-8 sm:mt-16 sm:container flex flex-col gap-8">
      <h1 className="font-semibold text-2xl text-center">Video Loader Demo</h1>
      <VideoLoader />
    </main>
  );
}
