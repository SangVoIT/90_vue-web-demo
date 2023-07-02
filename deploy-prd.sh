# #!/bin/bash
set -e

npm install
npm run build 
# aws s3 sync dist/demoWeb s3://ws.ministop.co.jp --exclude "backend/*" --delete --acl public-read