Primary action control — use the `primary` variant for the one clear CTA per section, `outline`/`ghost` for secondary actions.

```jsx
<Button variant="primary" size="lg">사전신청하기</Button>
<Button variant="outline">더 알아보기</Button>
<Button variant="secondary" pill rightIcon={<Arrow/>}>Mos 만나기</Button>
```

Variants: `primary` (Core Blue), `secondary` (Pop Purple), `outline` (bordered), `ghost` (text-only). Sizes: `sm` 36 / `md` 44 / `lg` 52. Props: `fullWidth`, `pill`, `disabled` (40% opacity), `leftIcon`, `rightIcon`. Hover darkens ~8%; focus shows the Core Blue ring.
