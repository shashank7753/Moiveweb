import { Movie_Trending } from "@/config/url";
import { FetchMovieInfo } from "@/lib/fetch";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Popular() {
  const data = await get_trending();
  FetchMovieInfo(data);

  return (
    <main>
      <div>
        <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data &&
            data.results.slice(0, 18).map((item: any, index: any) => (
              <Link href={`/movie/${encodeURIComponent(item.id)}`} key={index}>
                <Card className="text-center items-center hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xs h-6">
                      {item.title.length > 24
                        ? item.title.slice(0, 20) + "..."
                        : item.title.replace(/\s*\((\d{4})\)$/, "")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://image.tmdb.org/t/p/original${item.poster_path}`}
                      width={160}
                      height={160}
                      className="h-2/4 w-full object-cover transition-all aspect-[3/4] rounded-md"
                      alt="Drama Poster"
                    />
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </main>
  );
}

const get_trending = async () => {
  const res = await fetch(Movie_Trending, { next: { revalidate: 21600 } });
  const data = await res.json();
  return data;
};
