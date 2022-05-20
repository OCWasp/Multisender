(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"5bcc":function(e,t,a){"use strict";a("624f")},"624f":function(e,t,a){},c149:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{staticClass:"q-mb-xl"},[a("div",{staticClass:"full-width text-center section-title q-mt-xl"},[e._v("\n      Welcome to TIP-3.1 Token MultiSender\n  ")]),a("div",{staticClass:"row col justify-center q-mt-lg",staticStyle:{"min-width":"450px"}},[a("q-stepper",{ref:"stepper",staticClass:"multisendCard col-md-8 col-sm-10 col-xs-12",attrs:{animated:"","active-color":"secondary","done-color":"secondary"},scopedSlots:e._u([{key:"navigation",fn:function(){return[a("q-stepper-navigation",[e.step>1?a("q-btn",{directives:[{name:"check-auth-on",rawName:"v-check-auth-on:click",value:function(){return e.previous()},expression:"() => previous()",arg:"click"}],staticClass:"but-bg1 fontStyle1 text-capitalize",attrs:{disable:e.loading.toContractloading||e.loading.summaryloading,flat:"",icon:"keyboard_arrow_left"}}):e._e(),3!==e.step?a("q-btn",{directives:[{name:"check-auth-on",rawName:"v-check-auth-on:click",value:function(){return e.next()},expression:"() => next()",arg:"click"}],staticClass:"but-bg1 fontStyle1 text-capitalize q-ml-sm",attrs:{disable:e.loading.withdraw||e.loading.summaryloading||2===e.step&&0===e.summaryData.totalTokens||2===e.step&&e.summaryData.Balance<e.summaryData.ReqApproveAmount,loading:e.loading.toContractloading,label:3===e.step?"Send":"Next"}}):e._e()],1)]},proxy:!0}]),model:{value:e.step,callback:function(t){e.step=t},expression:"step"}},[a("q-step",{attrs:{name:1,title:"Prepare",prefix:"1",done:e.step>1}},[a("div",{staticClass:"row col justify-center"},[a("div",{staticClass:"col-11 row inTitle q-my-sm",staticStyle:{display:"flex","align-items":"center"}},[e._v("\n            Token\n            "),a("q-space"),e.selToken&&e.isLogin?a("span",{staticStyle:{display:"flex","align-items":"center"}},[e._v("\n              balance:\n              "),e.loading.withdrawalBalance?e._e():a("span",{staticClass:"q-ml-sm"},[e._v(e._s(e.withdrawalBalance)+" "+e._s(e.selToken.label))]),e.loading.withdrawalBalance?a("q-skeleton",{staticClass:"text-h5 q-ml-sm",attrs:{width:"50px",type:"text"}}):e._e(),!e.loading.withdrawalBalance&&e.withdrawalBalance>0?a("q-btn",{directives:[{name:"check-auth-on",rawName:"v-check-auth-on:click",value:function(){return e.withdraw()},expression:"() => withdraw()",arg:"click"}],staticClass:"but-bg1 fontStyle1 text-capitalize q-ml-sm",attrs:{dense:"",label:"withdraw",disable:e.loading.withdraw,loading:e.loading.withdraw}}):e._e()],1):e._e()],1),a("q-select",{staticClass:"col-11",attrs:{loading:e.loading.searchToken,color:"secondary",dense:"",outlined:"","use-input":"","input-style":"font-size: 16px;font-weight: 300;line-height: 20px;color: #fff;",options:e.filterTokens,"options-selected-class":"actionOption",placeholder:e.selToken&&""!==e.selToken?"":"Select your Token"},on:{filter:e.filterFn},scopedSlots:e._u([{key:"prepend",fn:function(){return[a("q-icon",{staticClass:"text-white",attrs:{size:"sm",name:"search"}})]},proxy:!0},{key:"selected-item",fn:function(t){return[t.opt?a("div",[t.opt.icon?a("q-avatar",{attrs:{size:"md"}},[a("img",{attrs:{src:t.opt.icon}})]):e._e(),t.opt.icon?e._e():a("q-icon",{attrs:{size:"md",name:"img:/avatar/"+t.opt.address.substr(t.opt.address.length-1,1)+".svg"}}),a("span",{staticClass:"contentFont q-ml-sm"},[e._v("\n                  "+e._s(t.opt.label)+"\n                ")]),a("span",{staticClass:"fontStyle3 q-ml-sm"},[e._v("\n                  "+e._s(e._f("addressFmt")(t.opt.address,15,6))+"\n                ")])],1):e._e()]}},{key:"option",fn:function(t){return[a("q-item",e._g(e._b({staticClass:"optionFont"},"q-item",t.itemProps,!1),t.itemEvents),[t.opt.icon?a("q-avatar",{attrs:{size:"md"}},[a("img",{attrs:{src:t.opt.icon}})]):e._e(),t.opt.icon?e._e():a("q-icon",{attrs:{size:"md",name:"img:/avatar/"+t.opt.address.substr(t.opt.address.length-1,1)+".svg"}}),a("q-item-section",{staticClass:"q-ml-sm"},[e._v("\n                  "+e._s(t.opt.label)+"\n                  "),a("span",{staticClass:"fontStyle3"},[e._v("\n                    "+e._s(e._f("addressFmt")(t.opt.address,15,6))+"\n                  ")])])],1)]}},{key:"no-option",fn:function(){return[a("q-item",{staticClass:"optionFont"},[a("q-item-section",{staticClass:"text-grey"},[e._v("\n                  No results\n                ")])],1)]},proxy:!0}]),model:{value:e.selToken,callback:function(t){e.selToken=t},expression:"selToken"}}),a("div",{staticClass:"col-11 inTitle q-my-sm row"},[e._v("\n            Addresses with Amounts\n            "),a("q-space"),a("span",{staticClass:"cursor-pointer",on:{click:function(t){e.showUpLoadFile=!e.showUpLoadFile}}},[e._v(e._s(e.showUpLoadFile?"Insert manually":"Upload file"))])],1),e.showUpLoadFile?e._e():a("div",{staticClass:"col-11"},[a("q-input",{attrs:{filled:"",type:"textarea",color:"secondary","input-style":"font-size: 14px;font-weight: 300;line-height: 20px;color: #fff;height:300px;",placeholder:"The address and amount are separated by commas"},model:{value:e.InputText,callback:function(t){e.InputText=t},expression:"InputText"}})],1),e.showUpLoadFile?e._e():a("div",{staticClass:"col-11 inTitle q-my-sm row"},[a("span",{staticClass:"fontStyle3 q-mr-md"},[e._v("Top 255")]),a("span",{staticClass:"fontStyle3"},[e._v("The address and amount are separated by commas")])]),e.loading.withdraw?a("div",{staticClass:"col-11 alertFont q-my-sm text-info"},[e._v("Please wait a while after clicking the withdraw button, Wait for the withdraw succceeded")]):e._e(),e.showUpLoadFile?a("div",{staticClass:"col-11 multisendCard",staticStyle:{height:"200px"}},[a("div",{staticClass:"full-width row justify-center q-mt-xl",staticStyle:{height:"100px"}},[a("input",{staticClass:"input-file",staticStyle:{display:"none"},attrs:{type:"file",accept:".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"},on:{change:e.importData}}),e.loading.uploading?e._e():a("q-icon",{staticClass:"pointer",attrs:{size:"xl",name:"img:/icons/upload.png"},on:{click:e.importFile}}),e.loading.uploading?a("q-spinner",{staticClass:"q-mr-sm",attrs:{color:"white",size:"3.5em"}}):e._e(),a("div",{staticClass:"full-width contentFont text-center"},[e._v("Drop your files here or click to upload")])],1)]):e._e(),e.showUpLoadFile?a("div",{staticClass:"col-11 inTitle q-my-sm row",on:{click:e.exportExample}},[a("q-space"),a("span",{staticClass:"fontStyle3 q-mr-sm"},[e._v("Top 255")]),a("span",{staticClass:"fontStyle3 cursor-pointer",staticStyle:{"text-decoration":"underline"}},[e._v("Download examples")])],1):e._e()],1)]),a("q-step",{attrs:{name:2,title:"Confirm",prefix:"2",done:e.step>2}},[a("div",{staticClass:"row col justify-center"},[a("div",{staticClass:"col-11 inTitle q-my-sm"},[e._v("List of recipients")]),a("q-table",{staticClass:"multisendCard contentFont col-11",attrs:{data:e.confirmData,columns:e.columns,"row-key":"number","binary-state-sort":""},scopedSlots:e._u([{key:"body",fn:function(t){return[a("q-tr",{attrs:{props:t}},[a("q-td",{key:"number",attrs:{props:t}},[e._v("\n                  "+e._s(t.row.number)+"\n                ")]),a("q-td",{key:"address",attrs:{props:t}},[e._v("\n                  "+e._s(t.row.address)+"\n                ")]),a("q-td",{key:"amount",attrs:{props:t}},[e._v("\n                  "+e._s(t.row.amount)+"\n                ")]),a("q-td",{key:"operate",attrs:{props:t}},[a("q-btn",{staticClass:"fontStyle1 text-capitalize",attrs:{flat:"",label:"Remove"},on:{click:function(a){return e.removeData(t.row.number)}}})],1)],1)]}}])}),a("div",{staticClass:"col-11 inTitle q-my-sm"},[e._v("Summary")]),e.loading.summaryloading?e._e():a("div",{staticClass:"multisendCard contentFont row col col-11 justify-center"},[a("q-item",{staticClass:"col-xs-12 col-sm-6 borderStyle1"},[a("q-item-section",[a("q-item-label",[e._v(e._s(e.summaryData.ReqApproveAmount)+" "+e._s(e.summaryData.selToken.label))]),a("q-item-label",{staticClass:"fontStyle3"},[e._v("Request approve amount")])],1)],1),a("q-item",{staticClass:"col-xs-12 col-sm-6 borderStyle1"},[a("q-item-section",[a("q-item-label",[e._v(e._s(e.summaryData.currentAllowance)+" "+e._s(e.summaryData.selToken.label))]),a("q-item-label",{staticClass:"fontStyle3"},[e._v("Your current allowance")])],1)],1),a("q-item",{staticClass:"col-xs-12 col-sm-6 borderStyle1"},[a("q-item-section",[a("q-item-label",[e._v(e._s(e.summaryData.totalAds))]),a("q-item-label",{staticClass:"fontStyle3"},[e._v("Total number of addresses")])],1)],1),a("q-item",{staticClass:"col-xs-12 col-sm-6 borderStyle1"},[a("q-item-section",[a("q-item-label",[e._v(e._s(e.summaryData.totalTokens)+" "+e._s(e.summaryData.selToken.label))]),a("q-item-label",{staticClass:"fontStyle3"},[e._v("Total number of tokens to be sent")])],1)],1),a("q-item",{staticClass:"col-xs-12 col-sm-6 borderStyle1"},[a("q-item-section",[a("q-item-label",[e._v(e._s(e.summaryData.totalTran))]),a("q-item-label",{staticClass:"fontStyle3"},[e._v("Total number of transactions needes")])],1)],1),a("q-item",{staticClass:"col-xs-12 col-sm-6 borderStyle1"},[a("q-item-section",[a("q-item-label",[e._v(e._s(e.summaryData.Balance)+" "+e._s(e.summaryData.selToken.label))]),a("q-item-label",{staticClass:"fontStyle3"},[e._v("Your token balance")])],1)],1),a("q-item",{staticClass:"col-xs-12 col-sm-6 borderStyle1"},[a("q-item-section",[a("q-item-label",[e._v(e._s(e._f("decimalFmt")(e.summaryData.gas*Math.pow(10,-9),9))+" EVER")]),a("q-item-label",{staticClass:"fontStyle3"},[e._v("Approximate cost of operation")])],1)],1),a("q-item",{staticClass:"col-xs-12 col-sm-6 borderStyle1"},[a("q-item-section",[a("q-item-label",[e._v(e._s(e._f("decimalFmt")(e.summaryData.everBalance,9))+" EVER")]),a("q-item-label",{staticClass:"fontStyle3"},[e._v("Your EVER balance")])],1)],1)],1),e.loading.summaryloading?a("div",{staticClass:"multisendCard contentFont row col col-11 justify-center"},e._l(6,(function(e,t){return a("q-item",{key:t,staticClass:"col-xs-12 col-sm-6 borderStyle1"},[a("q-item-section",[a("q-item-label",[a("q-skeleton",{attrs:{type:"text"}})],1),a("q-item-label",{staticClass:"fontStyle3"},[a("q-skeleton",{attrs:{type:"text"}})],1)],1)],1)})),1):e._e(),e.hasToContract?a("div",{staticClass:"col-11 alertFont q-my-sm text-secondary"},[e._v("Request approve succceeded! Please click next")]):e._e(),e.loading.toContractloading?a("div",{staticClass:"col-11 alertFont q-my-sm text-info"},[e._v("Please wait a while after clicking the send button, Wait for the "+e._s(e.hasToContract?"transfer ":"Request approve ")+" succceeded")]):e._e(),!e.loading.summaryloading&&2===e.step&&e.summaryData.Balance<e.summaryData.ReqApproveAmount?a("div",{staticClass:"col-11 alertFont q-my-sm text-warning"},[e._v("Insufficient "+e._s(e.summaryData.selToken.label)+" balance,Please hava at least "+e._s(e.summaryData.ReqApproveAmount)+" "+e._s(e.summaryData.selToken.label))]):e._e()],1)]),a("q-step",{attrs:{name:3,title:"Send",prefix:"3",icon:"add_comment"}},[a("div",{staticClass:"row col justify-center"},[e.batchSuccess?a("div",{staticClass:"col-11 sendTitle text-center"},[e._v("total of "+e._s(e.summaryData.totalTran)+" needs to be sent, "+e._s(e.summaryData.totalTran)+" have been sent successfully")]):e._e(),e.batchSuccess?e._e():a("div",{staticClass:"col-11 sendTitle text-center"},[e._v("Timeout for getting transfer result")]),a("div",{staticClass:"col-11 q-pa-md"},[a("q-input",{attrs:{filled:"",type:"textarea",readonly:"","input-style":"font-size: 14px;font-weight: 300;line-height: 20px;color: #fff;height:300px;max-height:300px"},model:{value:e.confirmText,callback:function(t){e.confirmText=t},expression:"confirmText"}})],1)])])],1)],1)])},n=[],o=a("c973"),r=a.n(o),i=a("ded3"),c=a.n(i),l=(a("96cf"),a("4d63"),a("c607"),a("ac1f"),a("2c3e"),a("25f0"),a("4de4"),a("d3b7"),a("e260"),a("5cc6"),a("907a"),a("9a8c"),a("a975"),a("735e"),a("c1ac"),a("d139"),a("3a7b"),a("d5d6"),a("82f8"),a("e91f"),a("60bd"),a("5f96"),a("3280"),a("3fcc"),a("ca91"),a("25a1"),a("cd26"),a("3c5d"),a("2954"),a("649e"),a("219c"),a("170b"),a("b39a"),a("72f7"),a("5319"),a("5b81"),a("e9c4"),a("498a"),a("1276"),a("99af"),a("00b4"),a("a357")),d=a("2f62"),m=a("cfd7"),u=a("901e"),f=a.n(u),p="^(0|-1):[0-9a-fA-F]{64}$",h="^\\d+(\\.\\d+)?$",b=new RegExp(p),g=new RegExp(h),w={name:"PageIndex",data:function(){return{loading:{uploading:!1,summaryloading:!1,toContractloading:!1,searchToken:!1,withdrawalBalance:!1,withdraw:!1},exampleCol:[{name:"address",align:"center",label:"Address",field:"address"},{name:"amount",align:"center",label:"Amount",field:"amount"}],step:1,sumTokens:[{label:"WEVER",decimals:9,address:"0:a49cd4e158a9a15555e624759e2e4e766d22600b7800d891e46f9291f044a93d",icon:"https://raw.githubusercontent.com/broxus/ton-assets/master/icons/WEVER/logo.svg"},{label:"DAI",decimals:18,address:"0:eb2ccad2020d9af9cec137d3146dde067039965c13a27d97293c931dae22b2b9",icon:"https://raw.githubusercontent.com/broxus/ton-assets/master/icons/DAIv3/logo.svg"},{label:"USDT",decimals:6,address:"0:a519f99bb5d6d51ef958ed24d337ad75a1c770885dcd42d51d6663f9fcdacfb2",icon:"https://raw.githubusercontent.com/broxus/ton-assets/master/icons/USDTv3/logo.svg"},{label:"USDC",decimals:6,address:"0:c37b3fafca5bf7d3704b081fde7df54f298736ee059bf6d32fac25f5e6085bf6",icon:"https://raw.githubusercontent.com/broxus/ton-assets/master/icons/USDCv3/logo.svg"},{label:"WBTC",decimals:8,address:"0:2ba32b75870d572e255809b7b423f30f36dd5dea075bd5f026863fceb81f2bcf",icon:"https://raw.githubusercontent.com/broxus/ton-assets/master/icons/WBTCv3/logo.svg"},{label:"WETH",decimals:18,address:"0:59b6b64ac6798aacf385ae9910008a525a84fc6dcf9f942ae81f8e8485fe160d",icon:"https://raw.githubusercontent.com/broxus/ton-assets/master/icons/WETHv3/logo.svg"},{label:"BRIDGE",decimals:9,address:"0:f2679d80b682974e065e03bf42bbee285ce7c587eb153b41d761ebfd954c45e1",icon:"https://raw.githubusercontent.com/broxus/ton-assets/master/icons/BRIDGE/logo.svg"},{label:"QUBE",decimals:9,address:"0:9f20666ce123602fd7a995508aeaa0ece4f92133503c0dfbd609b3239f3901e2",icon:"https://raw.githubusercontent.com/broxus/ton-assets/master/icons/QUBE/logo.svg"},{label:"FRAX",decimals:18,address:"0:efed9f9a7e6c455ee60829fd003b2f42edda513c6f19a484f916b055e9aa58d2",icon:"https://raw.githubusercontent.com/broxus/ton-assets/master/icons/FRAX/logo.svg"},{label:"FXS",decimals:18,address:"0:c14e2f026feaae0f99b92c04ee421051a782fff60156ac8a586a12f63d7facef",icon:"https://raw.githubusercontent.com/broxus/ton-assets/master/icons/FXS/logo.svg"},{label:"DAF",decimals:18,address:"0:f48054939064d686a9ad68d96d9ab79e409b095557c06ab7f073097dade7057f",icon:"https://raw.githubusercontent.com/broxus/ton-assets/master/icons/DAF/logo.svg"},{label:"EURS",decimals:2,address:"0:00ca16398f314a9b3bed582dc69582515d866ededb6c4e18190f63b305cedf91",icon:"https://raw.githubusercontent.com/broxus/ton-assets/master/icons/EURS/logo.svg"},{label:"EUPi",decimals:8,address:"0:0cfa60f9454b1b619938c4da6a138b1cc62da937b3f6c0506405daf2a88e0115",icon:"https://raw.githubusercontent.com/broxus/ton-assets/master/icons/EUPi/logo.svg"},{label:"EVS",decimals:9,address:"0:e5d964bf76b90a29ca11ff03a0402eeca6a1c79a0fb4d8a2f06a67be0537a6bf",icon:"https://raw.githubusercontent.com/broxus/ton-assets/master/icons/EVS/logo.svg"},{label:"SOON",decimals:18,address:"0:a15e6a7a91c331ddcd85675ca64d5a7db8c7e94b35806b2e05bf4bce29d21023",icon:"https://raw.githubusercontent.com/broxus/ton-assets/master/icons/SOON/logo.svg"},{label:"GRE",decimals:5,address:"0:fde4c629d6447fecd86d2cffe363d5f334030351022bad019e0f472212e9dc99",icon:"https://raw.githubusercontent.com/broxus/ton-assets/master/icons/GRE/logo.svg"},{label:"BAPBAPA",decimals:9,address:"0:9e0350c13cafe2bb55d906553fde5f357612e6dcb46c0c3440c7bfdda273ffdd",icon:"https://raw.githubusercontent.com/broxus/ton-assets/master/icons/BAPBAPA/logo.svg"},{label:"RUM",decimals:9,address:"0:38a4c196c7fe22cbf0cda034ddda284aa208e2dba7707b96f65914420ba3f580",icon:"https://raw.githubusercontent.com/broxus/ton-assets/master/icons/RUM/logo.svg"},{label:"DUSA",decimals:2,address:"0:b3ed4b9402881c7638566b410dda055344679b065dce19807497c62202ba9ce3",icon:"https://raw.githubusercontent.com/broxus/ton-assets/master/icons/DUSA/logo.svg"},{label:"COLA",decimals:9,address:"0:9dd2cd82cbfd74a963be1ef1fd1a1f3e25f60e0b8c742f8b862df378b9a5e265",icon:"https://raw.githubusercontent.com/broxus/ton-assets/master/icons/COLA/logo.svg"},{label:"LEND",decimals:9,address:"0:679a05316a324d0daa2724ab7d8e9768a2d1042863299323e969a174a8412a58",icon:"https://raw.githubusercontent.com/broxus/ton-assets/master/icons/LEND/logo.svg"}],filterTokens:[],selToken:"",columns:[{name:"number",align:"center",label:"#",field:"number",style:"width: 10px"},{name:"address",align:"center",label:"Address",field:"address"},{name:"amount",align:"center",label:"Amount",field:"amount",sortable:!0},{name:"operate",align:"center",label:"   ",field:"number"}],withdrawalBalance:0,showUpLoadFile:!1,InputText:"",confirmData:[],summaryData:{selToken:"",ReqApproveAmount:0,currentAllowance:0,totalAds:0,totalTokens:0,totalTran:0,Balance:0,gas:.1,everBalance:0},hasToContract:!1,confirmText:"",checkCount:0,batchSuccess:!1}},computed:c()(c()({},Object(d["d"])("user",{user:"profile"})),Object(d["b"])("user",{isLogin:"hasLogin"})),methods:c()(c()({},Object(d["c"])("user",["renewBalance"])),{},{filterFn:function(e,t){var a=this;this.selToken&&(e=this.selToken.label),t(""!==e?r()(regeneratorRuntime.mark((function t(){var s,n,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a.loading.searchToken=!0,s=e.toLowerCase(),n=a.sumTokens.filter((function(e){return e.label.toLowerCase().indexOf(s)>-1||e.address===s})),!(n.length>0)){t.next=7;break}a.filterTokens=n,t.next=11;break;case 7:return t.next=9,m["a"].getTokenInfo(s);case 9:o=t.sent,o?(a.sumTokens.push(o),a.filterTokens=[o]):a.filterTokens=[];case 11:a.loading.searchToken=!1;case 12:case"end":return t.stop()}}),t)}))):function(){a.filterTokens=a.sumTokens})},removeData:function(e){this.confirmData=this.confirmData.filter((function(t){return t.number!==e})),this.renewSummaryData()},previous:function(){2===this.step?(this.step=1,this.loading.toContractloading=!1,this.hasToContract=!1):3===this.step&&(this.step=2,this.loadSummaryData())},next:function(){1===this.step?this.secondStep():2===this.step&&this.transfer()},transfer:function(){var e=this;return r()(regeneratorRuntime.mark((function t(){var a,s,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.loading.toContractloading=!0,e.hasToContract){t.next=19;break}return t.next=4,m["a"].transferToContract(e.selToken.address,e.user.address,e.summaryData.ReqApproveAmount,e.selToken.decimals);case 4:if(a=t.sent,!a){t.next=15;break}return e.hasToContract=a,e.summaryData.currentAllowance=e.summaryData.totalTokens,t.t0=e,t.next=11,m["a"].getBalance(e.user.address);case 11:t.t1=t.sent,t.t0.renewBalance.call(t.t0,t.t1),t.next=16;break;case 15:console.log("try transferToContract ...");case 16:e.loading.toContractloading=!1,t.next=35;break;case 19:return t.next=21,m["a"].batchTransfer(e.user.address,e.confirmData,e.selToken.decimals,e.summaryData.gas);case 21:if(s=t.sent,!s){t.next=33;break}return t.t2=e,t.next=26,m["a"].getBalance(e.user.address);case 26:t.t3=t.sent,t.t2.renewBalance.call(t.t2,t.t3),n=parseFloat(new f.a(e.summaryData.currentAllowance).minus(e.summaryData.totalTokens).toString()),e.batchSuccess=!1,e.timer=setInterval((function(){e.checkBatchTransfer(n)}),1e4),t.next=35;break;case 33:e.loading.toContractloading=!1,console.log("try batchTransfer ...");case 35:case"end":return t.stop()}}),t)})))()},checkBatchTransfer:function(e){var t=this;console.log("checkBatchTransfer ..."),this.checkCount++,m["a"].getDeposit(this.selToken.decimals).then((function(a){t.this.withdrawalBalance=a,e===a?(clearInterval(t.timer),t.checkCount=0,t.jsonToText(),t.batchSuccess=!0,t.step=3,t.hasToContract=!1,t.loading.toContractloading=!1):12===t.checkCount&&(clearInterval(t.timer),t.checkCount=0,t.jsonToText(),t.batchSuccess=!1,t.step=3,t.hasToContract=!1,t.loading.toContractloading=!1)}))},secondStep:function(){var e=this;return r()(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.textToJson()){t.next=2;break}return t.abrupt("return");case 2:if(""!==e.selToken&&e.selToken){t.next=5;break}return e.$q.notify({message:"Please select Token",color:"dark"}),t.abrupt("return");case 5:e.step=2,e.loadSummaryData();case 7:case"end":return t.stop()}}),t)})))()},loadSummaryData:function(){var e=this;return r()(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loading.summaryloading=!0,e.summaryData.selToken=e.selToken,t.next=4,m["a"].getWalletBalance(e.selToken.address,e.user.address,e.selToken.decimals);case 4:return e.summaryData.Balance=t.sent,t.next=7,m["a"].getBalance(e.user.address);case 7:return e.summaryData.everBalance=t.sent,e.renewBalance(e.summaryData.everBalance),m["a"].getDeposit(e.selToken.decimals).then((function(t){e.summaryData.currentAllowance=t||0})),t.next=12,e.renewSummaryData();case 12:e.loading.summaryloading=!1;case 13:case"end":return t.stop()}}),t)})))()},renewSummaryData:function(){var e=this;return r()(regeneratorRuntime.mark((function t(){var a,s,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:for(e.loading.summaryloading=!0,a=new f.a(0),s=[],n=0;n<e.confirmData.length;n++)a=a.plus(new f.a(e.confirmData[n].amount)),-1===s.indexOf(e.confirmData[n].address)&&s.push(e.confirmData[n].address);return e.summaryData.totalAds=s.length,e.summaryData.totalTran=e.confirmData.length,t.next=8,m["a"].totalTransferGas(e.summaryData.totalTran);case 8:if(e.summaryData.gas=t.sent,0!==e.confirmData.length){t.next=13;break}t.t0=0,t.next=16;break;case 13:return t.next=15,m["a"].getTotalAmount(e.confirmData,e.selToken.decimals);case 15:t.t0=t.sent;case 16:e.summaryData.totalTokens=t.t0,e.summaryData.currentAllowance>=e.summaryData.totalTokens?(e.summaryData.ReqApproveAmount=0,e.hasToContract=e.summaryData.totalTokens>0):e.summaryData.ReqApproveAmount=parseFloat(new f.a(e.summaryData.totalTokens).minus(e.summaryData.currentAllowance).toString()),e.loading.summaryloading=!1;case 19:case"end":return t.stop()}}),t)})))()},withdraw:function(){var e=this;this.loading.withdraw=!0;var t=[{number:1,address:this.user.address,amount:this.withdrawalBalance}];m["a"].totalTransferGas(1).then((function(a){m["a"].batchTransfer(e.user.address,t,e.selToken.decimals,a).then((function(t){t?(m["a"].getBalance(e.user.address).then((function(t){e.renewBalance(t)})),e.timer=setInterval((function(){e.checkWithdraw()}),1e4)):e.loading.withdraw=!1}))}))},checkWithdraw:function(){var e=this;console.log("checkWithdraw ..."),this.checkCount++;var t=this;m["a"].getDeposit(this.selToken.decimals).then((function(a){0===a?(clearInterval(e.timer),e.checkCount=0,e.loading.withdraw=!1,t.$q.notify({message:"Withdrawal success",color:"dark"}),e.withdrawalBalance=0):12===e.checkCount&&(clearInterval(e.timer),e.checkCount=0,e.loading.withdraw=!1,t.$q.notify({message:"Timeout for getting withdrawal result",color:"dark"}))}))},deploy:function(){var e=this;this.loading.withdrawalBalance=!0,m["a"].deploy(this.user.address,this.selToken.address).then((function(t){t?(m["a"].getDeposit(e.selToken.decimals).then((function(t){e.withdrawalBalance=t||0,e.loading.withdrawalBalance=!1})),m["a"].getBalance(e.user.address).then((function(t){e.renewBalance(t)}))):(e.withdrawalBalance=0,e.selToken=null,e.loading.withdrawalBalance=!1,e.$q.notify({message:"Contract deployment failed.",color:"dark"}))}))},exportExample:function(){var e='"0:7d46a1ff2ccf9a140bf21d1baa4a857fc02564e1cdd0095b3cfa51bd624e9d9a","100"\r\n"0:6057102d77ebafed4e0b503b5ae6802c2151b40e58e4458924c724412905be2d","1"',t=Object(l["a"])("example.csv",e,"text/csv");!0!==t&&this.$q.notify({message:"Browser denied file download...",color:"negative",icon:"warning"})},importFile:function(){document.querySelector(".input-file").click()},importData:function(e){if(e.currentTarget.files.length){this.loading.uploading=!0;var t=this,a=e.currentTarget.files[0],s=new FileReader;FileReader.prototype.readAsBinaryString=function(e){var a="",s=new FileReader;s.onload=function(e){for(var n=new Uint8Array(s.result),o=n.byteLength,r=0;r<o;r++)a+=String.fromCharCode(n[r]);t.parseImport(a)},s.readAsArrayBuffer(e)},s.readAsBinaryString(a),this.loading.uploading=!1}},parseImport:function(e){var t="",a=JSON.stringify(e.trim()).replaceAll('\\"',"").replaceAll('"',""),s=a.split("\\r\\n");if(console.log("importArr.length:",s.length),s.length>255)this.$q.notify({message:"More than 255 pieces of data",color:"dark"});else{for(var n=0;n<s.length;n++){var o=s[n];""!==o.trim()&&(t=n===s.length-1?t.concat(o):t.concat(o,"\n"))}this.InputText=t,this.showUpLoadFile=!this.showUpLoadFile}},textToJson:function(){var e=[];if(""===this.InputText.trim())return this.$q.notify({message:"Please enter transfer data",color:"dark"}),!1;var t=this.InputText.trim().split("\n"),a=0;if(!(t.length>0&&t.length<=255))return this.$q.notify({message:0===t.length?"Please enter transfer data":"More than 255 pieces of data",color:"dark"}),!1;for(var s=0;s<t.length;s++){var n=t[s],o=n.split(",");if(2!==o.length)return this.$q.notify({message:"There is an error near : "+n,color:"dark"}),!1;if(a++,""===o[1].trim())return this.$q.notify({message:"Missing amount near : "+n,color:"dark"}),!1;if(!g.test(o[1].trim()))return this.$q.notify({message:"Incorrect amount format near "+n,color:"dark"}),!1;if(""===o[0].trim())return this.$q.notify({message:"Missing address near ："+n,color:"dark"}),!1;if(!b.test(o[0].trim()))return this.$q.notify({message:"Incorrect address format near "+n,color:"dark"}),!1;e.push({number:a,address:o[0],amount:o[1]})}return this.confirmData=e,!0},jsonToText:function(){for(var e="",t=0;t<this.confirmData.length;t++){var a=this.confirmData[t];e=e.concat(t+1," - ",a.address,",",a.amount,"\n")}this.confirmText=e}}),watch:{selToken:function(e,t){this.isLogin&&(null===e?this.withdrawalBalance=0:this.deploy())},isLogin:function(){this.isLogin&&(this.selToken?this.deploy():this.withdrawalBalance=0)}}},v=w,y=(a("5bcc"),a("2877")),k=a("9989"),x=a("f531"),T=a("87fe"),q=a("2c91"),C=a("293e"),_=a("9c40"),D=a("ddd8"),S=a("0016"),A=a("cb32"),B=a("66e5"),R=a("4074"),F=a("27f9"),E=a("0d59"),I=a("eaac"),U=a("bd08"),L=a("db86"),Q=a("0170"),P=a("b19c"),$=a("eebe"),j=a.n($),O=Object(y["a"])(v,s,n,!1,null,"a1e024e2",null);t["default"]=O.exports;j()(O,"components",{QPage:k["a"],QStepper:x["a"],QStep:T["a"],QSpace:q["a"],QSkeleton:C["a"],QBtn:_["a"],QSelect:D["a"],QIcon:S["a"],QAvatar:A["a"],QItem:B["a"],QItemSection:R["a"],QInput:F["a"],QSpinner:E["a"],QTable:I["a"],QTr:U["a"],QTd:L["a"],QItemLabel:Q["a"],QStepperNavigation:P["a"]})}}]);