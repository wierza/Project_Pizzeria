import {settings, select, classNames} from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';
import Booking from './components/Booking.js'; 

const app = {
    initPAges: function(){
      const thisApp = this;

      thisApp.pages = document.querySelector(select.containerOf.pages).children;
      thisApp.navLinks = document.querySelectorAll(select.nav.links);

      const idFromHash = window.location.hash.replace('#/', '');

      let PageMatchingHash  = thisApp.pages[0].id;
      
      for(let page of thisApp.pages){
        if(page.id == idFromHash){
          PageMatchingHash = page.id;
          break;
        }
      }

      thisApp.activatePage(PageMatchingHash);

      for(let link of thisApp.navLinks){
        link.addEventListener('click', function(event){
          const clickedElement = this;
          event.preventDefault();
          /* get page id from href attribute */
          const id = clickedElement.getAttribute('href').replace('#', '');
          /* run thisApp.activatePage eith that id */
          thisApp.activatePage(id);

          /*change URL hash */
          window.location.hash = '#/' + id;

        });
      }
      
    },

    activatePage: function(pageId){
      const thisApp = this;
      /*add class 'active' to maching page, remove from non-maching*/
      for(let page of thisApp.pages){
        page.classList.toggle(classNames.pages.active, page.id == pageId);
      }
      /*add class 'active' to maching link, remove from non-maching*/
      for(let link of thisApp.navLinks){
        link.classList.toggle(
          classNames.nav.active, 
          link.getAttribute ('href') == '#' + pageId
          );
      }

    },

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
      /*.catch(function (error){
        console.error('Error while fetching products:', error);
      });*/
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

    initBooking: function(){
      const thisApp = this;
      thisApp.bookingPage = document.querySelector(select.containerOf.booking);
      thisApp.booking = new Booking(thisApp.bookingPage);
    },

    init: function(){
      const thisApp = this; 
      thisApp.initPAges();  
      thisApp.initData();   
      thisApp.initCart();
      thisApp.initBooking();

    },

  };

  app.init();