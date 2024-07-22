/**
 * 这个是配合i18next-scanner的自动翻译
 */

module.exports = {
  input: ["src/**/*.{js,jsx,ts,tsx}"],
  output: "./",
  options: {
    debug: true,
    removeUnusedKeys: true,
    func: {
      list: ["i18next.t", "i18n.t", "t"],
      extensions: [".js", ".jsx", ".tsx", ".ts"],
    },
    trans: {
      component: "Trans",
      i18nKey: "i18nKey",
      extensions: [".js", ".jsx", ".tsx", ".ts"],
      fallbackKey: function (ns, value) {
        return value;
      },
    },
    lngs: ["en", "zh"],
    ns: ["translation"],
    defaultLng: "zh",
    defaultNs: "translation",
    resource: {
      loadPath: "public/locales/{{lng}}.json",
      savePath: "public/locales/{{lng}}.json",
      jsonIndent: 2,
      lineEnding: "\n",
    },
    nsSeparator: false,
    keySeparator: false,
  },
};
