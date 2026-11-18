"""Build self-hosted title and reading fonts from the original OFL TTF files."""
import argparse
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
parser=argparse.ArgumentParser()
parser.add_argument('font',help='Original LXGWWenKai Light or Regular TTF')
parser.add_argument('--text',action='store_true',help='Build the regular reading font instead of the light title font')
args=parser.parse_args()
font=TTFont(args.font)
text=''.join(p.read_text() for pattern in ['*.js','*.css','*.html'] for p in Path('.').glob(pattern))
chars=set(text)
options=subset.Options();options.flavor='woff2';options.name_IDs=['*'];options.name_languages=['*'];options.layout_features=['*']
s=subset.Subsetter(options=options);s.populate(text=''.join(sorted(chars)));s.subset(font)
family='Life Pool Text' if args.text else 'Life Pool Hand'
for n in font['name'].names:
 if n.nameID in [1,4,6,16,17]:
  name={1:family,4:family+' Regular',6:family.replace(' ','')+'-Regular',16:family,17:'Regular'}[n.nameID]
  n.string=name.encode(n.getEncoding(),errors='replace')
out=Path('assets/summer/life-text.woff2' if args.text else 'assets/summer/life-hand.woff2')
font.flavor='woff2';font.save(out)
print(out,len(chars),'characters,',out.stat().st_size,'bytes')
