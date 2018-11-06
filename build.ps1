# Requires
# npm install -g typescript tfx-cli

$rootDir = Get-Location

# Compile the ALKS Task
Set-Location .\alksTask
tsc
Set-Location $rootDir

# Package the extension
tfx extension create --manifest-globs .\vss-extension.json --output-path .\dist\

# Publish the extension
#tfx extension publish --manifest-globs .\vss-extension.json --share-with <YourOrganization>
