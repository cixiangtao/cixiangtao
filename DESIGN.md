---
name: cixiangtao 彩色个人工作台
description: 一台以写作为主屏、以项目和作者身份为辅助窗口的中文个人桌面。
colors:
  desktop: "#6670c9"
  desktop-dot: "#5962b1"
  paper: "#fffefa"
  paper-soft: "#efeee8"
  ink: "#17171b"
  muted: "#5a5b64"
  line: "rgb(23 23 27 / 22%)"
  line-strong: "rgb(23 23 27 / 48%)"
  selection: "#3156d9"
  accent-blue-dark: "#2442b6"
  accent-cyan: "#43dce6"
  accent-yellow: "#ffda45"
  accent-coral: "#ff705e"
typography:
  display:
    fontFamily: "Geneva, Verdana, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(2.35rem, 7vw, 5.2rem)"
    fontWeight: 950
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geneva, Verdana, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(1.55rem, 3vw, 2.25rem)"
    fontWeight: 900
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Geneva, Verdana, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(1rem, 1.6vw, 1.08rem)"
    fontWeight: 400
    lineHeight: 1.9
  title:
    fontFamily: "Monaco, SFMono-Regular, Consolas, monospace"
    fontSize: "0.68rem"
    fontWeight: 900
    lineHeight: 1
  label:
    fontFamily: "Monaco, SFMono-Regular, Consolas, monospace"
    fontSize: "0.68rem"
    fontWeight: 800
    lineHeight: 1.5
rounded:
  square: "0px"
  circle: "50%"
spacing:
  titlebar: "7px"
  tight: "8px"
  toolbar-y: "10px"
  toolbar-x: "14px"
  row-y: "15px"
  row-x: "16px"
  panel: "22px"
components:
  system-toolbar:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.square}"
    padding: "0 14px"
    height: "44px"
  desktop-shortcut:
    backgroundColor: "{colors.paper}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
  mac-window:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
  article-file-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "15px 16px"
  project-list-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "11px 9px"
  issue-label:
    backgroundColor: "{colors.accent-yellow}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "5px 7px"
  discussion-button:
    backgroundColor: "{colors.selection}"
    textColor: "#ffffff"
    typography: "{typography.title}"
    rounded: "{rounded.square}"
    padding: "10px 13px"
---

# Design System: cixiangtao 彩色个人工作台

## Overview

**Creative North Star: "彩色个人工作台"**

这个视觉系统把个人网站呈现为一台持续工作的彩色桌面。早期图形系统的工具栏、重叠窗口、文件目录、点阵纹理和装饰性滚动条提供触感；紫蓝桌面与少量功能色建立自己的身份，清楚的技术档案排版让文章、项目与作者信息保持真实、可靠、可阅读。

整体气质清楚、可靠、鲜明，但不喧闹。首页允许多窗口重叠形成主次，文章详情则把窗口最大化为安静文稿；色彩承担状态和定位，不代替信息层级。视觉上明确拒绝米白紫色的 Claude 风、暖色衬线编辑风、现代毛玻璃 macOS 仿制和无意义英文装饰。

**Key Characteristics:**

- 文章窗口最大并处于前景，项目居后，关于我保持小而明确。
- 一像素深色轮廓、直角窗口、硬偏移阴影、条纹标题栏和像素图形形成经典桌面触感。
- 顶部使用图标工具栏；窗口内部使用目录栏、文件行、滚动轨道和缩放角，而不是网站式卡片。
- 紫蓝桌面承载窗口，青、黄、珊瑚只用于功能状态和关键识别。
- 中文内容优先，项目名、技术名词和 GitHub Issue 标识保留其固有写法。
- 桌面端使用重叠构图，窄屏改为清楚的纵向文档流。

## Colors

高饱和桌面与近白纸面形成清晰边界，功能色像系统状态灯一样稀疏而准确。

### Primary

- **工作台紫蓝**：全站桌面底色，点阵纹理让大面积色块保持经典计算机质感。
- **选择蓝**：文章首选行、导航激活与主操作的高对比状态。
- **深链接蓝**：正文链接与作者角色等需要可识别但不夺目的信息。

### Secondary

- **信号青**：写作频道、窗口状态与链接下划线，代表正在传输的内容。
- **文件黄**：项目工具条、Issue 标签、头像与高亮状态，承担最强的注意力提示。

### Tertiary

- **像素珊瑚**：头像阴影和少量图标状态，只用于带来生命力与层次。

### Neutral

- **文稿白**：窗口与正文主表面。
- **系统灰白**：标题栏、工具区和页脚内层表面。
- **像素墨黑**：正文、边框与几何图形的统一结构色。
- **档案灰**：摘要、时间、文件信息等次级内容。
- **结构线**：列表分隔与弱边界；强调结构时使用更深的结构线。

