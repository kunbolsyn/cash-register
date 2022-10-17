function checkCashRegister(price, cash, cid) {
  let currency = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1.0,
    "FIVE": 5.0,
    "TEN": 10.0,
    "TWENTY": 20.0,
    "ONE HUNDRED": 100.0
  }

  let i = 0;
  let sum = 0;
  let change = cash - price;
  let res = [];
  let isExist = false;

  for (let i = 0; i < cid.length; i++) {
    sum += cid[i][1];
  }

  sum = Math.round(sum * 100) / 100;

  if (change == sum) {
    return { status: "CLOSED", change: cid };
  }

  cid = cid.reverse();

  if (sum >= change) {
    while (change > 0 && i < cid.length) {
      while (change - currency[cid[i][0]] >= 0 && cid[i][1] > 0) {
        change = Math.round((change - currency[cid[i][0]]) * 100) / 100;
        cid[i][1] = Math.round((cid[i][1] - currency[cid[i][0]]) * 100) / 100;
        sum = Math.round((sum - currency[cid[i][0]]) * 100) / 100;

        for (let j = 0; j < res.length; j++) {
          if (res[j][0] == cid[i][0]) {
            res[j][1] = Math.round((res[j][1] + currency[cid[i][0]]) * 100) / 100;
            isExist = true;
          }
        }

        if (!isExist) {
          res.push([cid[i][0], currency[cid[i][0]]]);
        }
      }
      isExist = false;
      i++;
    }
  }

  if (change > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  return { status: "OPEN", change: res };
}

let ans = checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
console.log(ans);
ans = checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
console.log(ans);
ans = checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
console.log(ans);