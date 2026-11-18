# 夏日泳池视觉素材

2026-11-18，按用户确认的第三版预览制作。插画使用内置 imagegen 生成；生产资产均存放在本目录，不依赖外部图片服务。现有内容和四个小游戏继续使用原生 HTML / CSS / JavaScript。

- `pool.webp`：透明背景油画棒泳池插画，1536×1024；只负责水面、池沿和梯子。小鹅为可独立动效的原生 SVG。
- `categories.webp`：透明背景的六格分类插画，3 列 × 2 行，通过 CSS 背景定位使用，无需六次请求。
- `life-hand.woff2`：基于 [霞鹜文楷 Light v1.530](https://github.com/lxgw/LxgwWenKai/releases/tag/v1.530) 生成的网站字符子集，衍生名称 Life Pool Hand。仅用于标题。正文使用同家族 Regular 字重的 `life-text.woff2`（衍生名称 Life Pool Text），保持手写气质与阅读清晰度。原作者及 SIL OFL 1.1 许可见 `OFL-WenKai.txt`。

更新标题后，可用原版 `LXGWWenKai-Light.ttf` 和 `fonttools[woff]` 重新生成字符子集：

```sh
python3 tools/build-hand-font.py /path/to/LXGWWenKai-Light.ttf
python3 tools/build-hand-font.py /path/to/LXGWWenKai-Regular.ttf --text
```

## 图片生成提示词

### 泳池

Create a production website illustration asset, NOT a website mockup, no typography, no UI, no letters. A large top-down summer swimming pool WATER shape in softly pigmented light swimming-pool blue, drawn with authentic hand-rubbed oil pastel on paper. Isolated on genuinely transparent background. Wide landscape canvas about 3:2. Water fills almost all of the canvas edge to edge on top/right/bottom; along LEFT edge an elegant concave organic curve leaves a transparent white-deck-sized inset covering leftmost 25% at middle. Overall silhouette is like an expansive asymmetrical swimming pool with rounded large corners, softly ragged pastel edges. Water color #add8ec with more intense patches #92c7e1, generous dry translucent grain and untouched-paper gaps; not photoreal. Just 4 long quiet white elliptical swimming-pool reflections and a delicate thin graphite pencil pool ladder at top center. The ladder subtle silver-gray, narrow rails. NO GOOSE, no animal, no person, no float, no towel, no sun, no flowers, no stars, no dots, no yellow or orange, no border frame or tiles, no text. Composition mostly flat aerial water textured subtly, clean and understated rather than dense or decorative. Calm independent illustrator sketchbook feeling. Color bright enough to make website hero visibly blue, but not highly saturated turquoise. Edges retain chalky oil pastel marks, no gradients or smooth vector fills.

### 分类小物件

Production website illustration asset: a sprite sheet of SIX SMALL SEPARATE oil pastel / colored-pencil drawings in a precise 3 column by 2 row grid, every cell equal square area and each subject centered with broad empty padding to cell edge. Entire canvas transparent with no background, no text, no labels, no grid lines. Consistent understated handmade summer sketchbook style, fine graphite outlines, small amounts of softly scumbled pastel pigment, light paper grain confined to the drawings, simple readable silhouettes. Row 1 left a kraft paper grocery bag with two green vegetables and one red tomato; row 1 middle one yellow-orange mango half with lightly cut cubes; row 1 right a plain white short-sleeve T shirt with blue pencil seams. Row 2 left a small pale sky-blue cooking saucepan with lid and long handle; row 2 middle one slim blue-tinted household spray bottle beside a folded white cloth; row 2 right a simple small light-blue storage box with white lid. Each object stands alone, no decorative marks, no sun, dots, sparkle, yellow lines, shadows, floor, frame, tile or sticker edges. Pastel blues and gray outlines predominate, natural colors only as needed for vegetables and mango. Restrained quiet human-drawn style, not cute vector cartoon, no bold outlines, no gradients. All six fit fully inside their respective cells and never overlap. 1536×1024 landscape canvas.

### 2026-11-18 入口图标统一

`game-icons.webp`：2×2 透明插画图集，四个图标统一占位、轮廓色与绘画质感；入口只取对应的一格。使用内置 imagegen 生成。

提示词：Create a cohesive production icon sprite sheet for a refined summer pool website. FOUR icons in an exact 2 by 2 grid on a transparent canvas. Each grid cell has identical dimensions and generous 20 percent clear padding around its icon. All four icons have the same visual weight, similar centered silhouette area, same restrained pale sky blue / slate pencil palette, and same fine oil pastel plus graphite-pencil hand drawn style. Small human drawn illustrations, light wax grain only within the objects, slightly uneven thin blue pencil contours. No text, no letters, no numbers, no arrows, no sparkles, dots or decorations. Top LEFT: three small orderly paper slips with simple horizontal marks and one checkmark, showing a step-ordering puzzle. Top RIGHT: a symmetric little balance scale with two empty shallow pans. Bottom LEFT: a magnifying glass resting diagonally across a simple plain white shirt, with one SMALL muted blue spot. Bottom RIGHT: a small open suitcase with two neatly folded pale blue clothes visible inside. Each icon fits well inside its own cell with no clipping or overlap, unified illustrator and line quality. Object proportions and final footprint must match across the four. No external shadows, ground planes, border frames, emoji style, 3D rendering, thick outlines, or polished vector graphics. Most colors very pale blue and paper white, outlines desaturated medium slate blue. Transparent background. Square canvas.
