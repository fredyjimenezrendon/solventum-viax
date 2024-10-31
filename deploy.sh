rm -f -r output
mkdir "output"
for dir in lambdas/*/*/
do
#    lambda_dir=${dir%*/}
    lambda_dir="$(basename "${dir}")"
    echo ${lambda_dir}
    pushd ${dir}
    zip -r ${lambda_dir}.zip node_modules/ src/ test/ viax.yaml package.json
    mv ${lambda_dir}.zip "../../../output"
    popd
    token_response=$(curl --request POST \
    --url $ACCESS_TOKEN_URL \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data 'grant_type=password' \
    --data 'client_id=viax-ui' \
    --data-urlencode 'username='$ACCESS_TOKEN_USERNAME \
    --data-urlencode 'password='$ACCESS_TOKEN_PASSWORD )
    sleep 2
    access_token=$(echo "$token_response" | jq -r '.access_token')
    pushd "output/"
    curl --request POST \
    --url $DEPLOYMENT_URL \
    --header 'Authorization: Bearer '${access_token}  \
    --header 'Content-Type: multipart/form-data' \
    --form 'operations={
    "operationName": "upsertFunction",
    "query": "mutation upsertFunction($file: Upload!) { upsertFunction(input: { fun: $file }) { uid } }",
    "variables": {  "file": null }
    }' \
    --form 'map={ "File":["variables.file"] }' \
    --form File=@${lambda_dir}.zip
    popd
done