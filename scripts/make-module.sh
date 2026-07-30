#!/data/data/com.termux/files/usr/bin/bash

set -e

if [ -z "$1" ]; then
    echo "Usage:"
    echo "bash scripts/make-module.sh ModuleName"
    exit 1
fi

MODULE=$(echo "$1" | tr '[:upper:]' '[:lower:]')
DIR="src/modules/$MODULE"

mkdir -p "$DIR"

FILES=(
controller
service
repository
validator
model
view
routes
events
utils
statistics
schema
index
)

for FILE in "${FILES[@]}"
do

TARGET="$DIR/$MODULE.$FILE.js"

if [ "$FILE" = "index" ]; then

cat > "$TARGET" <<EOT
const ${MODULE} = {
    init() {
        console.log("${MODULE} initialized");
    }
};

export default ${MODULE};
EOT

else

cat > "$TARGET" <<EOT
export default class ${MODULE^}${FILE^} {

}
EOT

fi

done

echo
echo "======================================"
echo "Module Created : $MODULE"
echo "Location       : $DIR"
echo "Files          : ${#FILES[@]}"
echo "======================================"

