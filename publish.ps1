# Publish the extension
tfx extension publish --manifest-globs .\vss-extension.json --share-with $Env:AZURE_DEVOPS_ORGANIZATION --token $Env:AZURE_DEVOPS_PUBLISH_TOKEN
