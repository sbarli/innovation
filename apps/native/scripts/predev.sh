echo '=== PREDEV RUNNING ==='

cd ../../
turbo run @inno/constants#build
turbo run @inno/gql#build
turbo run @inno/mocks#build
turbo run @inno/utils#build
cd apps/native

echo '=== PREDEV COMPLETE ==='