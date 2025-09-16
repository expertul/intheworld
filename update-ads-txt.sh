#!/bin/bash
# Automated ads.txt update script for minglemining.com
# This script downloads the latest ads.txt from Ezoic's manager

# Set the domain
DOMAIN="minglemining.com"
EZOIC_URL="https://srv.adstxtmanager.com/19390/${DOMAIN}"

# Set the path where ads.txt should be saved
ADS_TXT_PATH="/var/www/html/ads.txt"

# Download the latest ads.txt from Ezoic
echo "Updating ads.txt for ${DOMAIN}..."
curl -L "${EZOIC_URL}" > "${ADS_TXT_PATH}"

# Check if the download was successful
if [ $? -eq 0 ]; then
    echo "✅ ads.txt updated successfully!"
    echo "📄 File saved to: ${ADS_TXT_PATH}"
    echo "🌐 Accessible at: https://${DOMAIN}/ads.txt"
else
    echo "❌ Failed to update ads.txt"
    exit 1
fi

# Set proper permissions
chmod 644 "${ADS_TXT_PATH}"

echo "🔄 ads.txt update completed at $(date)"
