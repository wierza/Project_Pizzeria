import {settings, select} from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js'; 

const app = {
    initMenu: function(){

      const thisApp = this;  

      for(let productData in thisApp.data.products){
        new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
      }
 },

    initData: function(){
      const thisApp = this;

      thisApp.data = {};
      const url = settings.db.url + '/' + settings.db.products;

      fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        /*save parsedResponse as thisApp.data.products*/
        thisApp.data.products = parsedResponse;
        /*execute initMenu method*/
        thisApp.initMenu();
      })
      .catch(function (error){
        console.error('Error while fetching products:', error);
      });
    },

    initCart(){
      const thisApp = this;
    
      const cartElem = document.querySelector(select.containerOf.cart);
      thisApp.cart = new Cart(cartElem);

    
      thisApp.productList = document.querySelector(select.containerOf.menu);
      
      thisApp.productList.addEventListener('add-to-cart', function(event){
        app.cart.add(event.detail.product);
      });

    },

    init: function(){
      const thisApp = this;   
      thisApp.initData();   
      thisApp.initCart();

    },

  };

  app.init();