Soft, rounded container — the landing page's feature block and general surface.

```jsx
<Card icon={<Icon/>} accent="purple" title="말만 하세요"
      description="목표만 알려주면 Mos가 알아서 결과를 가져옵니다." interactive />
<Card elevation="e2"><CustomContent/></Card>
```

Feature mode: pass `icon` + `title` + `description`. `accent` (`blue`/`purple`/`cyan`) tints the icon tile. `interactive` lifts on hover. radius lg(16), e1 shadow by default.
