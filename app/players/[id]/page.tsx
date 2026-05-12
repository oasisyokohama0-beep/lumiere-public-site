import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { BDivider } from '@/components/common/BDivider'
import therapistsData from '@/lib/data/therapists.json'
import shiftsData from '@/lib/data/shifts.json'
import reviewsData from '@/lib/data/reviews.json'
import type { Therapist, Shift, Review } from '@/lib/types'

// TODO(handover): ダミーデータを Supabase クエリに置換
// テーブル: users + player_profiles / フィルタ: id = params.id
const therapists = therapistsData as Therapist[]
const shifts = shiftsData as Shift[]
const reviews = reviewsData as Review[]

const WEEK_DAYS = ['月', '火', '水', '木', '金', '土', '日']
const WEEK_EN   = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const GRAD: Record<string, [string, string]> = {
  ren:   ['#C9A998', '#7A5E54'],
  sora:  ['#A8B5C9', '#4F5E7A'],
  yuki:  ['#E5D4D0', '#9B7A78'],
  aoi:   ['#B8C9A8', '#5E7A4F'],
  haru:  ['#E8C9C5', '#A77878'],
  shion: ['#C9B098', '#7A5E3E'],
}

export async function generateStaticParams() {
  return therapists.map(t => ({ id: t.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const t = therapists.find(t => t.id === id)
  if (!t) return {}
  return { title: `${t.name}（${t.romanName}）` }
}

export default async function PlayerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // TODO(handover): Supabase クエリに置換
  const t = therapists.find(t => t.id === id)
  if (!t) notFound()

  // 直近シフト (今日以降、最大7日)
  const today = new Date().toISOString().slice(0, 10)
  const myShifts = shifts
    .filter(s => s.therapistId === t.id && s.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 7)

  // セラピストの口コミ
  const myReviews = reviews.filter(r => r.therapistId === t.id).slice(0, 2)

  const [from, to] = GRAD[t.id] ?? ['#C9A998', '#7A5E54']

  return (
    <PageWrapper>
      <main>
        {/* カバー写真 */}
        <div className="mx-[22px] mt-6">
          <div className="p-1.5 border border-rule-gold">
            <div className="relative overflow-hidden" style={{ height: 380 }}>
              {t.mainPhotoUrl ? (
                <Image
                  src={t.mainPhotoUrl}
                  alt={t.name}
                  fill
                  sizes="(max-width: 430px) 100vw, 430px"
                  className="object-cover"
                  style={{ objectPosition: t.photoPosition ?? '50% 30%' }}
                  priority
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(160deg, ${from} 0%, ${to} 100%)` }}
                />
              )}
            </div>
          </div>
        </div>

        {/* 名前ブロック */}
        <div className="px-6 pt-7 pb-2 text-center">
          <span className="font-serif text-[11px] tracking-[4px] uppercase text-gold italic">Therapist</span>
          <div className="font-serif text-[30px] italic text-gold mt-2 tracking-[4px]">{t.romanName}</div>
          <div className="font-jp text-[28px] mt-1.5 tracking-[8px]">{t.name}</div>
          <div className="mt-4"><BDivider /></div>
          <div className="text-[11px] text-ink-sub mt-3.5 tracking-[1.5px]">
            {t.age} 歳  ／  {t.height} cm
          </div>
        </div>

        {/* 自己紹介 */}
        <div className="px-[30px] py-6 text-center">
          <div className="font-jp text-[14px] leading-[2.2] text-ink">{t.introduction}</div>
          <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
            {t.tags.map(tag => (
              <span
                key={tag}
                className="font-jp text-[10.5px] px-3 py-[5px] border border-rule-gold text-gold-dk tracking-[1px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 出勤スケジュール */}
        <div className="bg-cream px-[22px] py-8 mt-4">
          <div className="text-center">
            <span className="font-serif text-[11px] tracking-[4px] uppercase text-gold-dk italic">Schedule</span>
            <div className="font-jp text-[15px] mt-2">直近の出勤</div>
          </div>
          <div className="mt-5 flex flex-col gap-2">
            {myShifts.length === 0 ? (
              <div className="text-center font-serif text-[11px] text-ink-mute italic py-4">
                現在出勤予定はありません
              </div>
            ) : (
              myShifts.map(s => {
                const d = new Date(s.date)
                const dow = d.getDay()
                const dayIndex = dow === 0 ? 6 : dow - 1
                return (
                  <div
                    key={s.id}
                    className="flex items-center px-3.5 py-3 bg-surface border border-rule-gold"
                  >
                    <div className="w-9 font-jp text-[13px]">{WEEK_DAYS[dayIndex]}</div>
                    <div className="w-9 font-serif text-[11px] italic text-ink-sub">{WEEK_EN[dayIndex]}</div>
                    <div className="font-jp text-[12px] text-ink-sub">{s.date.slice(5).replace('-', '/')}</div>
                    <div className="flex-1 text-right font-serif text-[16px] italic text-gold-dk">
                      {s.startTime}〜{s.endTime}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* 口コミ */}
        {myReviews.length > 0 && (
          <div className="px-[30px] pt-8 pb-4 text-center">
            <span className="font-serif text-[11px] tracking-[4px] uppercase text-gold italic">Voice</span>
            <div className="font-serif text-[22px] italic text-gold mt-3.5 leading-none">&ldquo;</div>
            <div className="font-jp text-[13px] leading-[2.1] mt-1">{myReviews[0].content}</div>
            <div className="font-serif text-[11px] tracking-[1.5px] italic text-ink-sub mt-3.5">
              — {myReviews[0].authorName}
            </div>
          </div>
        )}

        {/* 指名ボタン */}
        <div
          className="sticky bottom-0 px-[22px] pt-3.5 pb-[22px]"
          style={{ background: 'linear-gradient(180deg, transparent 0%, var(--color-bg) 30%)' }}
        >
          <div className="bg-ink text-white px-6 py-[18px] flex items-center justify-between">
            <div>
              <div className="font-serif text-[9px] tracking-[3px] text-gold italic">BOOK</div>
              <div className="font-jp text-[14px] mt-0.5">{t.name} を指名する</div>
            </div>
            <span className="font-serif text-[22px] italic text-gold">→</span>
          </div>
        </div>
      </main>
    </PageWrapper>
  )
}
