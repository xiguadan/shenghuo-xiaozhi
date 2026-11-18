"""Build the two self-hosted ChillRoundGothic subsets used by the approved A preview."""
import argparse
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('normal', help='Original ChillRoundGothic_Normal.otf')
parser.add_argument('regular', help='Original ChillRoundGothic_Regular.otf')
args = parser.parse_args()
text = ''.join(p.read_text() for pattern in ('*.html', '*.css', '*.js') for p in Path('.').glob(pattern))
chars = set(text) | {chr(c) for c in range(32, 127)}
for source, family, output in (
    (args.normal, 'Life Pool Round', 'life-round.woff2'),
    (args.regular, 'Life Pool Round Title', 'life-round-title.woff2'),
):
    font = TTFont(source)
    options = subset.Options()
    options.flavor = 'woff2'
    options.name_IDs = ['*']
    options.name_languages = ['*']
    options.layout_features = ['*']
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(text=''.join(sorted(chars)))
    subsetter.subset(font)
    for record in font['name'].names:
        names = {1: family, 2: 'Regular', 4: family + ' Regular',
                 6: family.replace(' ', '') + '-Regular', 16: family, 17: 'Regular'}
        if record.nameID in names:
            record.string = names[record.nameID].encode(record.getEncoding(), errors='replace')
    if 'CFF ' in font:
        top = font['CFF '].cff.topDictIndex[0]
        top.FamilyName = family
        top.FullName = family + ' Regular'
        font['CFF '].cff.fontNames = [family.replace(' ', '') + '-Regular']
    font.flavor = 'woff2'
    path = Path('assets/summer') / output
    font.save(path)
    print(path, len(chars), 'characters,', path.stat().st_size, 'bytes')
