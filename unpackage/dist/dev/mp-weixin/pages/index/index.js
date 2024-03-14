"use strict";
const utils_treeKinds = require("../../utils/tree-kinds.js");
const utils_formUtils = require("../../utils/form-utils.js");
const utils_calculators_index = require("../../utils/calculators/index.js");
const common_vendor = require("../../common/vendor.js");
require("../../utils/calculators/aegiceras.js");
require("../../utils/calculators/avicennia.js");
require("../../utils/calculators/unknownkind.js");
require("../../utils/calculators/rhizophora-stylosa-griff.js");
const FormInput = () => "../../components/common/FormInput.js";
const _sfc_main = {
  data() {
    return {
      formData: {
        kind: null,
        dbh: null,
        height: null,
        density: null
      },
      dbhHelpText: "",
      mangroveKinds: utils_treeKinds.mangroveKinds,
      calcResult: {}
    };
  },
  onLoad() {
  },
  methods: {
    onKindChange(e) {
      const v = e.detail.value;
      if (v && v.length) {
        console.log(v[0]);
        this.dbhHelpText = utils_formUtils.getDbhHelpText(v[0].value);
      } else {
        this.dbhHelpText = "";
      }
    },
    calcBiomass() {
      this.calcResult = utils_calculators_index.calc(this.formData.kind, this.formData.dbh, this.formData.height, this.formData.density);
      if (this.calcResult) {
        this.$refs.alertDialog.open();
      } else {
        this.$refs.message.open();
      }
    }
  },
  components: {
    FormInput
  }
};
if (!Array) {
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _component_FormInput = common_vendor.resolveComponent("FormInput");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  (_easycom_uni_data_picker2 + _easycom_uni_forms_item2 + _component_FormInput + _easycom_uni_easyinput2 + _easycom_uni_forms2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_popup_message2)();
}
const _easycom_uni_data_picker = () => "../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
if (!Math) {
  (_easycom_uni_data_picker + _easycom_uni_forms_item + _easycom_uni_easyinput + _easycom_uni_forms + _easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_popup_message)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.onKindChange),
    b: common_vendor.o(($event) => $data.formData.kind = $event),
    c: common_vendor.p({
      localdata: $data.mangroveKinds,
      ["popup-title"]: "请选择",
      modelValue: $data.formData.kind
    }),
    d: common_vendor.p({
      label: "树种",
      name: "kind"
    }),
    e: common_vendor.o(($event) => $data.formData.dbh = $event),
    f: common_vendor.p({
      suffix: "cm",
      value: $data.formData.dbh
    }),
    g: $data.dbhHelpText
  }, $data.dbhHelpText ? {
    h: common_vendor.t($data.dbhHelpText)
  } : {}, {
    i: common_vendor.p({
      label: "胸径/基径",
      name: "dbh"
    }),
    j: common_vendor.o(($event) => $data.formData.height = $event),
    k: common_vendor.p({
      suffix: "m",
      value: $data.formData.height
    }),
    l: common_vendor.p({
      label: "树高",
      name: "height"
    }),
    m: $data.formData.kind === -1
  }, $data.formData.kind === -1 ? {
    n: common_vendor.o(($event) => $data.formData.density = $event),
    o: common_vendor.p({
      placeholder: "请输入",
      type: "digit",
      modelValue: $data.formData.density
    }),
    p: common_vendor.p({
      label: "密度",
      name: "density"
    })
  } : {}, {
    q: common_vendor.o((...args) => $options.calcBiomass && $options.calcBiomass(...args)),
    r: common_vendor.p({
      ["label-align"]: "right",
      ["label-width"]: "5rem"
    }),
    s: $data.calcResult.hasOwnProperty("whole")
  }, $data.calcResult.hasOwnProperty("whole") ? {
    t: common_vendor.t($data.calcResult.whole)
  } : {}, {
    v: $data.calcResult.hasOwnProperty("top")
  }, $data.calcResult.hasOwnProperty("top") ? {
    w: common_vendor.t($data.calcResult.top)
  } : {}, {
    x: $data.calcResult.hasOwnProperty("bottom")
  }, $data.calcResult.hasOwnProperty("bottom") ? {
    y: common_vendor.t($data.calcResult.bottom)
  } : {}, {
    z: common_vendor.p({
      type: "info",
      showClose: false,
      confirmText: "确定",
      title: "计算结果"
    }),
    A: common_vendor.sr("alertDialog", "1cf27b2a-9"),
    B: common_vendor.p({
      type: "dialog"
    }),
    C: common_vendor.p({
      type: "error",
      message: "还没做",
      duration: 2e3
    }),
    D: common_vendor.sr("message", "1cf27b2a-11"),
    E: common_vendor.p({
      type: "message"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "E:/development/mangrove-biomass/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
