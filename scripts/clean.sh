echo '=== CLEAN STARTING ==='

echo '  ...cleaning turbo...'
turbo clean

echo '  ...removing .turbo...'
rm -rf .turbo

echo '  ...clearing yarn cache...'
yarn cache clean

echo '  ...clearing watchman...'
watchman watch-del-all

# echo '  ...cleaning git...'
# git clean -dfx

echo '  ...cleaning native caches...'
cd apps/native
rm -rf $TMPDIR/haste-map-*
rm -rf $TMPDIR/metro-cache
cd ../../

echo '=== CLEAN COMPLETE ==='