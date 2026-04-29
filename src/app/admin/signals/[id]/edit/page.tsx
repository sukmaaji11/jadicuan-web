'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import SignalForm from '@/components/signal-form';
import SignalPreview from '@/components/signal-preview';

export default function EditSignalPage() {
  const { id } = useParams();
  const router = useRouter();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/signal/${id}`)
      .then((res) => res.json())
      .then(setData);
  }, [id]);

  if (!data) return <p>Loading...</p>;

  const handleSubmit = async (form: any) => {
    await fetch(`/api/signal/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(form),
    });

    router.push('/admin/signals');
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <SignalForm
        initialData={data}
        onSubmit={handleSubmit}
        onChange={setData}
      />

      <div className="sticky top-6 h-fit">
        <SignalPreview data={data} />
      </div>
    </div>
  );
}
