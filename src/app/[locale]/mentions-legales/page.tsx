import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {LegalDocument} from '@/components/sections/LegalDocument';
import {getContent} from '@/content';
import {pageMetadata} from '@/lib/seo';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadata(getContent(locale).legalNotice.meta);
}

export default async function LegalPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <LegalDocument document={getContent(locale).legalNotice} />;
}
