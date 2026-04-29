import { notFound } from 'next/navigation';

async function getPost(slug: string) {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) return null;
  return res.json();
}

// SEO
export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt || '',
  };
}

export async function generateStaticParams() {
  const res = await fetch('http://localhost:3000/api/blog');
  const posts = await res.json();

  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params }: any) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* TITLE */}
      <h1 className="text-2xl md:text-3xl font-bold mb-4">{post.title}</h1>

      {/* COVER */}
      {post.coverUrl && (
        <img
          src={post.coverUrl}
          className="w-full h-60 md:h-80 object-cover rounded-xl mb-6"
        />
      )}

      <hr className="my-8 border-zinc-200 dark:border-zinc-800" />

      {/* CONTENT (BLOCK RENDER) */}
      <div className="space-y-4">
        {(post.content || []).map((block: any, i: number) => {
          switch (block.type) {
            case 'heading':
              return (
                <h2 key={i} className="text-xl font-semibold mt-6">
                  {block.text}
                </h2>
              );

            case 'paragraph':
              return (
                <p key={i} className="text-sm leading-relaxed">
                  {block.text}
                </p>
              );

            case 'insight':
              return (
                <div
                  key={i}
                  className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-sm"
                >
                  💡 {block.text}
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
