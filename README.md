# React Router Clean Architecture サンプル

このプロジェクトは、React RouterとClean Architectureを組み合わせた実装サンプルです。
ユーザー管理機能を例に、Clean Architectureの原則に従ったフロントエンドアプリケーションの構築方法を示しています。

## 技術スタック

- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Vite](https://vitejs.dev/)

## アーキテクチャ

このプロジェクトはClean Architectureの原則に従って構築されています：

```
app/
├── application/          # ユースケース層
├── domain/              # ドメインモデル、インターフェース
├── infrastructure/      # 外部サービスとの連携
├── routes/              # ルーティングとページコンポーネント
└── ui/                  # 共通UIコンポーネント
```

### レイヤー構成

- **Domain Layer**: ビジネスロジックの中心。モデル、リポジトリインターフェース、ドメインサービスを含む
- **Application Layer**: ユースケースの実装。ドメインロジックを組み合わせてユースケースを実現
- **Infrastructure Layer**: 外部サービスとの連携実装（データベース、API等）
- **UI Layer**: プレゼンテーション層。ルーティングとReactコンポーネント

## セットアップ

### 必要条件

- Node.js 18以上
- pnpm

### インストール

```bash
# 依存関係のインストール
pnpm install

# データベースのセットアップ
docker compose up -d
pnpm db:reset
pnpm db:seed

# 開発サーバーの起動
pnpm dev
```

## 開発

### 利用可能なスクリプト

- `pnpm dev` - 開発サーバーの起動
- `pnpm build` - プロダクションビルド
- `pnpm test` - テストの実行
- `pnpm db:reset` - データベースのリセット
- `pnpm db:seed` - テストデータの投入

### ディレクトリ構造

```
app/
├── application/
│   └── use_case/       # アプリケーションのユースケース
├── domain/
│   ├── model/          # ドメインモデル
│   ├── repository/     # リポジトリインターフェース
│   └── service/        # ドメインサービス
├── infrastructure/
│   ├── db/             # データベース関連
│   ├── gateway/        # 外部システム連携
│   ├── repository/     # リポジトリ実装
│   └── service/        # インフラサービス実装
├── routes/             # ルーティングとページ
└── ui/                 # 共通UIコンポーネント
```

## 機能

- ユーザー管理
  - ユーザー一覧表示
  - ユーザー詳細表示
  - ユーザー作成
  - ユーザー情報更新
- ポイント計算システム
- 外部システム連携

## ライセンス

MIT