### Named Rules

**The 状态色规则.** 青、黄、珊瑚必须表达频道、选择、标签或识别状态，不能铺成无语义的装饰渐变。

**The 纸面优先规则.** 长文始终落在文稿白表面上；紫蓝只属于桌面环境，不进入正文阅读底色。

## Typography

**Display Font:** Geneva（回退到 Verdana、苹方、微软雅黑与系统无衬线）

**Body Font:** Geneva（回退到 Verdana、苹方、微软雅黑与系统无衬线）

**Label/Mono Font:** Monaco（回退到 SFMono-Regular、Consolas 与等宽字体）

**Character:** 无衬线字形保持中文界面清楚直接，较重的标题模拟经典桌面标签的坚实感；等宽字只负责 Issue 编号、文件信息和数据标签。

### Hierarchy

- **Display**（950，流体大标题，1.08 行高）：只用于文章详情标题，控制在约 18 个汉字宽度内。
- **Headline**（900，流体中标题）：用于作者名等身份标题。
- **Title**（900，紧凑单行）：用于窗口标题和主要界面标签。
- **Body**（400，1.9 行高）：用于文章正文，正文列限制在 70ch 以内。
- **Label**（800，紧凑等宽）：用于 Issue 编号、日期、阅读时长和文件状态。

### Named Rules

**The 中文界面规则.** 导航、状态和说明使用中文；不要为了营造技术感加入无语义英文。

**The 等宽数据规则.** Monaco 只标记可被理解为数据或文件元信息的内容，不能成为大段正文或装饰标题。

## Layout

桌面首页以 1480px 的最大舞台承载有明确主次的多窗口构图：左上保留独立的桌面图标轨道，文章、项目与关于我三个窗口整体向右展开；文章窗口约占舞台七成并位于前景，项目窗口位于右后方，关于我缩在图标轨道右侧。舞台会填满菜单栏与页脚之间的可用视口，页脚在短页面上贴合底部；顶部图标工具栏固定在页面顶部，桌面快捷图标只在 1024px 以上出现；窗口层级通过位置、尺寸和重叠表达，而不是平均排列。

文章详情使用 1180px 的外部窗口，文稿头部与讨论区限制在 880px；正文布局由 155px 作者栏和不超过 70ch 的阅读列组成。760px 以下取消重叠和粘性作者栏，所有窗口进入纵向流；导航在 720px 以下隐藏状态区并缩短品牌展示。

**The 内容主次规则.** 最近写作永远是首页最大窗口；项目次之，作者身份窗口最小。

**The 桌面图标轨道规则.** 1024px 以上把关于我、项目和文章三个站内窗口入口垂直对齐在舞台左上，窗口初始构图为其保留独立横向空间。

**The 满屏工作台规则.** 桌面舞台至少占满菜单栏与页脚之间的剩余视口，不在页脚下方留下无意义空白。

**The 窄屏文档规则.** 小屏不模拟可拖拽桌面，不保留窗口重叠，只保留标题栏、边框和色彩语法。

## Elevation & Depth

系统采用硬偏移阴影而不是环境毛玻璃。窗口以一像素边框建立轮廓，以右下方不模糊的深色影子建立桌面层级；工具条和列表内部保持平面。目标窗口用黄色外框反馈定位，代码块和讨论区仅使用更轻的同向阴影。

### Shadow Vocabulary

- **桌面窗口**（`5px 5px 0 rgb(23 23 27 / 46%)`）：首页及文章页的主窗口。
- **移动窗口**（`3px 3px 0 rgb(23 23 27 / 42%)`）：窄屏上降低层级强度。
- **档案浮层**（`4px 4px 0 rgb(23 23 27 / 22%)`）：讨论操作区等局部表面。
- **目标定位**（`0 0 0 3px` 文件黄外框）：锚点窗口成为当前目标时使用。

**The 结构阴影规则.** 阴影只说明窗口或操作区的层级，不创造漂浮卡片，更不能替换一像素结构边框。

## Shapes

直角矩形是主导形态。窗口、按钮、标签、头像和图标均使用零圆角与一像素墨黑边框；标题栏左侧窗口图标、中央条纹与右侧最小化、最大化、关闭控件共同形成可识别的 MacWindow 轮廓。圆形仅保留给在线状态点，像素图形允许使用硬边内阴影模拟体积。

**The 直角窗口规则.** 内容容器不使用圆角；只有真实状态点可以使用圆形。

**The 发丝线轮廓规则.** 需要被理解为窗口、按钮、标签或图标的独立对象，优先用一像素墨黑边框明确其边界；内部图形可按可读性局部加粗。

## Components

### System Toolbar

