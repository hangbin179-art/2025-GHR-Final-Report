import zipfile, re, sys
p = sys.argv[1]
z = zipfile.ZipFile(p)
names = sorted([n for n in z.namelist() if re.match(r'ppt/slides/slide\d+\.xml$', n)],
               key=lambda n: int(re.search(r'(\d+)', n).group(1)))
print("SLIDES:", len(names))
for n in names:
    xml = z.read(n).decode('utf-8')
    texts = [t for t in re.findall(r'<a:t>(.*?)</a:t>', xml, re.S) if t.strip()]
    print("\n== %s ==" % n)
    print(" | ".join(texts))
