# ALKS Task Extension for Azure DevOps Pipelines

## About

This pipeline task is primarily responsible for creating a session so that the
tasks following it may call AWS operations with the appropriate roles.

## What's Supported

* Creation of a regular session key

## Output

After creating a session key, The access key, secret key, and session token are
output to the following:

Azure DevOps Pipelines Variables

* AWS.AccessKeyID
* AWS.SecretAccessKey
* AWS.SessionToken

Environment Variables

* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY
* AWS_SESSION_TOKEN

## References

* [ALKS Node Client](https://github.com/Cox-Automotive/alks-node)
