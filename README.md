# photographer-saya

東京・横浜で活動するフォトグラファーsayaのポートフォリオサイト

## 🌐 サイトURL

**https://photographer-saya.com**

## 🛠 技術スタック

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **UI Components**: Radix UI + shadcn/ui
- **Hosting**: Cloudflare Pages

## 📦 セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build
```

## 🚀 Cloudflare Pagesへのデプロイ

### 方法1: GitHubリポジトリ連携（推奨）

1. **Cloudflareダッシュボードにログイン**
   - https://dash.cloudflare.com にアクセス
   - 「Workers & Pages」→「Create」→「Pages」を選択

2. **GitHubリポジトリを接続**
   - 「Connect to Git」を選択
   - GitHubアカウントを連携し、このリポジトリを選択

3. **ビルド設定**
   ```
   プロジェクト名: photographer-saya
   プロダクションブランチ: main
   フレームワークプリセット: Next.js (Static HTML Export)
   ビルドコマンド: npm run build
   ビルド出力ディレクトリ: out
   ```

4. **環境変数（必要に応じて）**
   ```
   NODE_VERSION: 20
   ```

5. **「Save and Deploy」をクリック**

### 方法2: Wrangler CLIを使用

```bash
# Wranglerのインストール
npm install -g wrangler

# Cloudflareにログイン
wrangler login

# ビルド
npm run build

# デプロイ
wrangler pages deploy out --project-name=photographer-saya
```

### カスタムドメイン設定（photographer-saya.com）

1. **Cloudflare Pagesダッシュボードで設定**
   - プロジェクト「photographer-saya」を選択
   - 「Custom domains」タブを開く
   - 「Set up a custom domain」をクリック

2. **ドメインを追加**
   ```
   photographer-saya.com
   ```

3. **DNS設定**
   - ドメインがCloudflareで管理されている場合は自動設定
   - 外部DNSの場合は以下のCNAMEレコードを追加：
   ```
   Type: CNAME
   Name: @ (または photographer-saya.com)
   Target: photographer-saya.pages.dev
   Proxy: ON (オレンジ色の雲)
   ```

4. **www サブドメインのリダイレクト**
   ```
   Type: CNAME
   Name: www
   Target: photographer-saya.pages.dev
   Proxy: ON
   ```
   ※ `_redirects` ファイルで www → non-www へのリダイレクトが設定済み

### SSL証明書

Cloudflare Pagesは自動的にSSL証明書を発行・管理します。
カスタムドメイン追加後、数分〜数時間でHTTPSが有効になります。

## 📁 プロジェクト構成

```
photographer-saya/
├── app/                    # Next.js App Router
│   ├── globals.css        # グローバルスタイル
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # トップページ
├── components/            # Reactコンポーネント
│   ├── ui/               # shadcn/uiコンポーネント
│   ├── Hero.tsx          # ヒーローセクション
│   ├── Gallery.tsx       # ギャラリー
│   ├── About.tsx         # About
│   └── Contact.tsx       # お問い合わせ
├── public/               # 静的ファイル
│   ├── _headers          # Cloudflare Pagesヘッダー設定
│   └── _redirects        # リダイレクト設定
├── lib/                  # ユーティリティ
├── out/                  # ビルド出力（.gitignore）
├── wrangler.toml         # Cloudflare設定
└── next.config.ts        # Next.js設定
```

## 📝 ライセンス

All Rights Reserved © saya

