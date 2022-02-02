function initPayPalButton() {
    var fname = document.querySelector('#smart-button-container #fname');
    var lname = document.querySelector('#smart-button-container #lname');
    var mail=document.querySelector('#smart-button-container #mail');
    var amount = document.querySelector('#smart-button-container #amount');
    var fnameerror = document.querySelector('#smart-button-container #fnameerror');
    var lnameerror = document.querySelector('#smart-button-container #lnameerror');
    var mailerror = document.querySelector('#smart-button-container #mailerror');
    var priceError = document.querySelector('#smart-button-container #priceLabelError');
    var invoiceid = document.querySelector('#smart-button-container #invoiceid');
    var invoiceidError = document.querySelector('#smart-button-container #invoiceidError');
    var invoiceidDiv = document.querySelector('#smart-button-container #invoiceidDiv');

    var elArr = [fname,lname,mail,amount];

    if (invoiceidDiv.firstChild.innerHTML.length > 1) {
      invoiceidDiv.style.display = "block";
    }

    var purchase_units = [];
    purchase_units[0] = {};
    purchase_units[0].amount = {};

    function validate(event) {
      return event.value.length > 0;
    }

    paypal.Buttons({
      style: {
        color: 'blue',
        shape: 'pill',
        label: 'pay',
        layout: 'horizontal',
        
      },

      onInit: function (data, actions) {
        actions.disable();

        if(invoiceidDiv.style.display === "block") {
          elArr.push(invoiceid);
        }

        elArr.forEach(function (item) {
          item.addEventListener('keyup', function (event) {
            var result = elArr.every(validate);
            if (result) {
              actions.enable();
            } else {
              actions.disable();
            }
          });
        });
      },

      onClick: function () {
        if (fname.value.length < 1) {
          fnameerror.style.visibility = "visible";
        } else {
          fnameerror.style.visibility = "hidden";
        }
        if (lname.value.length < 1) {
            lnameerror.style.visibility = "visible";
          } else {
            lnameerror.style.visibility = "hidden";
          } 
        if (mail.value.length < 1) {
            mailerror.style.visibility = "visible";
          } else {
            mailerror.style.visibility = "hidden";
        }   
        if (amount.value.length < 1) {
          priceError.style.visibility = "visible";
        } else {
          priceError.style.visibility = "hidden";
        }

        if (invoiceid.value.length < 1 && invoiceidDiv.style.display === "block") {
          invoiceidError.style.visibility = "visible";
        } else {
          invoiceidError.style.visibility = "hidden";
        }

        purchase_units[0].fname = fname.value;
        purchase_units[0].lname = lname.value;
        purchase_units[0].mail = mail.value;
        purchase_units[0].amount.value = amount.value;

        if(invoiceid.value !== '') {
          purchase_units[0].invoice_id = invoiceid.value;
        }
      },

      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: purchase_units,
        });
      },

      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          alert('Transaction completed by ' + details.payer.name.given_name + '!');
        });
      },

      onError: function (err) {
        console.log(err);
      }
    }).render('#submit');
  }
  initPayPalButton();