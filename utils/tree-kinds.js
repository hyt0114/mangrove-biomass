import {
	shapeEnums
} from "./enums.js"
export const mangroveKinds = [{
		text: "桐花树",
		value: 1,
		dbhHelpText: "请输入4-20之间的小数",
		shapes: [{
			text:shapeEnums.MACROPHANEROPHYTES.text + "（建议树高4米以上）",
			value:shapeEnums.MACROPHANEROPHYTES.value
		}, 
		{
			text:shapeEnums.SMALL_MACROPHANEROPHYTES.text + "（建议树高2-4米）",
			value:shapeEnums.SMALL_MACROPHANEROPHYTES.value
		}, {
			text:shapeEnums.UNDERGROWTH.text + "（树高小于2米）",
			value:shapeEnums.UNDERGROWTH.value
		}],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "height"
			],
			[shapeEnums.SMALL_MACROPHANEROPHYTES.value]: [
				"dbh"
			],
			[shapeEnums.UNDERGROWTH.value]: [
				"basal", "height"
			]
		}
	},
	{
		text: "秋茄",
		value: 2,
		dbhHelpText: "请输入4-15之间的小数",
		shapes: [shapeEnums.MACROPHANEROPHYTES, shapeEnums.UNDERGROWTH, shapeEnums.SMALL_MACROPHANEROPHYTES,
			shapeEnums.YOUNG
		],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "height"
			],
			[shapeEnums.UNDERGROWTH.value]: [
				"basal"
			],
			[shapeEnums.SMALL_MACROPHANEROPHYTES.value]: [
				"basal", "height"
			],
			[shapeEnums.YOUNG.value]: [
				"basal"
			]
		}
	},
	{
		text: "白骨壤",
		value: 3,
		dbhHelpText: "请输入0-35之间的小数",
		shapes: [shapeEnums.MACROPHANEROPHYTES, shapeEnums.SHRUB],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "height"
			],
			[shapeEnums.SHRUB.value]: [
				"basal", "height", "crown"
			],
		}
	},
	{
		text: "红海榄",
		value: 4,
		dbhHelpText: "请输入0-12.5之间的小数",
		shapes: [shapeEnums.MACROPHANEROPHYTES],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "density"
			],
		}
	},
	{
		text: "木榄",
		value: 5,
		dbhHelpText: "请输入0-25之间的小数",
		shapes: [shapeEnums.MACROPHANEROPHYTES],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "basal", "height"
			],
		},
		needCalcType:true
	},
	{
		text: "海莲",
		value: 6,
		dbhHelpText: "请输入0-25之间的小数",
		shapes: [shapeEnums.MACROPHANEROPHYTES],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "basal", "height"
			],
		},
		needCalcType:true
	},
	{
		text: "尖瓣海莲",
		value: 7,
		dbhHelpText: "请输入0-25之间的小数",
		shapes: [shapeEnums.MACROPHANEROPHYTES],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "basal", "height"
			],
		},
		needCalcType:true
	},
	{
		text: "角木果",
		value: 8,
		dbhHelpText: "请输入0-8之间的小数",
		shapes: [shapeEnums.SMALL_MACROPHANEROPHYTES],
		fields: {
			[shapeEnums.SMALL_MACROPHANEROPHYTES.value]: [
				"dbh"
			],
		}
	},
	{
		text: "红树",
		value: 9,
		dbhHelpText: "请输入0-28之间的小数",
		shapes: [shapeEnums.MACROPHANEROPHYTES],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "density"
			],
		}
	},
	{
		text: "拉氏红树",
		value: 10,
		dbhHelpText: "请输入0-28之间的小数",
		shapes: [shapeEnums.MACROPHANEROPHYTES],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "density"
			],
		}
	},
	{
		text: "海桑属",
		value: 11,
		dbhHelpText: "请输入2.5-13.0之间的小数",
		shapes: [shapeEnums.MACROPHANEROPHYTES],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "height"
			],
		}
	},
	{
		text: "无瓣海桑",
		value: 12,
		dbhHelpText: "请输入6.1-13.0之间的小数",
		shapes: [shapeEnums.MACROPHANEROPHYTES],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "height"
			],
		}
	},
	{
		text: "未知",
		value: -1,
		shapes: [shapeEnums.MACROPHANEROPHYTES],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "density"
			],
		}
	},
]