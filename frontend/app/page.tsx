import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center w-[300px]">
        <h1 className="text-2xl font-bold mb-6">Quiz App</h1>

        <div className="flex flex-col gap-4">
          <Link href="/admin/create">
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Create Quiz
            </button>
          </Link>

          <Link href="/quiz">
            <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Show Quizzes
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}