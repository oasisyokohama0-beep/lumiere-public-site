import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { BDivider } from '@/components/common/BDivider'
import therapistsData from '@/lib/data/therapists.json'
import shiftsData from '@/lib/data/shifts.json'
import type { Therapist, Shift } from '@/lib/types'

export const metadata: Metadata = {
  title: '本日の出勤',
  description: 'Lumière（ルミエール）の本日・今週の出勤スケジュール。',
}

// TODO(handover): ダミーデータを Supabase クエリに置換
// テーブル: shifts / フィルタ: date = today, player_profiles.is_public = true
const therapists = therapistsData as Therapist[]
const shifts = shiftsData as Shift[]

const GRAD: Record<string, [string, string]> = {
  ren:   ['#C9A998', '#7A5E54'],
  sora:  ['#A8B5C9', '#4F5E7A'],
  yuki:  ['#E5D4D0', '#9B7A78'],
  aoi:   ['#B8C9A8', '#5E7A4F'],
  haru:  ['#E8C9C5', '#A77878'],
  shion: ['#C9B098', '#7A5E3E'],
}

// 直近7日のデータを静的に使う（本番はdynamic renderにする）
const DISPLAY_DATES = Array.from({ length: 7 }, (_, i) => {
  const d = new Date('2026-05-12')
  d.setDate(d.getDate() + i)
  return d.toISOString().slice(0, 10)
})

const DOW_JP = ['日', '月', '火', '水', '木', '金', '土']

export default function ShiftsPage() {
  return (
    <PageWrapper>
      <main>
        <div className="px-6 pt-10 pb-6 text-center">
          <span className="font-serif text-[11px] tracking-[4px] uppercase text-gold italic">Schedule</span>
          <div className="font-jp text-[22px] mt-3 tracking-[4px]">出勤スケジュール</div>
          <div className="mt-4"><BDivider /></div>
        </div>

        {/* Date tabs */}
        <div className="px-4 overflow-x-auto">
          <div className="flex gap-2 pb-1" style={{ width: 'max-content' }}>
            {DISPLAY_DATES.map((date, i) => {
              const d = new Date(date)
              const dow = DOW_JP[d.getDay()]
              const hasShift = shifts.some(s => s.date === date)
              return (
                <div
                  key={date}
                  className="flex-shrink-0 w-11 py-3 text-center border"
                  style={{
                    background: i === 0 ? 'var(--color-ink)' : 'transparent',
                    color: i === 0 ? '#fff' : 'var(--color-ink)',
                    borderColor: i === 0 ? 'var(--color-ink)' : 'var(--color-rule-gold)',
                    opacity: hasShift || i === 0 ? 1 : 0.5,
                  }}
                >
                  <div
                    className="font-serif text-[8px] tracking-[1.5px] italic"
                    style={{ color: i === 0 ? 'var(--color-gold)' : 'var(--color-ink-sub)' }}
                  >
                    {dow}
                  </div>
                  <div className="font-serif text-[20px] italic mt-1">{d.getDate()}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Today's therapists */}
        <div className="px-[22px] mt-6">
          <div className="text-center mb-4">
            <div className="font-serif text-[10px] tracking-[3px] text-gold italic">
              {DISPLAY_DATES[0].slice(5).replace('-', '/')} 出勤
            </div>
          </div>
          {(() => {
            const todayShifts = shifts.filter(s => s.date === DISPLAY_DATES[0])
            if (todayShifts.length === 0) {
              return (
                <div className="text-center py-10 font-serif text-[11px] text-ink-mute italic">
                  本日の出勤はありません
                </div>
              )
            }
            return todayShifts.map(s => {
              const t = therapists.find(th => th.id === s.therapistId)
              if (!t) return null
              const [from, to] = GRAD[t.id] ?? ['#C9A998', '#7A5E54']
              return (
                <Link key={s.id} href={`/players/${t.id}`} className="block no-underline">
                  <div className="flex gap-4 items-center py-4" style={{ borderBottom: '1px solid rgba(42,38,34,0.10)' }}>
                    <div className="w-[72px] flex-shrink-0 p-[3px] border border-rule-gold">
                      <div className="relative overflow-hidden" style={{ height: 90 }}>
                        {t.mainPhotoUrl ? (
                          <Image
                            src={t.mainPhotoUrl}
                            alt={t.name}
                            fill
                            sizes="72px"
                            className="object-cover"
                            style={{ objectPosition: t.photoPosition ?? '50% 30%' }}
                            loading="lazy"
                          />
                        ) : (
                          <div
                            className="absolute inset-0"
                            style={{ background: `linear-gradient(160deg, ${from} 0%, ${to} 100%)` }}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-serif text-[10px] tracking-[2px] text-gold italic">{t.romanName}</div>
                      <div className="font-jp text-[18px] mt-0.5">{t.name}</div>
                      <div className="text-[10px] text-ink-sub mt-1">{t.age}歳 ／ {t.height}cm</div>
                      <div className="font-serif text-[13px] italic text-gold-dk mt-1.5">
                        {s.startTime} 〜 {s.endTime}
                      </div>
                    </div>
                    <div className="font-serif text-[16px] italic text-gold">→</div>
                  </div>
                </Link>
              )
            })
          })()}
        </div>

        {/* Weekly overview */}
        <div className="px-[22px] pt-8 pb-4">
          <div className="text-center mb-5">
            <span className="font-serif text-[11px] tracking-[4px] uppercase text-gold italic">Weekly</span>
            <div className="font-jp text-base mt-2">今週の出勤一覧</div>
          </div>
          {therapists.map(t => {
            const myShifts = shifts.filter(s => s.therapistId === t.id && DISPLAY_DATES.includes(s.date))
            if (myShifts.length === 0) return null
            return (
              <div key={t.id} className="mb-4 p-4 bg-surface border border-rule-gold">
                <div className="flex items-center gap-3 mb-3">
                  <div className="font-serif text-[10px] tracking-[2px] text-gold italic">{t.romanName}</div>
                  <div className="font-jp text-[14px]">{t.name}</div>
                </div>
                <div className="flex flex-col gap-1.5">
                  {myShifts.map(s => {
                    const d = new Date(s.date)
                    return (
                      <div key={s.id} className="flex justify-between text-[11px]">
                        <span className="font-jp text-ink-sub">{s.date.slice(5).replace('-', '/')}（{DOW_JP[d.getDay()]}）</span>
                        <span className="font-serif italic text-gold-dk">{s.startTime}〜{s.endTime}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </PageWrapper>
  )
}
