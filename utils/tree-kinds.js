import {
	shapeEnums
} from "./enums.js"
export const mangroveKinds = [{
		text: "桐花树",
		value: 1,
		dbhHelpText: "请输入4-20之间的小数",
		shapes: [{
				...shapeEnums.MACROPHANEROPHYTES,
				tip: "建议树高4米以上"
			},
			{
				...shapeEnums.SMALL_MACROPHANEROPHYTES,
				tip: "建议树高2-4米"
			}, {
				...shapeEnums.UNDERGROWTH,
				tip: "建议树高2米以下 "
			}
		],
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
		},
		img: "/static/img/trees/kandelia.png"
	},
	{
		text: "秋茄",
		value: 2,
		dbhHelpText: "请输入4-15之间的小数",
		shapes: [{
				...shapeEnums.MACROPHANEROPHYTES,
				tip: "建议树高3米以上"
			}, {
				...shapeEnums.UNDERGROWTH,
				tip: "建议树高1.3米以下 "
			}, {
				...shapeEnums.SMALL_MACROPHANEROPHYTES,
				tip: "建议树高1.5米左右"
			},
			{
				...shapeEnums.YOUNG,
				tip: "建议树高2米以下 "
			}
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
		},
		img: "/static/img/trees/kandelia.png"
	},
	{
		text: "白骨壤",
		value: 3,
		dbhHelpText: "请输入0-35之间的小数",
		shapes: [{
			...shapeEnums.MACROPHANEROPHYTES,
			tip: "建议树高2米以上"
		}, {
			...shapeEnums.SHRUB,
			tip: "建议树高2米以上"
		}],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "height"
			],
			[shapeEnums.SHRUB.value]: [
				"basal", "height", "crown"
			],
		},
		img: "/static/img/trees/kandelia.png"
	},
	{
		text: "红海榄",
		value: 4,
		dbhHelpText: "请输入0-12.5之间的小数",
		shapes: [{
			...shapeEnums.MACROPHANEROPHYTES,
			tip: "建议树高4-6.5米"
		}],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "density"
			],
		},
		img: "/static/img/trees/kandelia.png"
	},
	{
		text: "木榄",
		value: 5,
		dbhHelpText: "请输入0-25之间的小数",
		shapes: [{
			...shapeEnums.MACROPHANEROPHYTES,
			tip: "建议胸径小于25厘米"
		}],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "basal", "height"
			],
		},
		needCalcType: true,
		img: "/static/img/trees/kandelia.png"
	},
	{
		text: "海莲",
		value: 6,
		dbhHelpText: "请输入0-25之间的小数",
		shapes: [{
			...shapeEnums.MACROPHANEROPHYTES,
			tip: "建议胸径小于25厘米"
		}],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "basal", "height"
			],
		},
		needCalcType: true,
		img: "/static/img/trees/kandelia.png"
	},
	{
		text: "尖瓣海莲",
		value: 7,
		dbhHelpText: "请输入0-25之间的小数",
		shapes: [{
			...shapeEnums.MACROPHANEROPHYTES,
			tip: "建议胸径小于25厘米"
		}],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "basal", "height"
			],
		},
		needCalcType: true,
		img: "/static/img/trees/kandelia.png"
	},
	{
		text: "角木果",
		value: 8,
		dbhHelpText: "请输入0-8之间的小数",
		shapes: [{
			...shapeEnums.SMALL_MACROPHANEROPHYTES,
			tip: "建议胸径小于8厘米"
		}],
		fields: {
			[shapeEnums.SMALL_MACROPHANEROPHYTES.value]: [
				"dbh"
			],
		},
		img: "/static/img/trees/kandelia.png"
	},
	{
		text: "红树",
		value: 9,
		dbhHelpText: "请输入0-28之间的小数",
		shapes: [{
			...shapeEnums.MACROPHANEROPHYTES,
			tip: "建议胸径小于28厘米"
		}],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh"
			],
		},
		img: "/static/img/trees/kandelia.png"
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
		},
		img: "/static/img/trees/kandelia.png"
	},
	{
		text: "海桑属",
		value: 11,
		dbhHelpText: "请输入2.5-13.0之间的小数",
		shapes: [{
			...shapeEnums.MACROPHANEROPHYTES,
			tip: "建议树高3-7米"
		}],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "height"
			],
		},
		img: "/static/img/trees/kandelia.png"
	},
	{
		text: "无瓣海桑",
		value: 12,
		dbhHelpText: "请输入6.1-13.0之间的小数",
		shapes: [{
			...shapeEnums.MACROPHANEROPHYTES,
			tip: "建议树高6-13米"
		}],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "height"
			],
		},
		img: "/static/img/trees/kandelia.png"
	},
	{
		text: "未知",
		value: -1,
		shapes: [{
			...shapeEnums.MACROPHANEROPHYTES,
			tip: "建议胸径小于45厘米"
		}],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "density"
			],
		},
		img: "/static/img/trees/kandelia.png"
	},
]