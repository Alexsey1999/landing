$(function () {
  function ibg() {
    let ibg = document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
      if (ibg[i].querySelector("img")) {
        ibg[i].style.backgroundImage =
          "url(" + ibg[i].querySelector("img").getAttribute("src") + ")";
      }
    }
  }
  ibg();

  document.addEventListener("lazybeforeunveil", function (e) {
    var bg = e.target.getAttribute("data-bg");
    if (bg) {
      e.target.style.backgroundImage = "url(" + bg + ")";
    }
  });
  var spy = new Gumshoe(".header__list a", {
    offset: function () {
      return document.querySelector(".menu-fixed").getBoundingClientRect()
        .height;
    },
  });

  var scroll = new SmoothScroll('a[href*="#"]', {
    header: ".menu-fixed",
    speedAsDuration: true,
    speed: 1000,
    easing: "easeInOutCubic",
  });

  var headerSlider = new Swiper(".header-slider", {
    direction: "horizontal",
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    initialSlide: 0,
    autoHeight: true,
    centeredSlides: true,
    setWrapperSize: true,
    spaceBetween: 0,
    effect: "slide",
    lazy: true,

    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },

    breakpoints: {
      320: {
        autoHeight: false,
      },
      768: {
        autoHeight: true,
      },
    },

    slidesPerColumnFill: "row",
  });
  var serviceSlider = new Swiper(".service-slider", {
    direction: "horizontal",
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    initialSlide: 0,
    autoHeight: true,
    centeredSlides: true,
    setWrapperSize: true,
    spaceBetween: 0,
    effect: "slide",

    pagination: {
      el: ".team-pagination",
      type: "bullets",
      clickable: true,
    },

    breakpoints: {
      320: {
        autoHeight: true,
      },
      768: {
        autoHeight: true,
      },
    },

    slidesPerColumnFill: "row",
  });

  function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }

  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }

  window.onscroll = function () {
    myFunction();
  };

  var header = document.getElementById("fixedHeader");
  var sticky = header.offsetTop;

  function myFunction() {
    if (window.pageYOffset > sticky && window.innerWidth > 992) {
      $(".menu-fixed").addClass("active");
      document.querySelector(".header__up").classList.add("sticky");
    } else {
      document.querySelector(".header__up").classList.remove("sticky");
      $(".menu-fixed").removeClass("active");
    }
  }

  document
    .querySelector(".header__up .burger")
    .addEventListener("click", function () {
      document.querySelector(".overlay").classList.toggle("mobile-active");
    });

  document.querySelector(".menu-toggle").addEventListener("click", function () {
    this.classList.toggle("is-active");
  });

  function isPartiallyVisible(el, offset) {
    var elementBoundary = el.getBoundingClientRect();

    var top = elementBoundary.top;
    var bottom = elementBoundary.bottom;
    var height = elementBoundary.height;
    return top + height >= 0 && height + window.innerHeight >= bottom + offset;
  }

  var portfolioSliderTop = new Swiper(".portfolio-slider-top", {
    direction: "horizontal",
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    initialSlide: 0,
    autoHeight: true,
    centeredSlides: true,
    setWrapperSize: true,
    spaceBetween: 0,
    effect: "fade",
    lazy: true,
    autoplay: false,
    // autoplayDisableOnInteraction: false,
    // updateOnImagesReady: false,
    // loadOnTransitionStart: true,
    on: {
      lazyImageReady(s) {
        if (!s.params.autoplay.enabled) {
          s.params.autoplay.delay = 2500;
          s.autoplay.start();
        }
      },
    },

    fadeEffect: {
      crossFade: true,
    },

    pagination: {
      el: ".portfolio-pagination",
      type: "bullets",
      clickable: true,
    },

    breakpoints: {
      320: {
        autoHeight: true,
      },
      768: {
        autoHeight: true,
      },
    },

    navigation: {
      nextEl: ".portfolio-navigation__next",
      prevEl: ".portfolio-navigation__prev",
    },
  });

  document.getElementById("swiper").addEventListener("mouseenter", function () {
    portfolioSliderTop.autoplay.stop();
  });

  document.getElementById("swiper").addEventListener("mouseleave", function () {
    portfolioSliderTop.autoplay.start();
  });

  var portfolioSliderBottom = new Swiper(".portfolio-slider-bottom", {
    direction: "horizontal",
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    initialSlide: 0,
    autoHeight: true,
    centeredSlides: true,
    setWrapperSize: true,
    spaceBetween: 0,
    effect: "fade",
    lazy: true,

    fadeEffect: {
      crossFade: true,
    },

    breakpoints: {
      320: {
        autoHeight: true,
      },
      768: {
        autoHeight: true,
      },
    },
  });

  portfolioSliderBottom.controller.control = portfolioSliderTop;
  portfolioSliderTop.controller.control = portfolioSliderBottom;

  var target_block1 = $(".header-statistic__wrap");
  var target_block2 = $(".team-statistic__items");
  var skills = document.querySelectorAll(".skills");
  var percent;

  function aboutStatisticScroll() {
    if (isPartiallyVisible(target_block1[0], 50)) {
      $(".figure").each(function (index, element) {
        $({ numberValue: 0 }).animate(
          { numberValue: +element.dataset.max },
          {
            duration: 1500,
            easing: "linear",

            step: function (val) {
              $(element).html(Math.ceil(val));
            },
          }
        );
      });

      $(skills).each((index, item) => {
        percent = item.getAttribute("data-percent");
        item.style.width = percent + "%";
      });

      $(this).unbind("scroll", aboutStatisticScroll);
    }
  }
  $(window).scroll(aboutStatisticScroll);

  function teamStatisticScroll() {
    if (isPartiallyVisible(target_block2[0], 150)) {
      $(".statistic-content__figure").each(function (index, element) {
        $({ numberValue: 0 }).animate(
          { numberValue: +element.dataset.figure },
          {
            duration: 1500,
            easing: "linear",

            step: function (val) {
              $(element).html(Math.ceil(val));
            },
          }
        );
      });

      $(this).unbind("scroll", teamStatisticScroll);
    }
  }

  $(window).scroll(teamStatisticScroll);

  var Shuffle = window.Shuffle;

  class Demo {
    constructor(element) {
      this.element = element;
      this.shuffle = new Shuffle(element, {
        itemSelector: ".category-item",
        speed: 250,
        isCentered: true,
        sizer: document.querySelector(".sizer"),
      });

      this._activeFilters = [];
      this.addFilterButtons();
    }

    addFilterButtons() {
      const options = document.querySelector(".categories-list");
      if (!options) {
        return;
      }

      const filterButtons = Array.from(
        document.querySelectorAll(".category-list__btn")
      );
      const onClick = this._handleFilterClick.bind(this);
      filterButtons.forEach((button) => {
        button.addEventListener("click", onClick, false);
      });
    }

    _handleFilterClick(evt) {
      const btn = evt.currentTarget;
      const isActive = btn.classList.contains("active");
      const btnGroup = btn.getAttribute("data-group");
      this._removeActiveClassFromChildren(btn.parentNode);

      let filterGroup;
      if (isActive) {
        btn.classList.remove("active");
        filterGroup = Shuffle.ALL_ITEMS;
      } else {
        btn.classList.add("active");
        filterGroup = btnGroup;
      }

      this.shuffle.filter(filterGroup);
    }

    _removeActiveClassFromChildren(parent) {
      const children = document.querySelectorAll(".category-list__btn");
      for (let i = children.length - 1; i >= 0; i--) {
        children[i].classList.remove("active");
      }
    }

    _handleSortChange(evt) {
      const buttons = Array.from(evt.currentTarget.children);
      buttons.forEach((button) => {
        if (button.querySelector("input").value === evt.target.value) {
          button.classList.add("active");
        } else {
          button.classList.remove("active");
        }
      });
    }
  }

  window.demo = new Demo(
    document.querySelector(".portfolio-categories__inner")
  );

  var contactFormElements = document.querySelectorAll(
    ".contact-form__input input, .contact-form__textarea textarea "
  );

  contactFormElements.forEach((elem) => {
    elem.addEventListener("focus", function () {
      this.parentElement.classList.add("active");
    });
    elem.addEventListener("blur", function () {
      this.parentElement.classList.remove("active");
    });
  });
});
