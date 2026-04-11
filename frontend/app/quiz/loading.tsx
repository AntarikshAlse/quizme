export default function Loading() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Loading quizzes...</h2>

      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-16 bg-gray-200 animate-pulse rounded-md"
          />
        ))}
      </div>
    </div>
  );
}