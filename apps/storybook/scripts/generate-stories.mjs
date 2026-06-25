from pathlib import Path

src = Path("/mnt/data/metrics-story-generator/apps/storybook/scripts/generate-stories.mjs")
text = src.read_text()

old = """    const declaration = typeDeclarations.get(typeName);

    if (ts.isInterfaceDeclaration(declaration)) {
      return membersToProps(declaration.members, sourceFile);
    }

    if (ts.isTypeAliasDeclaration(declaration)) {
      return typeNodeToProps(
        declaration.type,
        typeDeclarations,
        sourceFile,
        seen,
      );
    }
"""

new = """    const declaration = typeDeclarations.get(typeName);

    if (!declaration) {
      return [];
    }

    if (ts.isInterfaceDeclaration(declaration)) {
      return membersToProps(declaration.members, sourceFile);
    }

    if (ts.isTypeAliasDeclaration(declaration)) {
      return typeNodeToProps(
        declaration.type,
        typeDeclarations,
        sourceFile,
        seen,
      );
    }
"""

if old not in text:
    raise RuntimeError("Target block not found")

text = text.replace(old, new)
fixed = Path("/mnt/data/generate-stories-fixed.mjs")
fixed.write_text(text)
print(fixed)
