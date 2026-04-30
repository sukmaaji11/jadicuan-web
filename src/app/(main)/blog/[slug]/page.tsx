import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

// 🔥 ambil post langsung dari DB
async function getPost(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
  });
}

// 🔥 SEO
export async function generateMetadata({ params }: any) {
  const { slug } = params;

  const post = await getPost(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt || '',
  };
}

// 🔥 static params
export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    select: { slug: true },
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 🔥 PAGE
export default async function Page({ params }: any) {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) return notFound();

  type Block =
    | { id: string; type: 'paragraph'; text: string }
    | { id: string; type: 'heading'; text: string }
    | { id: string; type: 'insight'; text: string };

  const content = Array.isArray(post.content) ? (post.content as Block[]) : [];
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
        {content.map((block: Block, i: number) => {
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
