import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { BDivider } from '@/components/common/BDivider'
import diaryData from '@/lib/data/diary.json'
import type { DiaryPost } from '@/lib/types'

// TODO(handover): ダミーデータを Supabase クエリに置換 / テーブル: diary_posts
const posts = diaryData as DiaryPost[]

export async function generateStaticParams() {
  return posts.map(p => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const p = posts.find(p => p.id === id)
  if (!p) return {}
  return { title: `${p.title} — ${p.therapistName}` }
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

export default async function DiaryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = posts.find(p => p.id === id)
  if (!post) notFound()

  return (
    <PageWrapper>
      <main>
        <div className="px-6 pt-10 pb-6 text-center">
          <span className="font-serif text-[11px] tracking-[4px] uppercase text-gold italic">Diary</span>
          <div className="font-serif text-[10px] tracking-[2px] text-ink-sub italic mt-3">
            {formatDate(post.postedAt)} ・ {post.therapistName}
          </div>
          <div className="font-jp text-[20px] mt-3 leading-snug">{post.title}</div>
          <div className="mt-5"><BDivider /></div>
        </div>

        <div className="px-[30px] pb-10">
          <div className="font-jp text-[14px] leading-[2.2] text-ink whitespace-pre-wrap">{post.content}</div>
        </div>

        <div className="px-[22px] pb-8 text-center">
          <Link href="/diary" className="font-serif text-[11px] tracking-[2px] text-gold italic no-underline">
            ← 日記一覧に戻る
          </Link>
        </div>
      </main>
    </PageWrapper>
  )
}
