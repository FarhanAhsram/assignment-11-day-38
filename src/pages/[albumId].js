import Image from "next/image";
import Link from "next/link";

export async function getStaticPaths() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos`);
  const albums = await response.json();
  const albumIds = albums.map((album) => ({
    params: { albumId: String(album.id) },
  }));

  return { paths: albumIds, fallback: false };
}

export async function getStaticProps({ params }) {
  const { albumId } = params;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
  );
  const albumDetails = await response.json();

  return { props: { albumDetails } };
}

export default function albumDetailsPage({ albumDetails }) {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-900">
      <div className="container mx-auto p-4">
        <h1 className="text-center font-bold text-3xl mt-2 mb-3 text-blue-700 border-b-2 border-blue-700 pb-2">
          List of Photos
        </h1>

        <div className="flex flex-wrap justify-center items-center">
          {albumDetails.map((item) => (
            <div key={item.id} className="w-1/4 p-4 text-center">
              <Link href={item.url}>
                <Image
                  src={item.thumbnailUrl}
                  width={150}
                  height={150}
                  quality={100}
                  alt="Thumbnail Cover"
                  className="rounded-lg mx-auto my-2"
                />
              </Link>
              <h1 className="text-2x1 font-bold">{item.title}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
