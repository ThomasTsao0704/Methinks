gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray("div.rad");
let maxWidth = 0;

const getMaxWidth = () => {
  maxWidth = 0;
  sections.forEach((section) => {
    maxWidth += section.offsetWidth;
  });
};
getMaxWidth();
ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

gsap.to(sections, {
  x: () => `-${maxWidth - window.innerWidth}`,
  ease: "none",
  scrollTrigger: {
    trigger: ".hori",
    pin: true,
    scrub: true,
    end: () => `+=${maxWidth}`,
    invalidateOnRefresh: true
  }
});

sections.forEach((sct, i) => {
  ScrollTrigger.create({
    trigger: sct,
    start: () => 'top top-=' + (sct.offsetLeft - window.innerWidth / 2) * (maxWidth / (maxWidth - window.innerWidth)),
    end: () => '+=' + sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
    toggleClass: { targets: sct, className: "active" }
  });
});







function followMouse (el) {
    var position = el.getBoundingClientRect();
    var followMouse = function (event) {
        var x = event.x - (position.x + position.width / 2);
        var y = position.y + position.height / 2 - event.y;
        var deg = Math.atan(x / y) * (180 / Math.PI) + (y < 0 ? 180 : 0);
        el.style.transform = 'rotate('+ deg +'deg)';
    }
    document.addEventListener('mousemove', followMouse, true);
}

followMouse(document.querySelector('.get_sh_2'));
addEventListener("scroll", followMouse(document.querySelector('.get_sh_2')));









//下

$(function () {
  var rotation = 0,
    scrollLoc = $(document).scrollTop();
  $(window).scroll(function () {
    var newLoc = $(document).scrollTop();
    var diff = scrollLoc - newLoc;
    rotation += diff, scrollLoc = newLoc;
    var rotationStr = "rotate(" + rotation + "deg)";
    $(".get_sh_1").css({
      "-webkit-transform": rotationStr,
      "-moz-transform": rotationStr,
      "transform": rotationStr
    });

    var rotationStr2 = "rotate(" + rotation * .1 + "deg)";
    $(".get_sh_2").css({
      "-webkit-transform": rotationStr2,
      "-moz-transform": rotationStr2,
      "transform": rotationStr2
    });


  });
})


//下

let tri1 = document.querySelector(".news_inner");

let tri1XInitial = tri1.getBoundingClientRect().x;

window.addEventListener("scroll", function(e) {
  let total = $(document).height();

  let current = window.scrollY;

  let per = (current / total)

  tri1.style.left = -(tri1XInitial * per * 1.25) + tri1XInitial +  "px";
});



if (document.querySelector("h2")) {
  gsap.to('h2', {
    xPercent: 250,
    ease: "none",
    scrollTrigger: {
      trigger: ".radovi",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    }
  });
}

if (document.querySelector("h2")) {
  gsap.to('h2', {
    xPercent: 250,
    ease: "none",
    scrollTrigger: {
      trigger: ".service",
      start: "top center",
      end: "bottom top",
      scrub: true,
    }
  });
}




if (document.querySelector(".all_projects_ball")) {
  gsap.to('.all_projects_ball', {
    xPercent: -250,
    ease: "none",
    scrollTrigger: {
      trigger: ".all_projects",
      start: "top center",
      end: "bottom top",
      scrub: true,
    }
  });
}

if (document.querySelector(".get_sh")) {
  gsap.to('.get_sh', {
    yPercent: 250,
    ease: "none",
    scrollTrigger: {
      trigger: ".lets",
      start: "top center",
      end: "bottom top",
      scrub: true,
    }
  });
}

if (document.querySelector(".news_inner")) {
  gsap.to('.news_inner', {
    xPercent: -10,
    ease: "none",
    scrollTrigger: {
      trigger: ".lets",
      start: "top center",
      end: "bottom top",
      scrub: true,
    }
  });
}



const lenis = new Lenis({
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
//下
const bannerText = new Textify({
  selector: "h2",
  duration: 1600,
  delay: 1600,
  fade: true,
  once: false,
});

const bannerText2 = new Textify({
  selector: "h1",
  duration: 1600,
  fade: true,
  once: false,
});

const bannerText3 = new Textify({
  selector: ".title",
  duration: 800,
  fade: true,
  once: false,
});

const bannerText4 = new Textify({
  selector: ".about",
  duration: 800,
  fade: true,
  once: false,
});

const bannerText5 = new Textify({
  selector: ".pill",
  duration: 800,
  fade: true,
  once: false,
});


// i phone

// Handle Wishlist Toggle
document.getElementById('wishlist-btn').addEventListener('click', function() {
  var wishlistSection = document.getElementById('wishlist-section');
  wishlistSection.classList.toggle('hidden');
});

// Handle Previous Orders Toggle
document.getElementById('previous-orders-btn').addEventListener('click', function() {
  var previousOrdersSection = document.getElementById('previous-orders-section');
  previousOrdersSection.classList.toggle('hidden');
});

// Handle How to Order Section Toggle
document.getElementById('shopping-btn').addEventListener('click', function() {
  var howToOrderSection = document.getElementById('how-to-order-section');
  howToOrderSection.classList.toggle('hidden');
});

// Handle Explore Button Click
document.querySelectorAll('.explore-btn').forEach(button => {
  button.addEventListener('click', function() {
      var id = this.getAttribute('data-id');
      var detailsSection = document.getElementById('details-' + id);
      detailsSection.classList.toggle('hidden');
  });
});
