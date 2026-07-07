#!/data/data/com.termux/files/usr/bin/bash

clear

PROJECT="AKABMWISGM"

DATE=$(date +"%Y-%m-%d_%H-%M-%S")

BACKUP_DIR="backup"

mkdir -p "$BACKUP_DIR"

echo "========================================="
echo " AKA BMW ISGM BACKUP SYSTEM"
echo "========================================="
echo ""

ZIP_NAME="$BACKUP_DIR/${PROJECT}_${DATE}.zip"

zip -r "$ZIP_NAME" \
src \
scripts \
index.html \
app.js \
style.css \
firebase.json \
firestore.rules \
manifest.json >/dev/null 2>&1

echo ""
echo "Backup berhasil dibuat."
echo ""
echo "$ZIP_NAME"
echo ""
echo "========================================="
