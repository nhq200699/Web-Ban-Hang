const jwt               = require('./jwt');
const moment            = require('moment');
const CATEGORY_COLL       = require('../models/category');
const PRODUCT_COLL       = require('../models/product');
const PROMOTION_COLL       = require('../models/promotion');
const ORDER_COLL       = require('../models/order');
PRODUCT_MOD  = require('../database/product');


let renderToView = async function(req, res, view, data) {
    let { token } = req.session;

    let cartArr = req.session.cart;  
    if(!cartArr){
        data.cartArr = undefined;
    }else{
        data.cartArr = cartArr
    }
    let listProduct = await PRODUCT_COLL.getList();
    let listOrder = await ORDER_COLL.getList();
    let listCategory = await CATEGORY_COLL.getList();
    let listPromotion = await PROMOTION_COLL.getList();
    if(token) {
        let user = await jwt.verify(token);
        data.infoUser = user.data;
    } else {
        data.infoUser = undefined;
    }
    data.moment         = moment;
    data.listProduct    = listProduct.data;
    data.listOrder    = listOrder.data;
    data.listPromotion    = listPromotion.data;
    data.listCategory       = listCategory.data;

    let arrayOrder = await ORDER_COLL.getList();
    let arrayOrder1 = arrayOrder.data;
    let arrOrderForFile = [];
    if( arrayOrder1 && arrayOrder1.length > 0){
        arrayOrder1.forEach( item => {
                item.products.forEach( Element =>{
                    arrOrderForFile.push( Element._id);
                })   
        })
    }
    var counts = {};
    arrOrderForFile.forEach(
        function (x) {
            counts[x] = (counts[x] || 0)+1; 
        });
        // console.log({counts});
    keysSorted = Object.keys(counts).sort(function(a,b){return counts[b]-counts[a]})
    // console.log(keysSorted);

    let arrBestSales = [];
    let value1 = 0;
    for (const [key, value] of Object.entries(counts)) {
        value1 = value1 + 1;
        if( value1 <= 4 )
        {
             arrBestSales.push(`${key}`);
        }
      }
    // console.log({ arrBestSales });

    // listProduct.data.forEach( (item,index,[arrBestSales]) => {
    //     // console.log({i: item._id});
    //     console.log({a : arrBestSales})
    // })
// console.log({ i:listProduct.data._id})    
//     let result = listProduct.data.filter((element,index,[arrBestSales]) => { 
//         if( element._id == arrBestSales)
//         {
//             console.log({id : element._id })
//         }
// })
        async function asyncForEach(array, listProduct) {
            let araay = [];
            for (let index = 0; index < array.length; index++) {
            listProduct = await PRODUCT_MOD.findById(array[index]);
            // console.log(listProduct);
            araay.push(listProduct );
            }
            console.log(araay)
            // return araay;
        }
         
        const start = async () => {
            await asyncForEach(arrBestSales, async (listProduct) => {
               
            })
        }
        start()
    // if( arrBestSales && arrBestSales.length > 0 ){
    //     let listProductBestSales =[];
    //     arrBestSales.forEach( async item =>{
    //     let listProduct = await PRODUCT_MOD.findById({ _id : item});
    //     listProductBestSales.push( listProduct );
    //     }) 
    //     return listProductBestSales;
    // }
    // async function ListProductBest(arrBestSales){
    //     console.log({ListProductBest});
    // }
    // ListProductBest();
    
    // console.log({listProductBestSales})
    
    return res.render(view, data);
}
exports.renderToView = renderToView;