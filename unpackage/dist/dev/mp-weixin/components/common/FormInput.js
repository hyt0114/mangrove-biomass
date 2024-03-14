"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    suffix: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      modelValue: null
    };
  },
  watch: {
    value: {
      handler(v) {
        this.modelValue = v;
      },
      immediate: true
    }
  },
  methods: {
    onInputChange(e) {
      this.$emit("update:value", e);
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.onInputChange),
    b: common_vendor.o(($event) => $data.modelValue = $event),
    c: common_vendor.p({
      placeholder: "请输入",
      type: "digit",
      modelValue: $data.modelValue
    }),
    d: $props.suffix
  }, $props.suffix ? {
    e: common_vendor.t($props.suffix)
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-870e8fdf"], ["__file", "E:/development/mangrove-biomass/components/common/FormInput.vue"]]);
wx.createComponent(Component);
