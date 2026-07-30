#!/data/data/com.termux/files/usr/bin/bash
echo "======================================="
echo "      AKA BMW ISGM - SPRINT AUDIT"
echo "======================================="
echo
echo "Build Status:"
npm run build >/dev/null 2>&1 && echo "  ✅ BUILD OK" || echo "  ❌ BUILD FAILED"
echo
echo "JavaScript Files : $(find src -name "*.js" | wc -l)"
echo "Folders          : $(find src -type d | wc -l)"
echo "Empty Files      : $(find src -type f -size 0 | wc -l)"
echo "TODO             : $(grep -R "TODO" src 2>/dev/null | wc -l)"
echo
echo "=== Empty Files ==="
find src -type f -size 0
