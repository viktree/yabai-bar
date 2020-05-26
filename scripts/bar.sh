#!/bin/sh

PATH=/usr/local/bin/:$PATH

jq="/usr/local/bin/jq"

playing=$(osascript ./bar.widget/scripts/playing.scpt | sed "s/\"/'/g")
primary_space_index=$(yabai -m query --spaces --display 1 | $jq '.[] | select(.focused == 1).index')
primary_space_count=$(yabai -m query --spaces --display 1 | $jq length)
display_count=$(yabai -m query --spaces | jq 'max_by(.display | tonumber).display')

# shellcheck disable=SC2196
check=$(pmset -g batt)
battery=`pmset -g batt | egrep '(\\d+)\%' -o | cut -f1 -d%`

if [ "${check/AC}" = "$check" ]
then charging="false"
else charging="true"
fi
# shellcheck disable=SC2039

time=$(date +"%H:%M")

if [ "$display_count" != "1" ]
then
  secondary_space_index=$(yabai -m query --spaces --display 2 | $jq '.[] | select(.focused == 1).index')
  secondary_space_count=$(yabai -m query --spaces --display 2 | jq length)
cat <<-EOF
{
  "output": {
    "spotify": "$playing",
    "charging": "$charging",
    "battery": "$battery",
    "time": "$time",
    "yabai": {
      "primary": {
          "current": "$primary_space_index",
          "total": "$primary_space_count"
      },
      "secondary": {
          "current": "$secondary_space_index",
          "total": "$secondary_space_count"
      }
    }
  }
}
EOF
else
cat <<-EOF
{
  "output": {
    "spotify": "$playing",
    "charging": "$charging",
    "battery": "$battery",
    "time": "$time",
    "yabai": {
      "primary": {
          "current": "$primary_space_index",
          "total": "$primary_space_count"
      }
    }
  }
}
EOF
fi

