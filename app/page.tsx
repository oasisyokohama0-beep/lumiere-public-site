import Link from 'next/link'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { BDivider } from '@/components/common/BDivider'
import { EventSlider } from '@/components/common/EventSlider'
import { CastCard } from '@/components/players/CastCard'
import therapistsData from '@/lib/data/therapists.json'
import eventsData from '@/lib/data/events.json'
import newsData from '@/lib/data/news.json'
import reviewsData from '@/lib/data/reviews.json'
import type { Therapist, StoreEvent, Review } from '@/lib/types'

// TODO(handover): ダミーデータを Supabase クエリに置換
const therapists = therapistsData as Therapist[]
const events = eventsData as StoreEvent[]
const reviews = reviewsData as Review[]

export default function TopPage() {
  return (
    <PageWrapper>
      <main>
        {/* ── ヒーローバナー ── */}
        <div className="mx-4 mt-[18px]">
          <div
            className="relative h-[188px] overflow-hidden border border-rule-gold"
            style={{ background: '#2A2622 url(/images/cast-ren.jpg) 50% 28% / cover no-repeat' }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, rgba(42,38,34,0.7) 0%, rgba(42,38,34,0.2) 50%, rgba(42,38,34,0.55) 100%)' }}
            />
            <div className="absolute inset-2 border border-[rgba(231,207,166,0.5)] pointer-events-none" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-[18px]">
              <div className="font-serif text-[10px] tracking-[4px] text-[#E7CFA6] italic">est. 2024  ・  tokyo</div>
              <div className="w-6 h-px bg-[#E7CFA6] my-2.5 opacity-70" />
              <div className="font-serif text-[38px] tracking-[8px] text-white uppercase">Lumière</div>
              <div className="font-jp text-[11px] tracking-[6px] text-[#E7CFA6] mt-1">ルミエール</div>
              <div className="w-6 h-px bg-[#E7CFA6] my-2.5 opacity-70" />
              <div className="font-jp text-[10px] text-white/85 tracking-[2px]">銀座 ・ 新宿 ・ 渋谷</div>
            </div>
          </div>
        </div>

        {/* ── イベントスライダー ── */}
        <section className="mx-4 mt-5" aria-label="イベント・キャンペーン">
          <div className="flex items-baseline justify-between px-1 pb-3">
            <span className="font-serif text-[11px] tracking-[4px] uppercase text-gold italic">Events</span>
            <Link
              href="/events"
              className="font-serif text-[10px] tracking-[2px] text-ink-sub italic no-underline hover:text-gold"
            >
              view all →
            </Link>
          </div>
          {/* TOP は EventSlider 用に先頭3件のみ表示（一覧は /events） */}
          <EventSlider events={events.slice(0, 3)} />
        </section>

        {/* ── 在籍セラピスト ── */}
        <section aria-label="在籍セラピスト">
          <div className="px-6 pt-9 pb-4 text-center">
            <span className="font-serif text-[11px] tracking-[4px] uppercase text-gold italic">Our Therapists</span>
            <div className="font-jp text-[18px] mt-2.5">在籍セラピスト</div>
            <div className="mt-3.5"><BDivider /></div>
          </div>
          <div className="px-[22px] grid grid-cols-2 gap-3.5">
            {/* TODO(handover): テーブル: users(role='player') + player_profiles */}
            {therapists.slice(0, 4).map(t => (
              <CastCard key={t.id} therapist={t} />
            ))}
          </div>
          <div className="px-[22px] pt-[18px] text-center font-serif text-[11px] tracking-[2.5px] text-gold italic">
            view all therapists →
          </div>
        </section>

        {/* ── お知らせ ── */}
        <section className="px-[30px] pt-10 text-center" aria-label="お知らせ">
          <span className="font-serif text-[11px] tracking-[4px] uppercase text-gold italic">Information</span>
          <div className="font-jp text-base mt-2">お知らせ</div>
          <div className="mt-[18px]">
            {/* TODO(handover): テーブル: news または store_events */}
            {newsData.map((n, i) => (
              <div
                key={n.id}
                className="py-4"
                style={{ borderBottom: i < newsData.length - 1 ? '1px solid rgba(42,38,34,0.10)' : 'none' }}
              >
                <div className="font-serif text-[11px] tracking-[2px] text-gold italic">{n.date} ・ {n.tag}</div>
                <div className="font-jp text-[12.5px] mt-1.5">{n.text}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 口コミ ── */}
        <section className="px-[22px] pt-10 pb-6" aria-label="お客様の声">
          <div className="text-center">
            <span className="font-serif text-[11px] tracking-[4px] uppercase text-gold italic">Voice</span>
            <div className="font-jp text-base mt-2">お客様の声</div>
          </div>
          <div className="mt-5 flex flex-col gap-3.5">
            {/* TODO(handover): テーブル: reviews */}
            {reviews.slice(0, 3).map(r => (
              <div key={r.id} className="bg-surface border border-rule-gold p-[18px]">
                <div className="flex items-center justify-between">
                  <div className="font-serif text-[18px] italic text-gold leading-none">&ldquo;</div>
                  {r.therapistName && (
                    <div className="font-serif text-[9px] tracking-[2px] text-gold italic">{r.therapistName}</div>
                  )}
                </div>
                <div className="font-jp text-[12.5px] leading-loose mt-1">{r.content}</div>
                <div className="font-serif text-[10px] tracking-[1.5px] italic text-ink-sub mt-3">— {r.authorName}</div>
              </div>
            ))}
          </div>

          {/* CTA: 口コミを投稿する */}
          <div className="mt-5 flex flex-col items-center gap-2.5">
            <Link
              href="/reviews/new"
              className="inline-block px-7 py-3 border border-gold text-gold font-serif tracking-[2.5px] text-[11px] italic no-underline"
            >
              POST A REVIEW
            </Link>
            <Link
              href="/reviews"
              className="font-serif text-[10px] tracking-[2px] text-ink-sub italic no-underline"
            >
              view all reviews →
            </Link>
          </div>
        </section>

        {/* ── 予約ブロック ── */}
        <div className="px-[22px] pb-[30px]">
          <div className="bg-ink text-white px-6 py-7 text-center">
            <div className="font-serif text-[10px] tracking-[4px] text-gold italic">RESERVATIONS</div>
            <div className="font-jp text-base mt-3.5 leading-relaxed">ご予約・ご相談はこちら</div>
            <div className="w-[30px] h-px bg-gold mx-auto my-[18px]" />
            <div className="flex gap-2.5 justify-center">
              <button className="flex-1 max-w-[130px] py-3 border border-gold text-gold font-serif tracking-[2px] text-[11px]">LINE</button>
              <button className="flex-1 max-w-[130px] py-3 border border-gold text-gold font-serif tracking-[2px] text-[11px]">FORM</button>
            </div>
          </div>
        </div>
      </main>
    </PageWrapper>
  )
}
