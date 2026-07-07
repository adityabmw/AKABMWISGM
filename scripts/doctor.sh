#!/data/data/com.termux/files/usr/bin/bash

clear

echo "====================================================="
echo "        AKA BMW ISGM ENTERPRISE SYSTEM DOCTOR"
echo "====================================================="
echo ""

check_file() {

    if [ -f "$1" ]; then
        echo "[ OK ] $1"
    else
        echo "[FAIL] $1"
    fi

}

check_dir() {

    if [ -d "$1" ]; then
        echo "[ OK ] $1"
    else
        echo "[FAIL] $1"
    fi

}

echo "Checking Folder..."
echo ""

check_dir src
check_dir src/core
check_dir src/modules
check_dir src/config
check_dir scripts

echo ""
echo "Checking Core..."
echo ""

check_file src/core/firestore.js
check_file src/core/database.js
check_file src/core/repository.js
check_file src/core/router.js
check_file src/core/startup.js
check_file src/core/auth.js

echo ""
echo "Checking Config..."
echo ""

check_file src/config/firebase.config.js

echo ""
echo "Checking Modules..."
echo ""

for module in src/modules/*; do

    if [ -d "$module" ]; then

        echo ""
        echo "Module : $(basename "$module")"

        ls "$module"

    fi

done

echo ""
echo "====================================================="
echo "SYSTEM CHECK COMPLETE"
echo "====================================================="
