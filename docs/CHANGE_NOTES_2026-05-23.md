# 変更ノート 2026-05-23

## 概要

仕様書 v2.3 改訂（M / N / O / P 4 セクション追加）への対応納品。
公開後の運用検証で見つかった不足を補う 4 件をまとめて実装。

- M: `/events` 一覧ページ新規追加
- N: `/reviews/new` 口コミ投稿フォーム新規追加（honeypot + クライアントレート制限 + Server Action no-op）
- O: 修正納品時のドキュメント要件（本ファイルそのものが運用ルールの初回成果物）
- P: 写メ日記（`/diary`・`/diary/[id]`）の表示 UI 完成

## 接合部影響

- [x] **新規ページ追加**：
  - `/events` … TOP の Events スライダー「view all →」から遷移
  - `/reviews/new` … `/reviews` および TOP Voice セクションから遷移
- [x] **新規データ取得**：
  - `getStoreEvents`（store_events / is_active=true / start_date DESC, sort_order ASC）— `/events`
  - `getDiaryPosts`（diary_posts + diary_images / is_published=true / posted_at DESC）— `/diary`、`/diary/[id]`
  - `getPublicPlayers`（既存）— `/reviews/new` のセラピスト選択 UI
  - `createReview`（reviews INSERT / is_approved=false / posted_at=now()）— `/reviews/new` の Server Action
- [ ] 新規環境変数：なし（レート制限はクライアント localStorage で実装、Server Action は no-op スタブ）
- [ ] 新規型定義：なし（既存 `StoreEvent` / `DiaryPost` / `DiaryImage` / `Therapist` / `Review` を流用）
- [ ] LEGAL マーカー変更：なし（v2.3 追加機能は LEGAL 領域に該当なし）
- [ ] 新規 JSON ファイル：なし（既存 `events.json` / `diary.json` に追記のみ）

## 変更ファイル一覧

### 新規

- `app/events/page.tsx`
- `app/reviews/new/page.tsx`
- `app/reviews/new/ReviewForm.tsx` （Client Component）
- `app/reviews/new/actions.ts` （Server Action no-op スタブ）
- `docs/CHANGE_NOTES_2026-05-23.md` （本ファイル）

### 修正

- `app/page.tsx`
  - `Link` import 追加
  - Events セクションの "view all →" を `<span>` → `<Link href="/events">` に変更
  - EventSlider に渡すイベントを `events.slice(0, 3)`（TOP は先頭3件のみスライダー表示、全件は /events で）
  - Voice セクションに「POST A REVIEW」CTA と「view all reviews →」リンク追加
- `app/reviews/page.tsx`
  - `Link` import 追加
  - 一覧上部に「POST A REVIEW」CTA ボタン追加
- `app/diary/page.tsx`
  - サムネ画像付きの 2 列カードグリッドに刷新
  - 投稿日 / セラピスト名 / タイトル / 本文抜粋（80文字）表示
  - 空状態「現在投稿はありません」追加
- `app/diary/[id]/page.tsx`
  - 画像ギャラリー（1枚→単体、複数枚→横スクロール snap）追加
  - セラピスト紹介ページ（`/players/[player_id]`）へのリンク追加
  - 前後の投稿ナビゲーション（NEWER / OLDER）追加
- `lib/data/events.json` … 3件 → 7件に拡充（仕様書 v2.3「6件以上」基準を満たす）
- `lib/data/diary.json` … 5件 → 7件に拡充、全件に画像（既存 cast-*.{jpg,png} を流用）と本文加筆

## つばさ側の取り込み手順

1. **新規ページ 2 件をルートに組み込む**
   `app/(public)/[store_code]/events/page.tsx` と `app/(public)/[store_code]/reviews/new/page.tsx`
   として既存 SaaS に配置。本リポジトリの page.tsx をベースに、`TODO(handover):` 箇所を
   `lib/hp/queries.ts` の関数呼び出しに差し替える。
2. **`createReview` Server Action の本実装**
   `app/reviews/new/actions.ts` の `submitReview` 内の `TODO(handover):` コメント以下を
   Supabase クライアントによる INSERT に差し替える。
   - `store_id`：`params.store_code` から解決
   - `is_approved`：false 固定
   - `posted_at`：`now()`
   - honeypot ヒット時のダミー成功扱い（バリデーション・INSERT スキップ）と
     クライアント側 localStorage によるレート制限は、現状フロント側のみ。
     **サーバ側で同一 IP 5 分間 1 件のレート制限を必ず追加する**（Vercel KV or Upstash 推奨）。
3. **`getDiaryPosts` の関連 JOIN**
   `/diary` 一覧では先頭画像 1 枚のみ、`/diary/[id]` では sort_order ASC で全画像を取得する点に注意。
   関数を 2 つ用意するか、1 つの関数で limit パラメータ化するかは任せる。
4. **`/events` の TOP リンク先**
   `app/page.tsx` の `<Link href="/events">` は store_code 配下では
   `<Link href={`/${storeCode}/events`}>` に書き換えが必要。

## 関連する依頼内容

- 依頼元：つばさ（運営兼イグチ統合担当）
- 依頼日：2026-05-23
- 依頼内容：公開後の運用検証で不足が見つかったため M / N / O / P の 4 件を仕様書 v2.3 改訂として追加実装
