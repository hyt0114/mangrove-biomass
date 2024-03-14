import uni from "@dcloudio/vite-plugin-uni";
import pxtorem from "postcss-pxtorem";
import {defineConfig} from "vite";
export default defineConfig({
  plugins: [
	uni()
  ],
  css:{
	  postcss:{
		  plugins:[
			  pxtorem({
				  rootValue({
				  	file
				  }) {
				  	return 16
				  },
				  propList: ['*'],
				  selectorBlackList: ["fixedpx"]
			  })
		  ]
	  }
  }
})