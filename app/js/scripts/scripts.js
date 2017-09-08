$(document).ready(function () {
    "use strict";

    // $("#modal").iziModal({
    //     title:'Any random text',
    // });
    // $(document).on('click', '.trigger', function (event) {
    //     event.preventDefault();
    //     $('#modal').iziModal('open');
    // });

    // $(".inline").modaal();


    // document.addEventListener('touchmove', function(e) {e.preventDefault();}, true);

    // document.body.addEventListener('touchmove',function(event){event.preventDefault();},false);
    // $(document).bind('touchmove', false);


    $('.slider').on('init reInit afterChange', function (event, slick, currentSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.slider-counter').text(i + '/' + slick.slideCount);
    });

    $(".slider").slick({
        slide: ".slide-col",
        nextArrow: '<div class="slider-arrow arrow-right"><img src="img/slider/arrow-right.svg"/></div>',
        prevArrow: '<div class="slider-arrow arrow-left"><img src="img/slider/arrow-left.svg"/></div>'
    });


    // $(".owl-carousel").owlCarousel();

    // $(".animsition").animsition({
    //     inClass: "fade-in",
    //     outClass: "fade-out",
    //     inDuration: 1500,
    //     outDuration: 800,
    //     linkElement: ".animsition-link",
    //     // e.g. linkElement: "a:not([target="_blank"]):not([href^="#"])"
    //     loading: true,
    //     loadingParentElement: "body", //animsition wrapper element
    //     loadingClass: "animsition-loading",
    //     loadingInner: "", // e.g "<img src="loading.svg" />"
    //     timeout: false,
    //     timeoutCountdown: 5000,
    //     onLoadEvent: true,
    //     browser: ["animation-duration", "-webkit-animation-duration"],
    //     // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    //     // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    //     overlay: false,
    //     overlayClass: "animsition-overlay-slide",
    //     overlayParentElement: "body",
    //     transition: function (url) {
    //         window.location.href = url;
    //     }
    // });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            // $(".link-up").addClass("visible");
            $('nav').addClass('scroll');
        }
        else {
            // $(".link-up").removeClass("visible");
            $('nav').removeClass('scroll');
        }
    });


    $(".smooth").click(function (event) {
        event.preventDefault();
        // $('.smooth').removeClass('active');
        // $(this).addClass('active')
        var id = $(this).attr("href"),
            top = $(id).offset().top - 141;
        $("body,html").animate({
            scrollTop: top
        }, 1500);
    });

    // $('.nav-icon').click(function () {
    //     disableScroll();
    // })


    // document.getElementById("disable").onclick = function() {
    //     disableScroll();
    //     // document.getElementById("status").innerHTML = "disabled";
    //     // document.getElementById("status").className = "disabled";
    // };

    /**
     * Form validation and sending
     */
    $("#contact-form").on("submit", function (e) {
        e.preventDefault();

        var form = $(this),
            name = form.find("input[name='name']").val(),
            email = form.find("input[name='email']").val(),
            text = form.find("textarea").val(),
            send = true,
            r = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        $(".error-p").html("").slideUp();

        if (name === "") {
            send = false;
            form.find("input[name='name']").addClass("error").focus();
            $(".error-p").html("Введіть ім'я").slideDown();
        } else if (email === "") {
            send = false;
            form.find("input[name='email']").addClass("error").focus();
            $(".error-p").html("Введіть e-mail").slideDown();
        } else if (!r.test(email)) {
            send = false;
            form.find("input[name='email']").addClass("error").focus();
            $(".error-p").html("Невірний формат вводу e-mail").slideDown();
        } else if (text === "") {
            send = false;
            form.find("textarea").addClass("error").focus();
            $(".error-p").html("Введіть текст повідомлення").slideDown();
        }

        if (send) {
            var url = form.attr("action"),
                data = form.serialize(),
                method = form.attr("method");

            $.ajax({
                method: method,
                url: url,
                data: data,
                success: function (data) {
                    if (data === "") {
                        form.trigger("reset");
                        $('.form-visible').slideUp();
                        $('.form-hidden').slideDown();
                    } else {
                        alert("Помилка! Спробуйте пізніше!");
                    }
                }
            });
        }
    });

    $(".okay-btn").on("click", function (e) {
        e.preventDefault();

        $("#contact-form").trigger("reset");
        $('.form-visible').slideDown();
        $('.form-hidden').slideUp();
    });

    $("#contact-form").find("input[name='name']").on("input", function () {
        $(this).removeClass("error");
        $(".error-p").html("").slideUp();
    });

    $("#contact-form").find("input[name='email']").on("input", function () {
        $(this).removeClass("error");
        $(".error-p").html("").slideUp();
    });

    $("#contact-form").find("textarea").on("input", function () {
        $(this).removeClass("error");
        $(".error-p").html("").slideUp();
    });

    //responsive scripts
    $(window).on('load resize', function () {
        if (window.matchMedia("(max-width: 767px)").matches) {
            $(".smooth").click(function () {
                $('nav-icon').removeClass("open");
                $("main").removeClass("open");
                $("nav").removeClass("open");
                $("html, body").removeClass("open-nav");
            });
        }
    });
});


