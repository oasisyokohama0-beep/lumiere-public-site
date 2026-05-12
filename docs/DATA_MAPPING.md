# データ参照マッピング

イグチがダミーデータ → Supabase に置換する際の必須ドキュメント。
各ページの `TODO(handover):` コメントとあわせて参照すること。

---

## app/page.tsx（TOP）

### 使用データ
- `lib/data/therapists.json` → 先頭4件
- `lib/data/events.json` → 全件（スライダー）
- `lib/data/news.json` → 全件
- `lib/data/reviews.json` → 先頭3件

### イグチが置換する際の注意
- therapists: `users(role='player') JOIN player_profiles WHERE is_active=true AND is_public=true LIMIT 4`
- events: `store_events WHERE end_date >= today OR end_date IS NULL ORDER BY start_date DESC`
- reviews: `reviews WHERE is_published=true ORDER BY posted_at DESC LIMIT 3`

---

## app/players/page.tsx（セラピスト一覧）

### 使用データ
- `lib/data/therapists.json` → 全件

### イグチが置換する際の注意
- `users(role='player') JOIN player_profiles WHERE is_active=true AND is_public=true ORDER BY sort_order`
- TODAYフィルタ: shifts テーブルで date=today の therapistId と JOIN
- NEWフィルタ: `player_profiles.is_new = true`

---

## app/players/[id]/page.tsx（セラピスト詳細）

### 使用データ
- `lib/data/therapists.json` → id で1件
- `lib/data/shifts.json` → therapistId でフィルタ、date >= today、最大7件
- `lib/data/reviews.json` → therapistId でフィルタ、先頭2件

### イグチが置換する際の注意
- therapist が見つからない場合は `notFound()` を呼ぶ（実装済み）
- シフトは date 昇順ソート済み
- dynamic rendering に変更が必要（日付が変わるため）

---

## app/system/page.tsx（料金）

### 使用データ
- `lib/data/courses.json` → 全件

### イグチが置換する際の注意
- `courses WHERE is_active=true ORDER BY duration_min`

---

## app/shifts/page.tsx（出勤スケジュール）

### 使用データ
- `lib/data/shifts.json` → 直近7日
- `lib/data/therapists.json` → 全件

### イグチが置換する際の注意
- 現在は `2026-05-12` をハードコード → `new Date()` に変更し dynamic rendering にする
- `shifts WHERE date BETWEEN today AND today+6 ORDER BY date, start_time`

---

## app/diary/page.tsx（写メ日記一覧）

### 使用データ
- `lib/data/diary.json` → 全件、postedAt 降順

### イグチが置換する際の注意
- `diary_posts WHERE is_published=true ORDER BY posted_at DESC`

---

## app/diary/[id]/page.tsx（写メ日記詳細）

### 使用データ
- `lib/data/diary.json` → id で1件

### イグチが置換する際の注意
- `diary_posts WHERE id = params.id AND is_published=true`

---

## app/ranking/page.tsx（ランキング）

### 使用データ
- `lib/data/ranking.json` → 全件
- `lib/data/therapists.json` → 写真取得用

### イグチが置換する際の注意
- `ranking_monthly WHERE month = current_month ORDER BY rank`
- 写真は therapist JOIN で取得

---

## app/reviews/page.tsx（口コミ）

### 使用データ
- `lib/data/reviews.json` → 全件、postedAt 降順

### イグチが置換する際の注意
- `reviews WHERE is_published=true ORDER BY posted_at DESC`

---

## app/access/page.tsx（アクセス）

### 使用データ
- ハードコード（店舗情報は store.json から取得に変更可能）

### イグチが置換する際の注意
- `store_info` テーブルから住所・営業時間を取得する形に変更

---

## app/terms/page.tsx（規約）

### 使用データ
- ハードコード（変更頻度が低いため）
