import Image from 'next/image';
import {SLOGAN} from '@/lib/brand';

export default function Page() {
  return (
    <main className="grid min-h-screen place-items-center gap-6 bg-lokambe-peach p-8 text-lokambe-blue">
      <Image src="/brand/logo-blue.png" alt="LOKAMBE" width={1200} height={197} className="h-10 w-auto" priority />
      <p lang="ln" className="text-4xl font-extrabold uppercase">{SLOGAN}</p>
      <div className="flex gap-4">
        <span className="size-16 rounded-2xl bg-lokambe-blue" />
        <span className="size-16 rounded-2xl bg-lokambe-peach ring-2 ring-lokambe-blue" />
        <span className="size-16 rounded-2xl bg-lokambe-red" />
      </div>
    </main>
  );
}
