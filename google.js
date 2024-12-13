gsap.registerPlugin(ScrollTrigger);
gsap.set(".banner3d-1", { perspectiveOrigin: "center -100vh" });
gsap.set(".banner3d-2", { perspectiveOrigin: "center -100vh" });
gsap.set(".banner3d-3", { perspectiveOrigin: "center -100vh" });
gsap.set(".banner3d-4", { perspectiveOrigin: "left -100vh" });

gsap.to(".banner3d-1", {
    scrollTrigger: {
        trigger: ".banner3d-1",
        scrub: true,
        start: "top bottom",
        end: "bottom top"
    },
    perspectiveOrigin: "center 100vh",
    ease: "none"
});

gsap.to(".banner3d-2", {
    scrollTrigger: {
        trigger: ".banner3d-2",
        scrub: true,
        start: "top bottom",
        end: "bottom top"
    },
    perspectiveOrigin: "center 100vh",
    ease: "none"
});

gsap.to(".banner3d-3", {
    scrollTrigger: {
        trigger: ".banner3d-3",
        scrub: true,
        start: "top bottom",
        end: "bottom top"
    },
    perspectiveOrigin: "center 100vh",
    ease: "none"
});

gsap.to(".banner3d-4", {
    scrollTrigger: {
        trigger: ".banner3d-4",
        scrub: true,
        start: "top bottom",
        end: "bottom top"
    },
    perspectiveOrigin: "left 100vh",
    ease: "none"
});


var userName = document.GetElementById("userName");
var password = document.GetElementById("password");

function verify() {
    if (document.myForm.userName.value == "admin" && document.myForm.password.value == "0704") {
        window.location.pathname = "./stock-main/stock.html";
        return false;
    }
    else if (document.myForm.userName.value == "" && document.myForm.password.value == "" || document.myForm.userName.value == null && document.myForm.password.value == null) {
        document.getElementById('output').innerHTML = '<div class="error">Please Enter a username & password!</div>';
        return false;
    }
    else {
        document.getElementById('output').innerHTML = '<div class="error">Incorrect Username or Password!</div>';
        return false;
    }
}


