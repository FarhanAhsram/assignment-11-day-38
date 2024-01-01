import Image from "next/image";

export async function getStaticPaths() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos`);
  const albums = await response.json();
  const albumIds = albums.map((album) => ({
    params: { albumId: String(album.id) },
  }));

  return { paths: albumIds, fallback: false };
}

export async function getStaticProps(router) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos/${router.params.albumId}`
  );
  const albumDetails = await response.json();

  return { props: { albumDetails } };
}

export default function albumDetailsPage({ albumDetails }) {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-900">
      <div className="container mx-auto p-4">
        <h1 className="text-center font-bold text-3xl mt-2 mb-10 text-blue-700 border-b-2 border-blue-700 pb-2">
          Album Details
        </h1>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 pr-4">
            <Image
              src={albumDetails.url}
              width={600}
              height={600}
              quality={100}
              alt="Album Photo"
              className="rounded-lg"
            />
          </div>

          <div className="md:w-1/2 relative flex flex-col">
            <h2 className="text-center font-bold text-3xl">
              {albumDetails.title}
            </h2>
            <p className="mt-4 text-justify">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo
              quaerat quae voluptas repellendus laboriosam eius delectus
              nesciunt officiis, fugiat ipsa error labore veniam saepe officia
              pariatur expedita illum nihil tempora. Consequatur aut laudantium
              totam, reiciendis commodi illo, labore iure repudiandae, nesciunt
              veritatis accusantium repellat voluptatem magnam exercitationem
              obcaecati atque.
            </p>
            <div className="flex flex-col items-center mt-auto">
              <h1 className="mb-2 font-bold">Thumbnail</h1>
              <Image
                src={albumDetails.thumbnailUrl}
                width={150}
                height={150}
                quality={100}
                alt="Thumbnail Cover 1"
                className="rounded-lg mx-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
