#!/bin/sh

PATH=/usr/local/bin/:$PATH

jq="/usr/local/bin/jq"

playing=$(osascript ./bar.widget/scripts/playing.scpt | sed "s/\"/'/g")
index=$(yabai -m query --spaces --display 1 | $jq '.[] | select(.focused == 1).index')
primary_space_count=$(yabai -m query --spaces --display 1 | $jq length)
# secondary_space_count=$(yabai -m query --spaces --display 2 | jq length)

# shellcheck disable=SC2196
check=$(pmset -g batt)
battery=`pmset -g batt | egrep '(\\d+)\%' -o | cut -f1 -d%`

if [ "${check/AC}" = "$check" ]
then charging="false"
else charging="true"
fi
# shellcheck disable=SC2039


time=$(date +"%H:%M")

cat <<-EOF
{
  "output": {
    "spotify": "$playing",
    "charging": "$charging",
    "battery": "$battery",
    "time": "$time",
    "yabai": {
      "primary": {
          "current": "$index",
          "total": "$primary_space_count"
      }
    }
  }
}
EOF

