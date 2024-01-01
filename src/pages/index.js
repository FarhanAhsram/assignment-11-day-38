import Link from "next/link";

export async function getServerSideProps() {
  const resp = await fetch("https://jsonplaceholder.typicode.com/albums");
  const data = await resp.json();
  return { props: { data } };
}

export default function HomePage({ data }) {
  return (
    <div className="bg-gray-200 dark:bg-gray-900">
      <div className="container mx-auto p-4">
        <h1 className="text-center font-bold text-3xl mt-2 mb-10 text-blue-700 border-b-2 border-blue-700 pb-2">
          List of Albums
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {data.map((item, index) => (
            <Link
              key={item.id}
              href={`${item.id}`}
              className={`block max-w-sm mx-auto sm:w-full p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${
                index % 2 === 0 ? "bg-blue-100" : "bg-green-100"
              }`}
            >
              <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Album No. {`${index + 1}`}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
