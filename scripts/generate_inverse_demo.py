"""Reproduce the educational point-scatterer images (not obstacle inversion).

Requirements: Python 3, numpy, Pillow.
Run from any directory: python3 scripts/generate_inverse_demo.py
No randomness, noise, multiple scattering, or experimental data is used.
"""
from pathlib import Path
import base64
import io
import numpy as np
from PIL import Image

OUT = Path(__file__).resolve().parents[1] / "assets" / "inverse-intro"
OUT.mkdir(parents=True, exist_ok=True)
TARGETS = np.array([[-0.65, -0.30], [0.65, 0.35]])
STRENGTHS = np.array([1.0, 0.8])
N = 32
axis = np.linspace(-2, 2, 121)
xx, yy = np.meshgrid(axis, axis)
grid = np.column_stack((xx.ravel(), yy.ravel()))


def calculate(k, limited=False):
    angles = (np.linspace(-np.pi / 9, np.pi / 9, N) if limited
              else np.arange(N) * 2 * np.pi / N)
    directions = np.column_stack((np.cos(angles), np.sin(angles)))
    # q[j,l] = incoming direction l - observation direction j.
    q = (directions[None, :, :] - directions[:, None, :]).reshape(-1, 2)
    data = np.exp(1j * k * (q @ TARGETS.T)) @ STRENGTHS
    values = np.empty(len(grid))
    for begin in range(0, len(grid), 400):
        trial = grid[begin:begin + 400]
        values[begin:begin + 400] = np.abs(
            data @ np.exp(-1j * k * (q @ trial.T)) / N**2)
    values = values.reshape(xx.shape)
    assert np.isfinite(values).all() and values.max() > 0
    return values / values.max()


def png_data(values):
    # A fixed dark-blue / teal / yellow map; each panel is normalized separately.
    stops = np.array([[21, 36, 65], [27, 102, 119], [66, 174, 153], [255, 228, 104]])
    rgb = np.stack([np.interp(values, np.linspace(0, 1, 4), stops[:, c])
                    for c in range(3)], axis=-1).astype(np.uint8)
    buffer = io.BytesIO()
    # y increases upwards in the scientific plot.
    Image.fromarray(rgb[::-1]).save(buffer, format="PNG")
    return "data:image/png;base64," + base64.b64encode(buffer.getvalue()).decode()


def text(x, y, value, size=24, extra=""):
    return f'<text x="{x}" y="{y}" font-size="{size}" {extra}>{value}</text>'


def svg(name, title, body, height=640):
    document = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="{height}" viewBox="0 0 1200 {height}" role="img" aria-labelledby="title">
<title id="title">{title}</title>
<defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#246b5b"/></marker></defs>
<rect width="1200" height="{height}" rx="18" fill="#f4f1e9"/>
<g fill="#22332e" font-family="PingFang SC, Noto Sans CJK SC, sans-serif">{text(40,55,title,32)}{body}</g></svg>'''
    (OUT / name).write_text(document, encoding="utf-8")


body = text(40,100,"教学计算：两个弱点目标；不是障碍物边界重建",24)
for col, (k, limited, label) in enumerate([
        (2, False, "低波数 · 全角度"), (8, False, "高波数 · 全角度"),
        (8, True, "高波数 · 有限角度")]):
    values = calculate(k, limited)
    left, top, size = 55 + col*395, 190, 310
    body += text(left,145,label,25) + text(left,175,f"k = {k}" + ("，方向 ±20°" if limited else "，方向覆盖 360°"),20)
    body += f'<image x="{left}" y="{top}" width="{size}" height="{size}" href="{png_data(values)}"/>'
    for x, y in TARGETS:
        px = left + (x + 2)/4*size
        py = top + (2 - y)/4*size
        body += f'<path d="M{px-7} {py}h14 M{px} {py-7}v14" stroke="white" stroke-width="2.5"/>'
    for value in [-2, 0, 2]:
        px = left + (value + 2)/4*size
        py = top + (2-value)/4*size
        body += text(px,top+size+25,str(value),19,'text-anchor="middle"')
        body += text(left-10,py+6,str(value),19,'text-anchor="end"')
    body += text(left+size/2,top+size+53,'x',22)
    body += text(left-30,top-15,'y',22)
    if k == 8 and not limited:
        for target in TARGETS:
            nearby = np.linalg.norm(grid-target, axis=1) < 0.4
            candidates = np.flatnonzero(nearby)
            best = candidates[np.argmax(values.ravel()[nearby])]
            error = np.linalg.norm(grid[best]-target)
            assert error < 0.10, f"Unexpected localization error {error}"
            print(f"Full-angle k=8: local peak {grid[best]}, error={error:.4f}")
bar = np.linspace(0, 1, 256)[None, :].repeat(10, axis=0)
body += f'<image x="435" y="585" width="300" height="20" href="{png_data(bar)}"/>'
body += text(400,604,'0',20)+text(750,604,'1',20)
body += text(40,605,'白色十字：真实位置',22)
body += text(800,604,'各图单独归一化',22)
body += text(40,660,'无噪声；32 × 32 个方向组合；搜索网格 121 × 121；不包含多次散射。',23)
svg('imaging-results.svg','让数据在候选位置“对齐”：相位匹配成像',body,700)

body = ''
for y in [160,390]:
    for x in [55,855]:
        body += f'<rect x="{x}" y="{y}" width="290" height="125" rx="14" fill="#e1e9de" stroke="#a4b7a8"/>'
body += text(80,210,'物体 / 内部状态',27)+text(80,250,'已知激励与环境',23)
body += text(890,235,'测量信号',30)
body += '<path d="M370 222H825" stroke="#246b5b" stroke-width="4" marker-end="url(#arrow)"/>'
body += text(430,185,'正问题：预测响应',26)
body += text(80,440,'未知物体 / 状态',27)+text(80,480,'寻找合理解释',23)
body += text(890,440,'已知测量信号',27)+text(890,480,'已知激励与环境',23)
body += '<path d="M825 452H370" stroke="#246b5b" stroke-width="4" marker-end="url(#arrow)"/>'
body += text(430,415,'反问题：由果溯因',26)
body += text(65,590,'箭头可以反过来问；信息是否足够，需要另外判断。',26)
svg('forward-inverse.svg','一条物理因果链，两种提问方向',body)

body = '<circle cx="660" cy="330" r="215" fill="none" stroke="#97b0a1" stroke-width="3" stroke-dasharray="9 8"/>'
body += '<path d="M590 245C655 210 730 255 710 310C775 375 650 425 610 375C535 365 540 285 590 245Z" fill="#d3decb" stroke="#246b5b" stroke-width="4"/>'
for angle in np.linspace(0,2*np.pi,16,endpoint=False):
    px, py = 660+215*np.cos(angle),330+215*np.sin(angle)
    body += f'<circle cx="{px}" cy="{py}" r="7" fill="#ba6c43"/>'
for x in [90,145,200,255]:
    body += f'<path d="M{x} 200V450" stroke="#5b9d88" stroke-width="4"/>'
body += '<path d="M130 490H390" stroke="#246b5b" stroke-width="4" marker-end="url(#arrow)"/>'
body += text(85,165,'已知入射波',27)+text(85,540,'方向、频率已知',23)
body += text(600,320,'未知 D',29)+text(595,355,'边界 ∂D',24)
body += text(915,275,'接收点',26)+text(915,315,'测量曲线 Γ',24)
body += text(470,610,'从外部响应，推测内部物体的位置与形状。',25)
svg('obstacle.svg','反障碍问题：边界在哪里？',body)
print(f"Wrote three SVG illustrations to {OUT}")
