# Component Map

Use this map to choose real YH-UI components for common product tasks.

## Admin And Dashboard

| Scenario                   | Recommended components                                                    |
| -------------------------- | ------------------------------------------------------------------------- |
| Search/filter form         | `YhForm`, `YhFormItem`, `YhInput`, `YhSelect`, `YhDatePicker`, `YhButton` |
| Data table page            | `YhTable`, `YhPagination`, `YhTag`, `YhDropdown`, `YhMessage`             |
| Detail drawer              | `YhDrawer`, `YhDescriptions`, `YhButton`, `YhSpace`                       |
| Confirm destructive action | `YhPopconfirm`, `YhMessage`, `YhButton`                                   |
| Empty/error result         | `YhEmpty`, `YhResult`, `YhButton`                                         |
| Scrollable panel           | `YhScrollbar`, `YhBackTop`                                                |
| Image gallery              | `YhImage`, `YhImageViewer`, `YhCarousel`, `YhCarouselItem`                |

## Forms

| Scenario           | Recommended components                                                           |
| ------------------ | -------------------------------------------------------------------------------- |
| Standard form      | `YhForm`, `YhFormItem`, `YhInput`, `YhSelect`, `YhRadioGroup`, `YhCheckboxGroup` |
| Schema-driven form | `YhFormSchema`                                                                   |
| Upload form        | `YhUpload`, `YhForm`, `YhMessage`                                                |
| Numeric settings   | `YhInputNumber`, `YhSlider`, `YhSwitch`                                          |
| Tags or mentions   | `YhInputTag`, `YhMention`                                                        |

## AI Products

| Scenario          | Recommended components                              |
| ----------------- | --------------------------------------------------- |
| Chat surface      | `YhAiBubble`, `YhAiSender`, `YhAiProvider`          |
| Complete chat app | `YhAiChat`, `YhAiConversations`, `YhAiPrompts`      |
| Reasoning display | `YhAiThoughtChain`, `YhAiThinking`                  |
| Code response     | `YhAiCodeBlock`, `YhAiCodeEditor`, `YhAiCodeRunner` |
| Source citations  | `YhAiSources`, `YhAiArtifacts`, `YhAiAttachments`   |
| Message list      | `YhAiBubbleList`, `YhAiBubble`, `YhAiActionGroup`   |
| File response     | `YhAiFileCard`, `YhAiAttachments`                   |
| Prompt mention    | `YhAiMention`, `YhAiPrompts`                        |
| Mermaid diagram   | `YhAiMermaid`                                       |

## Ecommerce And Business

| Scenario            | Recommended components                                    |
| ------------------- | --------------------------------------------------------- |
| Product listing     | `YhProductCard`, `YhPrice`, `YhWaterfall`, `YhPagination` |
| SKU selection       | `YhSkuSelector` or `useSKU`                               |
| Coupons             | `YhCouponCard`                                            |
| Checkout footer     | `YhSubmitBar`                                             |
| Address parsing     | `YhSmartAddress`, `useAddressParser`                      |
| Category navigation | `YhCategoryNav`                                           |
| Product inspection  | `YhImageMagnifier`, `YhImage`                             |
| Promotion filter    | `YhFilterBar`, `YhLuckyDraw`                              |

## Workflow And Flow

| Scenario           | Recommended package/components                                 |
| ------------------ | -------------------------------------------------------------- |
| Flow canvas        | `@yh-ui/flow`: `Flow`, `Controls`, `Minimap`, `FlowBackground` |
| Custom node editor | `NodeEditPanel`, `EdgeEditPanel`, `NodeToolbar`, `NodeResizer` |
| BPMN sketch        | BPMN node exports from `@yh-ui/flow`                           |
| AI workflow        | AI workflow node exports from `@yh-ui/flow`                    |

## Icons, Theme, Locale

| Scenario                | Recommended package/components              |
| ----------------------- | ------------------------------------------- |
| Runtime Iconify icon    | `@yh-ui/icons/vue`: `Icon`                  |
| YH icon component       | `YhIcon`                                    |
| Theme switching         | `@yh-ui/theme`: `ThemePlugin`, `useTheme`   |
| Runtime locale boundary | `YhConfigProvider` + `@yh-ui/locale/lang/*` |
