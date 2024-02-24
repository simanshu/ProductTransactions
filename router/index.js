const express=require("express")
const router=express.Router()
const initialize=require('./initialize')
const transaction=require('./transaction')
const statistics=require('./statics')
const barChartRoutes=require('./barchart')
const pieChartRoutes=require('./piechart')
const combinedDataRoutes=require('./combineData')

router.use("/v1",initialize)
router.use("/v1",transaction)
router.use("/v1",statistics)
router.use("/v1",barChartRoutes)
router.use("/v1",pieChartRoutes)
router.use("/v1",combinedDataRoutes)

module.exports=router;