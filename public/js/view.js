// var webdsp = {};
// loadWASM("/lib/webdsp.js").then(module => {
//   webdsp = module;
// });


$(document).ready(() => {
  let urlData;
  // let c2 = document.getElementById('c2');
  // let ctx2 = c2.getContext('2d');
  // let video = $("#video-player");
  // const canvasPixels = ctx2.getImageData(0, 0, video.videoWidth, video.videoHeight);
  // $("#c2").on("click", () => {
  //   canvasPixels.data.set(webdsp.invert(pixels.data));
  // });


  $('.dropdown-trigger').dropdown({
    coverTrigger: false,
    closeOnClick: true
  });
  $(".sidenav").css("margin-top", $(".navbar-fixed").height());
  $('.sidenav').sidenav({
    edge: 'right'
  });
  var sideNavInstance = M.Sidenav.getInstance($('.sidenav'));

  const dropdownInstance = M.Dropdown.getInstance($('.dropdown-trigger'));

  $('.dropdown-button').on("click", function () {
    $(".dropdown-trigger").css({
      width: $("#url-input").outerWidth(),
      top: $("#url-input").outerHeight(),
      left: $(this).outerWidth() + 10
    });
    const data = {
      url: $("#url-input").val()
    };
    if (!$(".dropdown-content").children().length) {
      $.post("/api/geturls", data, (res) => {
        urlData = res;
        urlData.adaptiveURLs.map((item, index) => {
          if (typeof item.quality_label != "undefined") {
            dropdownInstance.close()
            const name = item.quality_label.replace("p60", 'p 60fps') + ` ${item.type.split("/")[1]}`;
            const element = $(`<li class="url-link" data-index="${index}" data-url="${item.url}"><p>${name}</p></li>`)
            $('#link-dropdown').append(element);
            dropdownInstance.open();
          }
        });
      });
    } else {
      if (!dropdownInstance.isOpen) {
        dropdownInstance.open();
      } else {
        dropdownInstance.close()
      }
    }
  });

  $('#link-dropdown').on("click", ".url-link", function () {
    const url = $(this).data("url");
    //$("#video-player").attr("src", url);
    $.post("/api/sendurl", {
      url: url
    }, (res) => {
      $("#video-player").attr("src", `/api/stream/${res}`)
      // $.get(`/api/stream/${res}`, (data) => {
      //   console.log(data);
      // });
    });
  });

  $("#sidenav-button").on("click", () => {
    if (!sideNavInstance.isOpen) {
      sideNavInstance.open();
    } else {
      sideNavInstance.close();
    }
  });

  $(window).resize(function () {
    dropdownInstance.close();
    $(".sidenav").css("margin-top", $(".navbar-fixed").height());
    if ($(window).width() >= 992) {
      sideNavInstance.close();
    }
    // const searchRowForm = $(".search-row > form");
    // if ($(window).width() <= 666) {
    //   searchRowForm.removeClass("s10");
    //   searchRowForm.addClass("s12");
    // }
    // else if (searchRowForm.hasClass("s12")){
    //   searchRowForm.removeClass("s12");
    //   searchRowForm.addClass("s10");
    // }
  });
});