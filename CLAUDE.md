# Ticket System — CLAUDE.md

Sistema de gerenciamento de tickets de suporte ao cliente, construído em Next.js com design moderno.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Runtime**: React 19
- **Linguagem**: TypeScript 5.7
- **Estilo**: Tailwind CSS v4 + `tw-animate-css`
- **Componentes UI**: `@base-ui/react` (base headless) + shadcn/ui patterns
- **Package manager**: pnpm 10.9
- **Deploy**: Vercel (tem `@vercel/analytics` instalado)

## Estrutura do projeto

```
app/
  layout.tsx           # Root layout com metadados e fonts (Geist)
  page.tsx             # Rota raiz → renderiza <TicketsPage />
  dashboard/           # Página de dashboard com stats
  analytics/           # Stub — Em desenvolvimento
  automations/         # Stub — Em desenvolvimento
  notifications/       # Stub — Em desenvolvimento
  settings/            # Stub — Em desenvolvimento
  integrations/        # Stub — Em desenvolvimento
  documents/           # Stub — Em desenvolvimento
  extensions/          # Stub — Em desenvolvimento
  team/                # Stub — Em desenvolvimento

components/
  tickets-page.tsx     # Orquestrador principal — detém TODO o estado de tickets
  tickets-table.tsx    # Tabela com filtros de header, paginação (UI only)
  ticket-row.tsx       # Linha individual da tabela
  ticket-filters.tsx   # Barra de busca + botão "Novo Ticket"
  ticket-details.tsx   # Painel lateral de detalhes — campos EDITÁVEIS
  ticket-badges.tsx    # StatusBadge + PriorityFlag
  ticket-summary.tsx   # Seção de "Resumo da IA" com checkboxes
  ticket-timeline.tsx  # Linha do tempo de eventos do ticket
  sidebar.tsx          # Sidebar completa: nav rail + filtros por view/categoria/prioridade
  new-ticket-dialog.tsx # Sheet para criar novo ticket (formulário)
  stub-page.tsx        # Layout compartilhado para páginas em desenvolvimento
  ui/                  # Componentes base (button, input, sheet, dropdown-menu, etc.)

lib/
  tickets-data.ts      # Tipos TypeScript + dados iniciais de tickets (mock)
  utils.ts             # cn() helper

hooks/
  use-media-query.ts   # Hook para responsive breakpoints
```

## CRUD de tickets

**Tudo é state em memória** — não há backend ou banco de dados.

- **Estado**: `useState<Ticket[]>` em `tickets-page.tsx`
- **Create**: botão `+` no header da tabela → abre `NewTicketDialog` (Sheet)
- **Read**: lista filtrada por view/status + busca por título/código
- **Update**: painel lateral (`ticket-details.tsx`) — edita título (input), status (dropdown no badge), prioridade, categoria, responsável; salva via "Atualizar ticket"
- **Delete**: menu `⋯` no painel lateral → "Excluir ticket"

## Componentes UI

Todos são baseados em `@base-ui/react`. O padrão de render prop é:

```tsx
<DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
  <MoreHorizontal />
</DropdownMenuTrigger>
```

**Componentes disponíveis em `components/ui/`**:
- `button.tsx` — usa `@base-ui/react/button`, suporta prop `render`
- `input.tsx`
- `sheet.tsx` — drawer lateral (usa `@base-ui/react/dialog`)
- `dropdown-menu.tsx` — usa `@base-ui/react/menu`
- `tooltip.tsx` — usa `@base-ui/react/tooltip`
- `checkbox.tsx`, `badge.tsx`, `avatar.tsx`, `card.tsx`
- `scroll-area.tsx`, `separator.tsx`, `progress.tsx`, `table.tsx`

## Navegação

- Sidebar tem icon rail com Links do Next.js para 8 seções
- `usePathname()` determina o ícone ativo
- Stub pages compartilham `<StubPage>` que replica o icon rail

## Convenções

- `"use client"` em todos os componentes interativos
- Sem backend — dados vivem em `lib/tickets-data.ts` e em `useState`
- Idioma da UI: **Português Brasileiro** (labels, tooltips, mensagens)
- Datas no formato inglês abreviado: `Jun 01, 2026`
- Avatares estão em `/public/avatar-*.png`

## Comandos

```bash
pnpm dev      # Desenvolvimento (Turbopack)
pnpm build    # Build de produção
pnpm start    # Servidor de produção
pnpm lint     # ESLint
```

## Melhorias sugeridas (próximos passos)

1. **Backend/Persistência**: substituir state local por banco (ex: Supabase, PlanetScale + Prisma) com API Routes Next.js
2. **Autenticação**: NextAuth.js ou Clerk para login/sessão
3. **Filtro por categoria/prioridade**: já há botões no sidebar mas lógica de filtro ainda usa só status e busca textual
4. **Paginação real**: hoje é UI estática — implementar paginação com slice() ou server-side
5. **Comentários**: adicionar sistema de comentários no timeline dos tickets
6. **Notificações em tempo real**: WebSockets ou SSE para alertas ao vivo
7. **Dashboard com gráficos**: integrar Recharts/Chart.js na página `/dashboard`
8. **Busca avançada**: filtros combinados por categoria + prioridade + data + assignee
9. **Export**: exportar tickets para CSV/PDF
10. **Dark mode**: CSS vars já estão configuradas, falta toggle de tema
