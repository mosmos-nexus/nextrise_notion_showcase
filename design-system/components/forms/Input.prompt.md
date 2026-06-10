Single-line text / email field with label, helper text and validation states — the heart of the waitlist capture.

```jsx
<Input label="이메일" type="email" placeholder="you@example.com"
       helper="베타 오픈 소식을 가장 먼저 보내드릴게요." />
<Input status="error" helper="올바른 이메일 주소를 입력해 주세요." />
<Input status="success" helper="신청이 완료되었어요!" />
```

`status` (`default` | `error` | `success`) recolors the border and helper (Coral Red / Clean Green). Focus shows the Core Blue ring. Sizes `sm`/`md`/`lg`. Supports `leftIcon`.