- **形态：** 44px 高、文稿白底、底部一像素边框，始终位于桌面最上层。
- **导航：** 首页头像始终保留；1024px 以上承载 GitHub、源码仓库和文章档案三个全局外链，站内窗口入口交给桌面图标；中文名称通过可访问标签和悬停提示表达。
- **信息：** 右侧只显示当前栏目与在线状态，不放置无交互装饰；站内窗口切换时仍同步当前位置。
- **移动端：** 1024px 以下因桌面图标隐藏，工具栏自动恢复项目、文章、关于我三个站内入口；720px 以下同时隐藏当前位置文字并缩短间距。

### MacWindow

- **形态：** 直角文稿表面、一像素墨黑边框、无模糊右下硬阴影。
- **标题栏：** 五列网格容纳语义模块图标、条纹、居中标题、条纹和右侧三控件组；关于我、项目和文章分别复用系统导航的九宫格、文件夹与文稿图标，最小化、最大化、关闭分别使用黄、青、珊瑚色。
- **图标实现：** `ModuleIcon` 统一维护系统工具栏、桌面入口与窗口标题栏的像素图标，并通过 toolbar、desktop、window 三个尺寸保持各自的光学清晰度。
- **窗口细节：** 项目与文章窗口显示点阵滚动轨道、方向箭头、滑块和右下缩放角；这些细节承担桌面语义，不接管页面真实滚动。
- **状态：** 锚点命中或直接点击面板时，窗口提升到所有内容窗口之上并增加文件黄外框，同时以无滚动的方式同步地址栏锚点；1024px 以上可按住标题栏在桌面范围内拖动，拖动时使用抓取光标和更深的硬阴影反馈，窄屏仍保持稳定文档流；系统工具栏始终保持最高层。

### Desktop Shortcut

- **形态：** 48px 直角像素图标配合居中标签，图标使用文稿白表面与硬阴影，标签固定为白色并使用一像素深色文字阴影，以便在紫蓝桌面上保持清晰。
- **用途：** 承载关于我、项目和文章三个站内窗口入口；只在 1024px 以上的独立图标轨道显示，点击后同步锚点并将对应窗口置顶。
- **实现：** `DesktopShortcut` 统一链接与白字标签样式，图形复用 `ModuleIcon` 的 desktop 尺寸。

### Homepage Window Compositions

- **实现：** `AboutWindow`、`ProjectsWindow` 与 `WritingWindow` 分别封装各自的内容、数据和局部图形样式，并统一复用 `MacWindow` 的标题栏、滚动轨道、选中和拖动能力。
- **边界：** 首页只负责工作台构图和数据装配；窗口内容变化不应回流为页面级样式。

### Article File Row

- **形态：** 纸白底、彩色点阵文件图标，首篇文章在只有一篇时扩展为主内容区。
- **信息：** Issue 编号、标题摘要、日期时长与虚线“打开”控件形成文件档案排版；窄屏隐藏元信息列和打开控件。
- **状态：** 仅在悬停和键盘聚焦时切换为选择蓝与白字，默认阅读面保持安静。

### Project List Row

- **形态：** 52px 图标列、弹性文本列和 28px 跳转列；项目之间使用强调结构线。
- **状态：** 悬停和键盘聚焦统一切换为选择蓝与白字，摘要同时提亮。

### Issue Label

- **形态：** 文件黄底、一像素墨黑边框、等宽粗体和紧凑内边距。
- **用途：** 标记 Issue 编号；普通标签保持轻量文本形式，不复制实体徽章。

### Discussion Button

- **形态：** 选择蓝底白字、一像素墨黑边框、无圆角。
- **状态：** 悬停与聚焦切换为像素墨黑；全局键盘聚焦以文件黄外框保证可见性。

## Do's and Don'ts

### Do:

- **Do** 让文章承担首屏最大面积，并让色彩帮助访客识别写作、项目和作者窗口。
- **Do** 在长文中保留文稿白、深色正文、70ch 阅读列和充足行高。
- **Do** 使用发丝线边框、硬阴影、直角窗口和少量像素图形保持早期桌面系统的触感。
- **Do** 在 760px 以下把桌面重排为清楚的纵向内容流。
- **Do** 只展示真实项目、真实 Issue 数据和可到达的 GitHub 操作。

### Don't:

- **Don't** 回到米白紫色 Claude 风或暖色衬线编辑风。
- **Don't** 使用毛玻璃、半透明模糊、现代 macOS 红黄绿按钮或照搬系统品牌资产。
- **Don't** 把青、黄、珊瑚铺成无功能含义的大面积装饰。
- **Don't** 用同尺寸卡片网格替代窗口之间明确的内容主次。
- **Don't** 添加无意义英文标题、状态或装饰标签。
