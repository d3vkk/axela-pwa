if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("/serviceWorker.js").then(res => console.log(
            "service registered", res)).catch(err => console.log("service worker not registerd",
            err))
    })
}

const armColors = [
    "#f2ba16",
    "#f28322",
    "#f25116",
    "#f23c13",
    "#8c3027",
];
const bgColors = [
    "#f2f2f2",
    "#f2ebdc",
    "#184759",
    "#0c2c40",
    "#0a2b40"
];

var rbd = 2; // rotation base duration for pulse arms

//random integer
function rib(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

//places divs for liquid arms to swirl around base circle
function placeLiquidArmDivs() {
    for (i = 0; i < 7; i++) {
        var size = i == 6 ? 75 : rib(55, 75);
        var newArm = document.createElement("div");
        newArm.classList.add("arm");
        newArm.classList.add(`arm-${i+1}`);
        newArm.style.width = `${size}%`;
        newArm.style.height = `${size}%`;
        var dot = document.getElementById("dot");
        dot.appendChild(newArm);
        dot.insertBefore(newArm, dot.firstChild);
    }
}

//liquifies dots
function liquify() {
    var le = Linear.easeNone; // linear easing
    document.documentElement.style.setProperty('--arm-color', armColors[Math.floor(Math.random() * (armColors.length - 1))]);
    document.documentElement.style.setProperty('--bg-color', bgColors[Math.floor(Math.random() * (bgColors.length - 1))]);
    TweenMax.to(".arm-1", rbd * 0.7, {
        ease: le,
        rotation: "360",
        repeat: -1,
        transformOrigin: "50% 25%"
    });
    TweenMax.to(".arm-2", rbd * 0.5, {
        ease: le,
        rotation: "-360",
        repeat: -1,
        transformOrigin: "72% 32%"
    });
    TweenMax.to(".arm-3", rbd * 1.1, {
        ease: le,
        rotation: "360",
        repeat: -1,
        transformOrigin: "72% 63%"
    });
    TweenMax.to(".arm-4", rbd * 0.6, {
        ease: le,
        rotation: "-360",
        repeat: -1,
        transformOrigin: "50% 75%"
    });
    TweenMax.to(".arm-5", rbd * 0.8, {
        ease: le,
        rotation: "360",
        repeat: -1,
        transformOrigin: "28% 63%"
    });
    TweenMax.to(".arm-6", rbd * 0.7, {
        ease: le,
        rotation: "-360",
        repeat: -1,
        transformOrigin: "28% 37%"
    });
    TweenMax.to(".arm-7", rbd * 0.8, {
        ease: le,
        rotation: "360",
        repeat: -1,
        transformOrigin: "50% 60%",
        delay: 0.2
    });
}

//re-solidifies dots
function solidify() {
    document.querySelectorAll('.arm').forEach(arm => {
        if (arm._gsTransform) TweenMax.to(arm, rbd * 0.5, {
            rotation: "0"
        });
        TweenMax.to(".arm-7", rbd * 0.5, {
            rotation: "0",
            delay: 0.2
        });
    })
}


//Events
var hover = false;
document.getElementById('dot').addEventListener("mouseover", () => {
    if (!hover) {
        liquify();
    }
    hover = true;
});

document.getElementById('dot').addEventListener("mouseleave", () => {
    solidify();
    hover = false;
});

//Execution
placeLiquidArmDivs();
