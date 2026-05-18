echo '=== CLEAN STARTING ==='

echo '  ...cleaning turbo...'
turbo clean

echo '  ...removing .turbo...'
rm -rf .turbo

echo '  ...pruning pnpm store...'
pnpm store prune

echo '  ...clearing watchman...'
watchman watch-del-all

echo '  ...cleaning git...'
git clean -xdf

echo '  ...cleaning native caches...'
cd apps/native
rm -rf $TMPDIR/haste-map-*
rm -rf $TMPDIR/metro-cache
cd ../../

echo '=== CLEAN COMPLETE ==='
