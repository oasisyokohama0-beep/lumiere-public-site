# 法務・店舗情報 TODO リスト

統合時にイグチが処理する項目を集約。
**本番公開前に全項目を消化すること。**

---

## 法務テキスト

- [ ] `/terms` — 利用規約本文（オーナー or 弁護士監修）
- [ ] `/terms` — キャンセルポリシー本文
- [ ] `/terms` — プライバシーポリシー本文
- [ ] `/terms` — 最終更新日
- [ ] `/system` — オプション料金表（実際の金額・項目）
- [ ] `/system` — ご利用ルール・キャンセル規定
- [ ] `/system` — 特定商取引法の表示要否の確認

## 店舗基本情報

- [ ] `/access` — 営業エリア・アクセス情報
- [ ] `/access` — 営業時間（`[STORE_BUSINESS_HOURS]`）
- [ ] `/access` — 電話番号（`[STORE_PHONE]`）
- [ ] `/access` — LINE URL/ID（`[STORE_LINE_URL]`）
- [ ] `/access` — 定休日（`[STORE_CLOSED_DAYS]`）
- [ ] `store.json` — 全プレースホルダーを実値に差し替え
- [ ] `components/layout/SiteHeader.tsx` — LINE・TEL ボタンに実 URL 設定
- [ ] `components/layout/FixedCta.tsx` — LINE・TEL の href に実 URL 設定

## 動作確認

- [ ] 18禁モーダル「いいえ」→ Yahoo! Japan にリダイレクト
- [ ] 18禁モーダル「はい」→ 30日間 localStorage フラグ保持
- [ ] LINE ボタンが実際のアカウントにつながること
- [ ] 電話番号が正しいこと

---

*`LEGAL(handover):` コメントが差し込み箇所のマーカー。コード内を検索して全て対応すること。*
