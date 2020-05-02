#!/bin/sh

PATH=/usr/local/bin/:$PATH

jq="/usr/local/bin/jq"

playing=$(osascript ./bar.widget/scripts/playing.scpt | sed "s/\"/'/g")
index=$(yabai -m query --spaces --display 1 | $jq '.[] | select(.focused == 1).index')
primary_space_count=$(yabai -m query --spaces --display 1 | $jq length)
# secondary_space_count=$(yabai -m query --spaces --display 2 | jq length)

# shellcheck disable=SC2196
battery=`pmset -g batt | egrep '(\\d+)\%' -o | cut -f1 -d%`

# shellcheck disable=SC2039
charging=$(if [[ $(pmset -g ps | head -1) =~ "AC" ]]; then echo "true"; else echo "false"; fi)

cat <<-EOF
{
  "output": {
    "spotify": "$playing",
    "charging": "$charging",
    "battery": "$battery",
    "yabai": {
      "primary": {
          "current": "$index",
          "total": "$primary_space_count"
      }
    }
  }
}
EOF

