#!/bin/bash
cat > base/scripts/env.js << EOF
window.MINI_FINANCE_ENV = {
  FASTFOREX_API_KEY: '${FASTFOREX_API_KEY}',
};
EOF
echo "env.js generado correctamente"
