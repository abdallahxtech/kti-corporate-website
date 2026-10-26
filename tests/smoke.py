"""Offline source sanity checks (no third-party dependencies)."""
from pathlib import Path
import re
from html.parser import HTMLParser
root=Path(__file__).resolve().parents[1]
class Links(HTMLParser):
    def __init__(self): super().__init__();self.refs=[]
    def handle_starttag(self,tag,attrs):
        for name,value in attrs:
            if name in ('href','src') and value:self.refs.append(value)
for name in ('index.html','privacy.html','terms.html','404.html'):
    p=root/name; assert p.exists(),f'Missing {name}'
    parser=Links();parser.feed(p.read_text())
    for ref in parser.refs:
        if ref.startswith('/') and not ref.startswith('//'):
            assert (root/ref.lstrip('/')).exists(),f'Broken {name} link: {ref}'
for name in ('Dockerfile','nginx.conf','styles.css','config.js','script.js','assets/brand/kti-logo.png','assets/visuals/refinery-hero.svg'):
    assert (root/name).exists(),name
html=(root/'index.html').read_text()
assert len(re.findall(r'data-portal=',html))==3
assert 'mailto:' in (root/'script.js').read_text()
assert 'publishCredentialLogos: false' in (root/'config.js').read_text()
assert 'starlink.kti.ae' in html
print('PASS: required files, static local references, three logins, lead form and safe credential default')
