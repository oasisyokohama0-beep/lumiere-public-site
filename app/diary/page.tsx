import type { Metadata } from 'next'
import Link from 'next/link'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { BDivider } from '@/components/common/BDivider'
import diaryData from '@/lib/data/diary.json'
import type { DiaryPost } from '@/lib/types'

export const metadata: Metadata = {
  title: '写メ日記',
  description: 'Lumière（ルミエール）セラピストの写メ日記・ブログ。',
}

// TODO(handover): ダミーデータを Supabase クエリに置換 / テーブル: diary_posts
const posts = (diaryData as DiaryPost[]).sort(
  (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
)

function formatDate(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

export default function DiaryPage() {
  return (
    <PageWrapper>
      <main>
        <div className="px-6 pt-10 pb-6 text-center">
          <span className="font-serif text-[11px] tracking-[4px] uppercase text-gold italic">Diary</span>
          <div className="font-jp text-[22px] mt-3 tracking-[4px]">写メ日記</div>
          <div className="mt-4"><BDivider /></div>
        </div>

        <div className="px-[22px]">
          {posts.map((p, i) => (
            <Link key={p.id} href={`/diary/${p.id}`} className="block no-underline">
              <div
                className="py-5"
                style={{ borderBottom: i < posts.length - 1 ? '1px solid rgba(42,38,34,0.10)' : 'none' }}
              >
                <div className="font-serif text-[10px] tracking-[2px] text-gold italic">
                  {formatDate(p.postedAt)} ・ {p.therapistName}
                </div>
                <div className="font-jp text-[16px] mt-1.5 leading-snug">{p.title}</div>
                <div className="font-jp text-[12px] text-ink-sub mt-2 leading-relaxed line-clamp-2">
                  {p.content}
                </div>
                <div className="mt-2 font-serif text-[10px] tracking-[2px] text-gold italic">read more →</div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </PageWrapper>
  )
}
