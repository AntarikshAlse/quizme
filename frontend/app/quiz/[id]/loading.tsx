export default function LoadingQuiz() {
  return (
    <div className="p-4">
      <div className="h-8 w-1/2 bg-gray-200 animate-pulse mb-6 rounded" />

      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
            <div className="h-10 bg-gray-200 animate-pulse rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}