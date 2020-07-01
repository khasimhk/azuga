const express =require('express')
const app=express();
const data=require('./data.json')


app.get('/get', function (req, res) {
  console.log('data', data);
  let totalBillAmount=0;
  const response = data.map((item, index, array) => {
    const finalPrice = item.price * item.quantity;
    let totalAmount = finalPrice + finalPrice * (item.tax.split('%')[0] / 100);;
    let tax = finalPrice*item.tax.split('%')[0]/100
    if (item.itemCategory==='Clothes'&&totalAmount < 1000) {
            totalAmount = finalPrice + finalPrice * (5 / 100);
            // tax = finalPrice * (item.tax.split('%')[0] / 100);
            totalBillAmount+=totalAmount;
  
          } else if (item.itemCategory==='Clothes'&&totalAmount > 1000) {
            totalAmount = finalPrice + finalPrice * (12 / 100);
            // tax = finalPrice * (item.tax.split('%')[0] / 100);
            totalBillAmount+=totalAmount;
          }
          
          totalBillAmount+=totalAmount;
    // switch (item.itemCategory) {
    //   case 'Medicine':
    //   case 'Food':
    //     totalAmount = finalPrice + finalPrice * (5 / 100);
    //     tax = finalPrice * (5 / 100);
    //     totalBillAmount+=totalAmount;
    //     break;
    //   case 'Imported':
    //     totalAmount = finalPrice + finalPrice * (18 / 100);
    //     tax = finalPrice * (18 / 100);
    //     totalBillAmount+=totalAmount;

    //     break;
    //   case 'Book':
    //     totalAmount = finalPrice;
    //     tax = 0;
    //     totalBillAmount+=totalAmount;

    //     break;
    //   case 'Music':
    //     totalAmount = finalPrice + finalPrice * (3 / 100);
    //     tax = finalPrice * (3 / 100);
    //     totalBillAmount+=totalAmount;

    //     break;
    //   case 'Clothes':
    //     if (totalAmount < 1000) {
    //       totalAmount = finalPrice + finalPrice * (5 / 100);
    //       tax = finalPrice * (5 / 100);
    //       totalBillAmount+=totalAmount;

    //     } else {
    //       totalAmount = finalPrice + finalPrice * (12 / 100);
    //       tax = finalPrice * (12 / 100);
    //       totalBillAmount+=totalAmount;

    //     }
    //     break;
    //   default:
    //     totalAmount = 0;
    // }
   
    return {
      'final price': totalBillAmount,
      // finalPrice,
      itemCategory: item.itemCategory,
      tax,
      date: new Date(),
    };
  });
  if (totalBillAmount > 2000) {
    totalBillAmount = totalBillAmount - totalBillAmount * (5 / 100);
  }
  res.send({date:new Date(),
  "total Amount":totalBillAmount.toFixed(2),
  details:response
});
});

app.listen(3000,()=>{
console.log('server started');
})