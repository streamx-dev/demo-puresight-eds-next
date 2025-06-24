#!/bin/bash

streamx_action()
{
  local FILES=$1;
  local ACTION=$2;
  for FILE_PATH in $FILES; do
    echo "--------------------------------------"
    echo "Checking file $FILE_PATH"
    for FILE_PATTERN in $PATTERNS; do
      if [[ "$FILE_PATH" =~ "$FILE_PATTERN" ]]; then
        echo "Accepted file $FILE_PATH - did match the pattern $FILE_PATTERN.";
        if ( $DRY_RUN ); then
          echo "Sending $FILE_PATH to StreamX - SKIPPED - dry run mode enabled";
        else
          case "$ACTION" in
            "publish")
              echo "Publishing $FILE_PATH to StreamX";
              webresourcedata=$(cat "$FILE_PATH" | jq . -sR);
              streamx --accept-license publish --ingestion-url=$STREAMX_INGESTION_BASE_URL web-resources "$FILE_PATH" -s "content.bytes=$webresourcedata" -p "sx:type=web-resource/static"
              ;;
            "unpublish")
              echo "Unpublishing $FILE_PATH from StreamX";
              streamx --accept-license unpublish web-resources "$FILE_PATH"
              ;;
            *)
              echo "Only publish / unpublish options are supported."
              exit 1
              ;;
          esac
        fi
      fi
    done
  done
}