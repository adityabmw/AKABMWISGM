#!/data/data/com.termux/files/usr/bin/bash
set -e

PROJECT="$HOME/AKABMWISGM"
TEMPLATE="$PROJECT/templates/customer/src"
TARGET="$PROJECT/src/modules/customer"
BACKUP="$PROJECT/backup"

echo "========================================"
echo " AKA BMW ISGM CUSTOMER INSTALLER v2.0"
echo "========================================"

cd "$PROJECT"

echo "[1/8] Validasi project..."
[ -f package.json ] || { echo "ERROR: package.json tidak ditemukan"; exit 1; }

echo "[2/8] Validasi template..."
[ -d "$TEMPLATE" ] || { echo "ERROR: $TEMPLATE tidak ditemukan"; exit 1; }

TOTAL=$(find "$TEMPLATE" -type f -name "*.js" | wc -l)

if [ "$TOTAL" -eq 0 ]; then
    echo "ERROR: Template customer kosong."
    exit 1
fi

echo "[3/8] Backup..."
mkdir -p "$BACKUP"
STAMP=$(date +%Y%m%d_%H%M%S)

if [ -d "$TARGET" ]; then
    cp -R "$TARGET" "$BACKUP/customer_$STAMP"
fi

echo "[4/8] Menyiapkan folder..."
mkdir -p "$TARGET"

echo "[5/8] Membersihkan target..."
find "$TARGET" -type f -name "*.js" -delete

echo "[6/8] Copy template..."
cp -Rf "$TEMPLATE/"* "$TARGET/"

echo "[7/8] Build..."
npm run build

echo "[8/8] Verifikasi..."
INSTALLED=$(find "$TARGET" -type f -name "*.js" | wc -l)

echo
echo "========================================"
echo " INSTALL CUSTOMER BERHASIL"
echo "========================================"
echo "Template  : $TOTAL file"
echo "Installed : $INSTALLED file"
echo "Backup    : backup/customer_$STAMP"
echo "Target    : src/modules/customer"
echo "========================================"
