# 判断記録

## 2026-05-12｜Phase 1 環境構築

### 技術スタック選定
- 仕様書通り Next.js 16 / React 19 / TypeScript 5 (strict) / Tailwind v4 / shadcn/ui v4 で構築
- shadcn/ui は `-d`（デフォルト）で初期化 → Base スタイル（Radix）が選択された
- `base-nova` の `--style` フラグは v4.7.0 で廃止されていたため `-d` フラグで代替。デザイントークンは globals.css の `@theme` ブロックで上書き済みのため実質問題なし

### デザイントークン
- Reverence（案B）のカラーパレットを `@theme inline` ブロックに定義
- shadcn のセマンティックカラーも Reverence トークンにマッピング済み
- `--radius: 0rem`（角丸なし）でホテル的なシャープなデザインを維持

### フォント
- Cormorant Garamond / Noto Serif JP / Noto Sans JP を `next/font/google` で読み込み
- CSS 変数 `--font-cormorant` / `--font-noto-serif` / `--font-noto-sans` として `@theme` に登録

### ダミーデータ
- デザインファイル（hp-remix/project/data.js）のデータをベースに JSON 化
- セラピスト6名、コース4種、口コミ5件、日記5件、シフト2週間分を用意

## 2026-05-12｜Phase 2〜3 ページ実装

### 共通レイアウト
- AgeGate / SiteHeader / FixedCta を `app/layout.tsx` に移動し、全ページで自動適用
- `PageWrapper` コンポーネントで max-width 430px・padding-bottom 60px を統一

### ハンバーガーメニュー
- shadcn/ui Sheet（Base UI ベース）を使用。Radix UI の `asChild` は使えないため `SheetClose` の `render` プロップで Link を渡す方式を採用
- メニュー項目にページリンクを設定済み（LINE予約・採用・お問い合わせは href="#" のまま）

### /shifts ページ
- 日付を `2026-05-12` にハードコード（ダミーデータ期間のため）
- イグチが Supabase 統合時に `new Date()` に変更し dynamic rendering にする

## 2026-05-12｜Phase 4 仕上げ

### next.config.ts
- `images.formats: ['image/webp']` で WebP 変換を有効化
- セキュリティヘッダ（X-Content-Type-Options / X-Frame-Options / Referrer-Policy）を追加
- Supabase Storage の remotePatterns は統合時にイグチが追加

### SEO
- 全ページに `title` + `description` を設定
- ルートレイアウトに OGP（og:title / og:description / og:type）を設定

## 2026-05-12｜仕様書 v2 への対応

### 主な変更点（v1 → v2）
- デザイン縛り撤廃（Reverence はそのまま継続・今回の選択として記録）
- 型定義・ダミーデータ・画像は相手側提供に変更 → 既作成のものを維持、store.json をプレースホルダー値に差し替え
- 法務ページ（/terms /system /access）を骨組みのみに変更し `LEGAL(handover):` マーカーを設置
- 必須ドキュメントに `docs/LEGAL_CHECKLIST.md` を追加
- Vercel は新規プロジェクト・環境変数なしで OK

### 対応内容
- `app/terms/page.tsx` / `app/system/page.tsx` / `app/access/page.tsx` を LEGAL マーカー方式に変更
- `lib/data/store.json` を全プレースホルダー値（`[STORE_NAME]` 等）に差し替え
- `docs/LEGAL_CHECKLIST.md` 作成

## 2026-05-13｜仕様書 v2.1 への対応

### 変更点
- `Shift` 型に `BookedSlot` 型と `bookedSlots: BookedSlot[]` フィールドを追加
- `shifts.json` に `bookedSlots` フィールドを追加（0〜2件のダミーデータ入り）
- `/shifts` ページにタイムラインバー（予約済み時間帯を灰色で塗り潰し）を追加
- `/diary` は低優先度のため現状維持（骨組み＋ダミーデータのまま）
- `/reviews` は既実装済みのため変更なし

## イグチへの確認
- 確認内容：なし（仕様書 v2.1 通りに対応）
