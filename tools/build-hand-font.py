import sys
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
if len(sys.argv)!=2:
 raise SystemExit('Usage: python3 tools/build-hand-font.py /path/to/LXGWWenKai-Light.ttf (fonttools[woff] required)')
font=TTFont(sys.argv[1])
text=''.join(p.read_text() for p in Path('.').glob('*.js'))+Path('index.html').read_text()+Path('pool.css').read_text()
chars=set(text)
options=subset.Options();options.flavor='woff2';options.name_IDs=['*'];options.name_languages=['*'];options.layout_features=['*']
s=subset.Subsetter(options=options);s.populate(text=''.join(sorted(chars)));s.subset(font)
for n in font['name'].names:
 if n.nameID in [1,4,6,16,17]:
  name={1:'Life Pool Hand',4:'Life Pool Hand Regular',6:'LifePoolHand-Regular',16:'Life Pool Hand',17:'Regular'}[n.nameID]
  n.string=name.encode(n.getEncoding(),errors='replace')
font.flavor='woff2';font.save('assets/summer/life-hand.woff2')
print('Handwritten font:',len(chars),'characters,',Path('assets/summer/life-hand.woff2').stat().st_size,'bytes')
