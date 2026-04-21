# 鍏煎鎬т笌鏀寔杈圭晫

鏈〉鐢ㄤ簬鏄庣‘ YH-UI 褰撳墠鍏紑鎵胯鐨勬敮鎸佽寖鍥达紝甯姪浣跨敤鑰呭湪鎺ュ叆鍓嶅揩閫熷垽鏂槸鍚﹀尮閰嶈嚜宸辩殑鎶€鏈爤銆?
## 杩愯鏃舵敮鎸佺煩闃?
| 椤圭洰 | 褰撳墠鏀寔 | 璇存槑 |
| --- | --- | --- |
| Vue | `>= 3.5.0` | 褰撳墠缁勪欢涓?Nuxt SSR 閫傞厤鍩轰簬 Vue 3.5 鐨?`useId` 绛夎兘鍔?|
| Node.js | `>= 18.12.0` | 鎺ㄨ崘浣跨敤褰撳墠 LTS 鐗堟湰 |
| pnpm | `>= 9` | 浠撳簱寮€鍙戜笌 CI 榛樿浣跨敤 pnpm 9 |
| Nuxt | `>= 3.11.0` 鎴?`^4.0.0-rc.1` | 閫氳繃 `@yh-ui/nuxt` 妯″潡鏀寔 |
| Vite | `6.x` 鍩虹嚎宸查獙璇?| 鏈粨搴?consumer smoke 宸茶鐩?Vite + Vue 鍦烘櫙 |

## 娴忚鍣ㄦ敮鎸?
YH-UI 浠呴潰鍚戠幇浠ｆ祻瑙堝櫒锛屼笉鏀寔 Internet Explorer銆?
| 娴忚鍣?| 鏈€浣庣増鏈?|
| --- | --- |
| Chrome | `>= 87` |
| Edge | `>= 88` |
| Firefox | `>= 78` |
| Safari | `>= 14` |

## SSR 鏀寔棰勬湡

### 鏄庣‘鏀寔

- 閫氳繃 `@yh-ui/nuxt` 鍦?Nuxt 3 / 4 涓娇鐢ㄧ粍浠惰嚜鍔ㄥ鍏ヤ笌鏍峰紡娉ㄥ叆
- 甯歌琛ㄥ崟銆佸睍绀恒€佸弽棣堛€佸鑸被缁勪欢鐨勬湇鍔＄娓叉煋
- 鍩轰簬绋冲畾 ID銆佽姹傜骇 z-index 鐘舵€侀殧绂荤殑 hydration 涓€鑷存€?- Vite + Vue 涓?Nuxt SSR 鐨?clean consumer smoke 鍦烘櫙

### 浣跨敤鏃堕渶瑕佹敞鎰?
- 娑夊強娴忚鍣ㄥ師鐢?API 鐨勮兘鍔涗細鍦?SSR 闃舵瀹夊叏闄嶇骇锛屽苟鍦ㄥ鎴风鎭㈠
- 鍔ㄧ敾銆佹祴閲忋€佹粴鍔ㄣ€佹嫋鎷姐€丆anvas 绛夊己浜や簰鑳藉姏锛岄灞?SSR 涓庢按鍚堝悗涓€鑷存€у凡灏介噺淇濊瘉锛屼絾浠嶅缓璁湪涓氬姟渚ч伩鍏嶅湪 `setup` 涓洿鎺ヨ闂?`window`銆乣document` 鎴栧竷灞€灏哄
- `flow`銆佸鏉傚彲瑙嗗寲銆佸湪绾跨紪杈戝櫒绫昏兘鍔涙洿閫傚悎浣滀负涓撻」鑳藉姏璇勪及锛岃€屼笉鏄粯璁?SSR 棣栨壒鎺ュ叆瀵硅薄

### 涓嶅仛鎵胯鐨勮寖鍥?
- Internet Explorer 鍏煎
- Vue 3.5 浠ヤ笅鐗堟湰
- Node 18 浠ヤ笅鐗堟湰
- 鏈粡杩囨枃妗ｃ€佹祴璇曟垨 consumer smoke 楠岃瘉鐨勭涓夋柟鏋勫缓閾惧畾鍒跺満鏅?
## 寮€婧愮ǔ瀹氭€ц鏄?
褰撳墠浠撳簱宸茬粡鍏峰浠ヤ笅绋冲畾鎬у熀绾匡細

- `pnpm typecheck`
- `pnpm lint`
- `pnpm test:ci`
- `pnpm test:coverage`
- `pnpm test:perf`
- `pnpm build`
- `pnpm docs:build`
- `pnpm verify:consumer-smoke`

杩欐剰鍛崇潃椤圭洰宸茬粡閫傚悎鍏紑 `0.x / beta / rc` 绾у埆鍙戝竷锛涜嫢瑕佸绉扳€滅ǔ瀹氱増鈥濓紝浠嶄互浠撳簱鏍圭洰褰曠殑 `STABLE_RELEASE_BLOCKERS.md` 涓烘渶缁堟敹鍙ｆ爣鍑嗐€?
## 鍖呬綋绉熀绾?
棣栦唤鍖呬綋绉熀绾胯褰曡 [PACKAGE_SIZE_BASELINE.md](https://github.com/1079161148/yh-ui/blob/main/PACKAGE_SIZE_BASELINE.md)銆?
寤鸿鍦ㄤ互涓嬫儏鍐甸噸鏂拌褰曪細

- 寮曞叆澶у瀷渚濊禆
- 鏂板鏁村缁勪欢鏃?- 鍙戝竷鍓嶅嚭鐜版槑鏄炬瀯寤轰綋绉闀?
