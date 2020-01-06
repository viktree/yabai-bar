#!/bin/sh

PATH=/usr/local/bin/:$PATH

playing=$(osascript ./bar.widget/scripts/playing.scpt | sed "s/\"/'/g")
index=$(yabai -m query --spaces --display 1 | jq '.[] | select(.focused == 1).index')
primary_space_count=$(yabai -m query --spaces --display 1 | jq length)
# secondary_space_count=$(yabai -m query --spaces --display 2 | jq length)
battery=`pmset -g batt | egrep '(\\d+)\%' -o | cut -f1 -d%`

cat <<-EOF
{
  "output": {
    "spotify": "$playing",
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

