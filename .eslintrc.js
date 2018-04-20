module.exports = {
    "extends": "airbnb-base",
    "rules": {
        // windows linebreaks when not in production environment
        "linebreak-style": ["error", "windows"],
        "max-len": "off",
        "no-use-before-define": "off",
        "no-param-reassign": "off",
        "no-else-return": "off",
        "prefer-template": "off",
        "no-mixed-operators": "off",
        "no-plusplus": "off",
        "import/extensions": "off",
        "prefer-destructuring": "warn",
        "consistent-return": "warn",
        "one-var": "warn",
        "no-multi-assign": "warn",
    },
    "env": {
        "browser": true,
        "node": true
    }
};