// Model:
var model = {
  currentCat: null,
  cats: [
        {
            clickCount : 0,
            name : 'Tuffy',
            imgSrc : 'images/cat_picture1.jpg'
        },
        {
            clickCount : 0,
            name : 'Snowy',
            imgSrc : 'images/cat_picture2.jpeg'
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'images/cat_picture3.jpeg'
        },
        {
            clickCount : 0,
            name : 'Sweety',
            imgSrc : 'images/cat_picture4.jpeg'
        },
        {
            clickCount : 0,
            name : 'Toasty',
            imgSrc : 'images/cat_picture5.jpeg'
        }
  ]
};

/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    }

};

/* ======= View ======= */

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        //admin area view
        //this.adminElem = document.getElementById('adminArea');
        this.adminName = document.getElementById('cat-name-admin');
        this.adminUrl = document.getElementById('cat-url-admin');
        this.adminClicks = document.getElementById('cat-count-admin');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = "Total Number of Times Cat is Clicked: " + currentCat.clickCount;
        this.catImageElem.src = currentCat.imgSrc;
		this.catNameElem.textContent = "Cat Nickname: " + currentCat.name;
		this.

        //admin view rendering and display with save and cancel buttons
        this.adminName.value = currentCat.name;
        this.adminUrl.value = currentCat.imgSrc;
        this.adminClicks.value = currentCat.clickCount;
        var adminField = document.getElementById('adminArea');
        var adminButton = document.getElementById('admin');
        var saveButton = document.getElementById('save');
        var cancelButton = document.getElementById('cancel');


          adminButton.addEventListener('click', function() {
            adminField.style.display = 'initial';
          })
          saveButton.addEventListener('click', function() {

            //seting form variable to use later in code
            var inputForm = document.getElementById('form1');

            //get the input value
            var inputName = inputForm.elements["catNameAdmin"].value;

            // input of cat name at the picture
            currentCat.name = inputName;
            var catNameElemAdmin = document.getElementById('cat-name');
            catNameElemAdmin.textContent = "Cat Nickname: " + currentCat.name;

            //input of url
            var inputUrl = inputForm.elements["imgUrlAdmin"].value;
            currentCat.imgSrc = inputUrl;
            var catImageElemAdmin = document.getElementById('cat-img');
            catImageElemAdmin.src = currentCat.imgSrc;
            adminField.style.display = 'none';

          })
          cancelButton.addEventListener('click', function() {
            adminField.style.display = 'none';
            location.reload();
          })
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');
        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];
            // make a new cat list item and set its text
            elem = document.createElement('button');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);

        }
    }
};

// make it go!
octopus.init();
