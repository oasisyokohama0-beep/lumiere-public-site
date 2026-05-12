import type { Metadata } from 'next'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { BDivider } from '@/components/common/BDivider'

export const metadata: Metadata = {
  title: 'アクセス',
  description: 'アクセス情報。完全予約制。',
}

export default function AccessPage() {
  return (
    <PageWrapper>
      <main>
        <div className="px-6 pt-10 pb-6 text-center">
          <span className="font-serif text-[11px] tracking-[4px] uppercase text-gold italic">Access</span>
          <div className="font-jp text-[22px] mt-3 tracking-[4px]">アクセス</div>
          <div className="mt-4"><BDivider /></div>
          <div className="font-jp text-[11px] text-ink-sub mt-4 leading-loose">
            完全予約制です。ご予約確定後に詳細な場所をお知らせします。
          </div>
        </div>

        {/* エリア情報 */}
        <div className="px-[22px] flex flex-col gap-4 pb-8">
          {/* LEGAL(handover): エリア・アクセス情報
              担当：イグチ（実際の営業エリアを差し込み。公開 OK な範囲で記載すること） */}
          <div className="font-jp text-[12.5px] leading-[2] text-ink-sub bg-cream border border-rule-gold p-5 text-center">
            <div className="font-serif text-[10px] tracking-[2px] text-gold italic mb-2">LEGAL(handover)</div>
            ここに営業エリア・アクセス情報を差し込みます
          </div>
        </div>

        {/* 店舗情報テーブル */}
        <div className="px-[22px] pb-8">
          <div className="text-center mb-5">
            <span className="font-serif text-[11px] tracking-[4px] uppercase text-gold italic">Information</span>
          </div>

          {/* LEGAL(handover): 店舗基本情報（営業時間・電話・LINE等）
              担当：イグチ（store.json のプレースホルダーを実際の値に差し替え） */}
          <div className="bg-surface border border-rule-gold divide-y divide-rule">
            {[
              ['営業時間', '[STORE_BUSINESS_HOURS]'],
              ['電話',     '[STORE_PHONE]'],
              ['LINE',     '[STORE_LINE_URL]'],
              ['定休日',   '[STORE_CLOSED_DAYS]'],
            ].map(([k, v]) => (
              <div key={k} className="flex py-4 px-4 gap-4">
                <div className="w-16 flex-shrink-0 font-serif text-[10px] tracking-[1.5px] italic text-gold">{k}</div>
                <div className="font-jp text-[12.5px] text-ink-sub leading-relaxed">{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="px-[22px] pb-8">
          <div className="bg-ink text-white px-6 py-6 text-center">
            <div className="font-serif text-[10px] tracking-[4px] text-gold italic">RESERVATIONS</div>
            <div className="font-jp text-sm mt-3 leading-relaxed">ご予約・お問い合わせはこちら</div>
            <div className="w-7 h-px bg-gold mx-auto my-4" />
            <div className="flex gap-2.5 justify-center">
              <button className="flex-1 max-w-[130px] py-3 border border-gold text-gold font-serif tracking-[2px] text-[11px]">LINE</button>
              <button className="flex-1 max-w-[130px] py-3 border border-gold text-gold font-serif tracking-[2px] text-[11px]">TEL</button>
            </div>
          </div>
        </div>
      </main>
    </PageWrapper>
  )
}
