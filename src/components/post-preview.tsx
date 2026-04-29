export default function PostPreview({ post }: any) {
  if (!post.title && !post.content?.length) {
    return (
      <div className="text-sm text-zinc-400">
        Preview akan muncul di sini...
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl border bg-white dark:bg-zinc-900 space-y-4">
      {/* TITLE */}
      <h1 className="text-xl font-bold">{post.title || 'Judul artikel...'}</h1>

      {/* COVER */}
      {post.coverUrl && (
        <img
          src={post.coverUrl}
          className="w-full h-40 object-cover rounded-xl"
        />
      )}

      {/* EXCERPT */}
      {post.excerpt && <p className="text-sm text-zinc-500">{post.excerpt}</p>}

      <hr className="my-4 border-zinc-200 dark:border-zinc-800" />

      {/* CONTENT */}
      <div className="space-y-3">
        {post.content?.map((block: any, i: number) => {
          switch (block.type) {
            case 'heading':
              return (
                <h2 key={i} className="text-lg font-semibold">
                  {block.text || 'Heading...'}
                </h2>
              );

            case 'paragraph':
              return (
                <p key={i} className="text-sm leading-relaxed">
                  {block.text || 'Paragraf...'}
                </p>
              );

            case 'insight':
              return (
                <div
                  key={i}
                  className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl text-sm"
                >
                  💡 {block.text || 'Insight...'}
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
