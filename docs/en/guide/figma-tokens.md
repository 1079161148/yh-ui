# Figma and Tokens

YH-UI design assets should be token-centered. Figma represents design intent, CSS variables implement runtime behavior, and both stay aligned through naming and semantics.

## Token Layers

| Layer           | Example                           | Description                                                |
| --------------- | --------------------------------- | ---------------------------------------------------------- |
| Base token      | `blue-500`, `gray-100`            | Raw color scales, font sizes, spacing                      |
| Semantic token  | `color-primary`, `text-secondary` | Product meaning, not raw color references                  |
| Component token | `button-border-radius`            | Component-specific differences; keep the number controlled |
| Runtime token   | `--yh-color-primary`              | CSS variable consumed by applications                      |

## Naming Rules

- Use semantic names in Figma, such as `color/primary/default`.
- Use the `--yh-` prefix for CSS variables, such as `--yh-color-primary`.
- Use component namespaces for component tokens, such as `--yh-button-border-radius`.
- Avoid naming product meaning by visual output. Do not name a danger color `red-button`.

## Recommended Figma File Structure

For an open-source release, provide at least:

- Color styles: brand, semantic, text, border, and background colors.
- Text styles: headings, body text, auxiliary text, code font.
- Effect styles: base shadow, overlay shadow, focus ring.
- Component variants: size, type, state, disabled, loading, dark mode.
- Token reference page: token names, purposes, and code variables.

## Design-to-Code Flow

1. Design proposes a token change with business reason and impact scope.
2. Maintainers check whether an existing token can be reused.
3. Figma and code names are updated together.
4. Update `@yh-ui/theme`, docs, and demos.
5. Run light mode, dark mode, SSR, docs playground, and consumer smoke checks.

## Change Rules

- Adding a token is a minor change.
- Changing a token default is usually minor; if it affects visual compatibility, mark it in the changelog.
- Removing or renaming a public token is a breaking change and belongs in a major release.
- Internal component variables are not part of the compatibility contract. Only documented public variables are stable.

## Code Mapping

```css
:root {
  --yh-color-primary: #409eff;
  --yh-text-color-primary: #303133;
  --yh-border-color: #dcdfe6;
  --yh-radius-base: 4px;
}
```

## Delivery Checklist

- Figma tokens and CSS variable names are aligned.
- Every new token has semantic meaning and a default value.
- Dark mode has an explicit value or inheritance strategy.
- Documentation explains usage and caveats.
- Component tests or visual smoke cover key states.
